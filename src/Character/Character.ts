import { getRandomRange } from '../util';
import Battle, { Side } from '../Battle/Battle';
import StatusEffectManager from '../StatusEffect/StatusEffectManager';
import { Equipment, EquipmentImport } from '../Equipment/Equipment';
import HitType from '../types/HitType';
import { dice, rollDice } from '../dice';
import { Potion } from '../Equipment/Potion';
import Stats from './Stats/Stats';
import NumberRange, { numberRoll } from '../NumberRange';
import Ability from '../Ability/Ability';
import { StatTemplate } from './Stats/StatTemplate';
import Invisible from '../StatusEffect/Buffs/Invisible';
import { ClassName, Classes } from './Classes/classes';
import BuffId from '../StatusEffect/BuffId';
import StatType from './Stats/StatType';
import Attributes from './Attributes/Attributes';
import BaseAttributes from './Attributes/BaseAttributes';
import AttackType from '../types/AttackType';
import { type Weapon } from '../Equipment/Weapon/Weapon';
import { createPet, PetId } from './Pet';
import AttributeType from './Attributes/AttributeType';

type CharacterInfo = {
    name: string,
    className: string | null,
    level: number,
    mainHand: Weapon,
    offHandWeapon?: Weapon,
    potion?: Potion,

    attributes: Attributes,
    stats: Stats;
};

type CharacterJSON = {
    name: string;
    className: string | null;
    level: number;
    currHealth: number;
    maxHealth: number;
    currMana: number;
    manaCost: number;
    buffs: string;
    debuffs: string;
};

// Crit chance, crit dmg, Accuracy, dodge chance, mana regen, mana on hit (one-hand vs two-hand)
export default class Character {
    private userId?: string;

    private _name: string;
    private _className: ClassName | null;

    private _level: number;

    // Equipment
    private _equipment: Equipment;

    // Attributes and Stats
    private _attributes: Attributes;
    private _stats: Stats;
    private _currentHealth: number;
    private _currentMana: number;

    // Ability
    private ability: Ability | null;

    // Buffs/Debuffs
    private _statusEffectManager: StatusEffectManager = new StatusEffectManager(this);

    // Pet
    private _pet: Character | null;

    // Battle Info
    private _target: Character | null = null;
    private _battle: { ref: Battle, side: Side, index: number; } | null = null;

    constructor({ name, level, className, attributes, statTemplate, equipment, ability, petId, options }: { name: string, level: number, className?: ClassName, attributes: BaseAttributes, statTemplate: StatTemplate, equipment: EquipmentImport, ability?: Ability, petId?: PetId, options?: { userId?: string, currHealthPc?: number, currManaPc?: number; }; }) {
        this._name = name;
        this._level = level;
        this._className = className ?? null;

        this._equipment = new Equipment(equipment);

        // Attributes
        this._attributes = new Attributes(attributes, this._equipment);
        if (className) {
            for (const [attr, val] of Object.entries(Classes[className].attributes)) {
                this._attributes.addBonus(attr as AttributeType, val);
            }
        }

        // Stats
        this._stats = new Stats({
            template: statTemplate,
            attributes: this.attributes,
            equipment: this._equipment,
            level
        });

        this.ability = ability ?? (className ? Classes[className].ability : null);
        this._currentHealth = options?.currHealthPc !== undefined ? Math.ceil(this.stats.maxHealth * options.currHealthPc) : this.stats.maxHealth;
        this._currentMana = this.stats.getStat(StatType.StartingMana);

        this._pet = petId ? createPet(this, petId) : null;

        if (options?.userId) this.userId = options.userId;
    }

    setBattle(ref: Battle, side: Side, index: number) {
        this._battle = {
            ref,
            side,
            index
        };
    }

    get name() {
        return this._name;
    }

    get className() {
        return this._className;
    }

    get level() {
        return this._level;
    }

    get attributes() {
        return this._attributes;
    }

    get stats() {
        return this._stats;
    }

    get equipment() {
        return this._equipment;
    }

    get currentHealth() {
        return this._currentHealth;
    }

    get currentMana() {
        return this._currentMana;
    }

    get initiative() {
        return this.stats.getStat(StatType.Initiative);
    }

    get target() {
        return this._target;
    }

    set target(char: Character | null) {
        this._target = char;
    }

    get battle() {
        return this._battle;
    }

    get statusEffectManager() {
        return this._statusEffectManager;
    }

    get pet() {
        return this._pet;
    }

    getName(): string {
        let name = this.name;
        if (this.userId) name += ` (${this.userId})`;
        return name;
    }

    getHealthString(): string {
        return `${Math.round(this.currentHealth)}/${this.stats.maxHealth}`;
    }

    getManaString(): string {
        return `${this.currentMana}/${this.stats.getStat(StatType.ManaCost)}`;
    }

    setTarget(): void {
        if (!this.battle) return;
        if (this.target?.isDead() || this.target?.isInvisible()) {
            this.target = null;
        }
        if (this.target === null) {
            // TODO: add condition if this char can see invisible targets
            // Filter out invisble targets
            const enemySide = this.battle.side === Side.Left ? Side.Right : Side.Left;
            const targets = this.battle.ref.getAliveTargets(enemySide).filter(char => !char.isInvisible());

            if (targets.length === 0) {
                this.target = null;
            }
            else {
                this.target = targets[getRandomRange(targets.length)];
            }
        }
    }

    usePotion(): void {
        if (this.equipment.potion && this.equipment.potion.charges > 0) {
            const potionHeal = (rollDice(this.equipment.potion.dice) + this.equipment.potion.bonus + this.stats.getStat(StatType.PotionHealing)) * (1 + this.stats.getStat(StatType.PotionEffectiveness));
            this.addHealth(potionHeal);
            this.equipment.potion.charges -= 1;
            if (this.battle) this.battle.ref.log.add(`${this.name} used ${this.equipment.potion.name} and healed for ${potionHeal.toLocaleString()}.`);
        }
    }

    useAbilityMana(): void {
        this._currentMana -= Math.max(this.stats.getStat(StatType.ManaCost), 0);
    }

    doTurn(): void {
        this.statusEffectManager.turnStart();
        if (this.equipment.potion && this.equipment.potion.charges > 0 && this.currentHealth <= this.stats.maxHealth / 2) {
            this.usePotion();
        }

        this.setTarget();
        if (this.ability && this.currentMana >= this.stats.getStat(StatType.ManaCost)) {
            this.ability.func(this);
        }
        else {
            this.turnAttack();
        }

        this.addMana(this.stats.getStat(StatType.ManaRegen));
        this.statusEffectManager.turnEnd();
    }

    hitRoll({ target, attackType, isOffHand = false }: { target: Character, attackType: AttackType, isOffHand?: boolean; }): boolean {
        const roll = rollDice(dice['1d100']);

        // Rolling 1-5 always misses
        if (roll <= 5) return false;
        // Rolling 96-100 always hits
        if (roll > 95) return true;

        let accuracy = this.stats.getAccuracy(attackType);
        if (isOffHand) accuracy += this.stats.getStat(StatType.OffHandAccuracy);

        const targetDodgeChance = target.stats.dodge - this.stats.getStat(StatType.DodgeReduction);

        return roll + accuracy >= targetDodgeChance;
    }

    static critRoll(critChance: number): boolean {
        if (critChance <= 0) return false;
        return rollDice(dice['1d100']) <= critChance;
    }

    static blockRoll(blockChance: number): boolean {
        if (blockChance <= 0) return false;
        return rollDice(dice['1d100']) <= blockChance;
    }

    calcDamage({ damage, weaponAttack, spellPowerRatio, invisibleStacks = 0 }: { damage: number, weaponAttack: boolean, spellPowerRatio?: number, invisibleStacks?: number; }): number {
        const statDamage = this.stats.getStat(StatType.Damage);
        const twoHandedMultiplier = this.stats.getTwoHandedMultiplier();

        const damageBonus = (weaponAttack && statDamage > 0 ? statDamage * twoHandedMultiplier : this.stats.getStat(StatType.Damage));
        const damagePercent = this.stats.getStat(StatType.DamagePercent);

        const spellDamage = spellPowerRatio !== undefined ? this.stats.spellPower * spellPowerRatio : 0;
        const sneakDamage = Invisible.damage * invisibleStacks * (weaponAttack ? twoHandedMultiplier : 1);

        return (damage + damageBonus + spellDamage + sneakDamage) * (1 + damagePercent);
    }

    calcDamageRange({ damageRange, weaponAttack, spellPowerRatio }: { damageRange: NumberRange, weaponAttack: boolean, spellPowerRatio?: number; }): { min: number, max: number; } {
        const min = this.calcDamage({ damage: damageRange.min + damageRange.bonus, weaponAttack, spellPowerRatio });
        const max = this.calcDamage({ damage: damageRange.max + damageRange.bonus, weaponAttack, spellPowerRatio });
        return { min, max };
    }

    attack({ target, attackType, damageRange, weaponAttack, spellPowerRatio, isOffHand = false, abilityName }: { target: Character, attackType: AttackType, damageRange: NumberRange, weaponAttack: boolean, spellPowerRatio?: number, isOffHand?: boolean, abilityName?: string; }): { hit: boolean, damageDone: number; } {

        let hitType: HitType = HitType.Miss;
        let damage: number = 0;
        let sneakAttack: boolean = false;
        let blocked: boolean = false;
        let damageDone: number = 0;

        const hit = this.hitRoll({
            target,
            attackType,
            isOffHand
        });

        // Calculate damage for the attack if hit
        if (hit) {
            hitType = HitType.Hit;
            if (this.statusEffectManager.getBuffStacks(BuffId.Invisible) > 0) sneakAttack = true;

            damage = this.calcDamage({ damage: numberRoll(damageRange), weaponAttack, spellPowerRatio, invisibleStacks: this.statusEffectManager.getBuffStacks(BuffId.Invisible) });

            const crit = Character.critRoll(this.stats.critChance);
            if (crit) {
                damage = Character.calcCritDamage(damage, this.stats.critDamage);
                hitType = HitType.Crit;
            }

            // Target block
            blocked = Character.blockRoll(target.stats.getStat(StatType.BlockChance));
            if (blocked) {
                damage = Character.calcDamageAfterBlock(damage, target.stats.getStat(StatType.BlockPower));
            }

            target.takeDamage({
                source: this.name,
                damage,
                armourPenetration: this.stats.armourPenetration,
                options: { addToLog: false }
            });
        }

        // Add hit to combat log
        if (this.battle) {
            this.battle.ref.log.addAttack({
                charName: this.name,
                tarName: target.name,
                hitType,
                damage,
                sneak: sneakAttack,
                blocked,
                abilityName
            });
        }

        this.statusEffectManager.onAttack(hit);

        // Deal thorns damage to this Character if target was hit
        if (hit && target.stats.getStat(StatType.Thorns) > 0) {
            damageDone = this.takeDamage({
                source: StatType.Thorns,
                damage: target.stats.getStat(StatType.Thorns),
                armourPenetration: target.stats.armourPenetration
            });
        }

        return { hit, damageDone };
    }

    turnAttack(): void {
        if (!this.target) {
            if (this.battle) this.battle.ref.log.add(`${this._name} has no target.`);
            return;
        }

        this.weaponAttack(this.equipment.mainHand, this.target, false);
        if (this.equipment.offHandWeapon) this.weaponAttack(this.equipment.offHandWeapon, this.target, false);
    }

    weaponAttack(weapon: Weapon, target: Character, isOffHand: boolean): void {
        const { hit } = this.attack({
            target: target,
            attackType: weapon.attackType,
            damageRange: weapon.damageRange,
            weaponAttack: true,
            isOffHand
        });
        if (hit) {
            this.addMana(this.stats.manaOnHit);
            if (weapon.onHit) weapon.onHit.func(this, target);
        }
    }

    takeDamage({ source, damage, armourPenetration, options }: { source: string, damage: number, armourPenetration: number, options?: { addToLog: boolean; }; }): number {
        let damageTaken = Math.max(damage, 0);

        if (damageTaken > 0) {
            damageTaken = Character.calcDamageAfterDeflection(damageTaken, this.stats.getStat(StatType.Deflection));
            damageTaken = Character.calcDamageAfterArmour(damageTaken, this.stats.getStat(StatType.Armour), armourPenetration);
            this._currentHealth -= damageTaken;
        }

        if (this.battle) {
            if (options?.addToLog === undefined || options?.addToLog === true) this.battle.ref.log.addDamage(this.name, source, damageTaken);
            if (this.isDead()) {
                this.battle.ref.setCharDead(this.battle.side, this.battle.index);
                this.battle.ref.log.add(`${this.name} died.`);
            }
        }

        return damageTaken;
    }

    addMana(mana: number): void {
        this._currentMana += Math.max(mana, 0);
    }

    addHealth(health: number): void {
        this._currentHealth = Math.min(this.currentHealth + Math.max(health, 0), this.stats.maxHealth);
    }

    isDead(): boolean {
        return this.currentHealth <= 0;
    }

    isInvisible(): boolean {
        return this.statusEffectManager.getBuffStacks(BuffId.Invisible) > 0;
    }

    info(): CharacterInfo {
        return {
            name: this.name,
            className: this._className,
            level: this.level,
            mainHand: this.equipment.mainHand,
            offHandWeapon: this.equipment.offHandWeapon,
            potion: this.equipment.potion,
            attributes: this.attributes,
            stats: this.stats
        };
    }

    // Helper functions
    // json(): CharacterJSON {
    //     return {
    //         name: this._name,
    //         className: this.className,
    //         level: this.level,
    //         currHealth: this.currentHealth,
    //         maxHealth: this.stats.getStat(StatType.MaxHealth),
    //         currMana: this.currentHealth,
    //         manaCost: this.stats.getStat(StatType.ManaCost),
    //         buffs: this.statusEffectManager.getBuffString(),
    //         debuffs: this.statusEffectManager.getDebuffString()
    //     };
    // }

    static calcCritDamage(damage: number, critDamage: number) {
        return Math.max(damage *= critDamage, 0);
    }

    static calcDamageAfterDeflection(damage: number, deflection: number) {
        if (damage == 0) return 0;
        return Math.max(damage - deflection, 0);
    }
    static calcDamageAfterArmour(damage: number, armour: number, armourPenetration: number) {
        if (armour > 0) armour = Math.max(armour - armourPenetration, 0);
        const armourMultiplier = 1 - armour / 100;
        return Math.max(damage * armourMultiplier, 0);
    }

    static calcDamageAfterBlock(damage: number, blockPower: number) {
        return Math.max(damage - Math.max(blockPower, 0), 0);
    }
}

export { CharacterInfo, CharacterJSON };