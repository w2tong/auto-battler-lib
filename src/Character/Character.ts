import { getRandomRange } from '../util';
import Battle, { Side } from '../Battle';
import StatusEffectManager from '../StatusEffect/StatusEffectManager';
import { AttackType, Weapon, weapons } from '../Equipment/Weapon';
import { Equipment } from '../Equipment/Equipment';
import HitType from '../HitType';
import { dice, rollDice } from '../dice';
import { Potion } from '../Equipment/Potion';
import Stats from './Stats/Stats';
import DamageRange, { damageRoll } from '../DamageRange';
import Ability from '../Ability/Ability';
import { StatTemplate } from './Stats/StatTemplate';
import Invisible from '../StatusEffect/Buffs/Invisible';
import { ClassName, Classes } from './Classes/classes';
import WeaponStyle from '../WeaponStyle';
import BuffId from '../StatusEffect/BuffId';
import StatType from './Stats/StatType';
import Attributes from './Attributes/Attributes';
import BaseAttributes from './Attributes/BaseAttributes';

type CharacterInfo = {
    name: string,
    className: string | null,
    level: number,
    mainHand: Weapon,
    offHandWeapon?: Weapon,
    potion?: Potion,

    attributes: Attributes,
    stats: Stats
}

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
}

// Crit chance, crit dmg, hit chance, dodge chance, mana regen, mana on hit (one-hand vs two-hand)
export default class Character {
    private userId?: string;

    protected _name: string;
    protected className: ClassName | null;

    protected _level: number;

    // Equipment
    protected _equipment: Equipment;

    // Attributes and Stats
    protected _attributes: Attributes;
    protected _stats: Stats;
    protected _currentHealth: number;
    protected _currentMana: number;

    // Ability
    protected ability: Ability | null;

    // Buffs/Debuffs
    protected _statusEffectManager: StatusEffectManager = new StatusEffectManager(this);

    // Battle Info
    protected _target: Character|null = null;
    protected _battle : {ref: Battle, side: Side, index: number} | null = null;

    constructor({name, level, className, attributes, statTemplate, equipment, ability, options} :{name: string, level: number, className?: ClassName, attributes: BaseAttributes, statTemplate: StatTemplate, equipment: Equipment, ability?: Ability, options?: {userId?: string, currHealthPc?: number, currManaPc?: number}}) {
        this._name = name;
        this._level = level;
        this.className = className ?? null;

        this._equipment = equipment;

        // Attributes
        this._attributes = new Attributes(attributes, equipment);
        this._stats = new Stats({
            character: this,
            template: statTemplate,
            equipment,
        });
        this.ability = ability ?? (className ? Classes[className].ability : null);
        this._currentHealth = options?.currHealthPc ? Math.ceil(this.stats.maxHealth * options.currHealthPc) : this.stats.maxHealth;
        this._currentMana = this.stats.getStat(StatType.StartingMana);

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

    get mainHand() {
        return this.equipment.mainHand ?? weapons.unarmed0;
    }

    get weaponStyle() {
        return this.equipment.mainHand && this.equipment.offHandWeapon ? WeaponStyle.DualWield : this.equipment.mainHand?.twoHanded ? WeaponStyle.TwoHanded : WeaponStyle.OneHanded;  
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

    setRandomTarget(chars: Character[]): void {
        if (chars.length === 0) {
            this.target = null;
        }
        else {
            this.target = chars[getRandomRange(chars.length)];
        }   
    }

    setTarget(): void {
        if (!this.battle) return;
        if (this.target?.isDead() || this.target?.isInvisible()) {
            this.target = null;
        }
        if (!this.target) {
            // TODO: add condition if this char can see invisible targets
            // Filter out invisble targets
            const targets = this.battle.ref.getTargets(this.battle.side).filter(char => !char.isInvisible());
            this.setRandomTarget(targets);
        }
    }

    usePotion(): void {
        if (this.equipment.potion && this.equipment.potion.charges > 0 && this.currentHealth <= this.stats.maxHealth/2) {
            const potionHeal = Math.round((rollDice(this.equipment.potion.dice) + this.equipment.potion.bonus + this.stats.getStat(StatType.PotionHealing)) * (1 + this.stats.getStat(StatType.PotionEffectiveness)));
            this.addHealth(potionHeal);
            this.equipment.potion.charges -= 1;
            if (this.battle) this.battle.ref.log.add(`${this.name} used ${this.equipment.potion.name} and healed for ${potionHeal.toLocaleString()}.`);
        }
    }

    useMana(): void {
        this._currentMana -= this.stats.getStat(StatType.ManaCost);
    }

    doTurn(): void {
        this.statusEffectManager.onTurnStart();
        this.usePotion();

        if (this.ability && this.currentMana >= this.stats.getStat(StatType.ManaCost)) {
            this.ability.func(this);
        }
        else {
            this.weaponAttack();
        }
        this.addMana(this.stats.getStat(StatType.ManaRegen));
        this.statusEffectManager.onTurnEnd();
    }

    
    hitRoll({target, attackType, isOffHand}: {target: Character, attackType: AttackType, isOffHand: boolean}): boolean {
        if (isOffHand && !this.equipment.offHandWeapon) return false;

        const roll = rollDice(dice['1d100']);

        // Rolling 1-5 always misses
        if (roll <= 5) return false;
        // Rolling 96-100 always hits
        if (roll > 95) return true;
        
        let hitChance = this.stats.getStat(StatType.HitChance);
        // Add off-hand hit chance
        if (isOffHand) hitChance += this.stats.getStat(StatType.OffHandHitChance);
        // Add attack type hit chance
        switch(attackType) {
            case AttackType.MeleeWeapon:
                hitChance += this.stats.getStat(StatType.MeleeHitChance);
                break;
            case AttackType.RangedWeapon:
                hitChance += this.stats.getStat(StatType.RangedHitChance);
                break;
            case AttackType.Spell:
                hitChance += this.stats.getStat(StatType.SpellHitChance);
                break;
        }
        const targetDodgeChance = target.stats.dodge - this.stats.getStat(StatType.DodgeReduction);

        return roll + hitChance >= targetDodgeChance;
    }

    critRoll(): boolean {
        const roll = rollDice(dice['1d100']);
        return roll <= this.stats.getStat(StatType.CriticalChance);
    }

    attack({target, attackType, damageRange, spellPowerRatio, isOffHand, abilityName}: {target: Character, attackType: AttackType, damageRange: DamageRange, spellPowerRatio?: number, isOffHand: boolean, abilityName?: string}): boolean {

        let hitType: HitType = HitType.Miss;
        let damage: number = 0;
        let sneakDamage: number = 0;
        let blocked: boolean = false;

        const hit = this.hitRoll({
            target, 
            attackType, 
            isOffHand
        });

        // Calculate damage for the attack if hit
        if (hit) {
            hitType = HitType.Hit;
            
            damage = damageRoll(damageRange);

            // Add damage bonuses
            let damageBonus = this.stats.damage + (isOffHand ? this.stats.getStat(StatType.OffHandDamage) : 0);
            let damagePercent = this.stats.getStat(StatType.DamagePercent);
            switch(attackType) {
                case AttackType.MeleeWeapon:
                    damageBonus += this.stats.meleeDamage;
                    damagePercent += this.stats.getStat(StatType.MeleeWeaponDamagePercent);
                    break;
                case AttackType.RangedWeapon:
                    damageBonus += this.stats.rangedDamage;
                    damagePercent += this.stats.getStat(StatType.RangedWeaponDamagePercent);
                    break;
                case AttackType.Spell:
                    // do nothing
                    break;
                default:
                    break;
            }
            const spellDamage = spellPowerRatio ? Math.floor(this.stats.spellPower * spellPowerRatio) : 0;

            if (this.isInvisible()) {
                sneakDamage = Invisible.damage * this.statusEffectManager.getBuffStacks(BuffId.Invisible);
            }

            damage = (damage + damageBonus + spellDamage + sneakDamage) * (1 + (damagePercent));
            
            const crit = this.critRoll();
            if (crit) {
                damage *= this.stats.getStat(StatType.CriticalDamage);
                hitType = HitType.Crit;
            }
            
            // Calculate block chance/power
            if (target.stats.getStat(StatType.BlockChance) > 0 && rollDice(dice['1d100']) >= target.stats.getStat(StatType.BlockChance)) {
                damage -= target.stats.getStat(StatType.BlockPower);
                blocked = true;
            }

            target.takeDamage({
                source: this.name, 
                damage,
                armourPenetration: this.stats.getStat(StatType.ArmourPenetration),
                addToLog: false
            });
        }

        // Add hit to combat log
        if (this.battle) {
            this.battle.ref.log.addAttack({
                charName: this.name,
                tarName: target.name,
                hitType,
                damage,
                sneak: sneakDamage > 0,
                blocked,
                abilityName
            });
        }

        this.statusEffectManager.onAttack(hit);

        // Deal thorns damage to this Character if target was hit
        if (hit && target.stats.getStat(StatType.Thorns) > 0) {
            this.takeDamage({
                source: StatType.Thorns,
                damage: target.stats.getStat(StatType.Thorns),
                armourPenetration: target.stats.getStat(StatType.ArmourPenetration),
                addToLog: true
            });
        }

        return hit;
    }

    weaponAttack(options?: {fromAbility: boolean}): void {
        if (!this.battle) return;
        this.setTarget();
        if (!this.target) {
            this.battle.ref.log.add(`${this._name} has no target.`);
            return;
        }
        if (this.target) { 
            
            // Main hand attack
            const mainHandHit = this.attack({
                target: this.target, 
                attackType: this.mainHand.attackType, 
                damageRange: this.mainHand.damageRange,
                isOffHand: false
            });
            if (mainHandHit) {
                if (!options?.fromAbility) this.addMana(this.stats.manaOnHit);
                if (this.mainHand.onHit) this.mainHand.onHit.func(this, this.target);
            }
            
            // Off-hand attack
            if (this.equipment.offHandWeapon) {
                const offHandHit = this.attack({
                    target: this.target, 
                    attackType: this.equipment.offHandWeapon.attackType, 
                    damageRange: this.equipment.offHandWeapon.damageRange,
                    isOffHand: true
                });
                if (offHandHit) {
                    if (!options?.fromAbility) this.addMana(this.stats.manaOnHit);
                    if (this.equipment.offHandWeapon.onHit) this.equipment.offHandWeapon.onHit.func(this, this.target);
                }
            }
        }
    }

    takeDamage({source, damage, armourPenetration, addToLog}: {source: string, damage: number, armourPenetration: number, addToLog: boolean}): void {
        if (!this.battle) return;

        let damageTaken = damage;

        // Apply deflection
        damageTaken = Math.max(damageTaken - this.stats.getStat(StatType.Deflection), 0);

        // Apply armour
        damageTaken = Math.max(Math.round(damageTaken * Math.max(this.stats.getStat(StatType.Armour) - armourPenetration, 0)/100), 0);

        this._currentHealth -= Math.round(damageTaken);
        if (addToLog) this.battle.ref.log.addDamage(this.name, source, damage);
        if (this.isDead()) {
            this.battle.ref.setCharDead(this.battle.side, this.battle.index);
            this.battle.ref.log.add(`${this.name} died.`);
        }
    }

    addMana(mana: number): void {
        this._currentMana += mana;
    }

    addHealth(health: number): void {
        this._currentHealth = Math.min(this.currentHealth + health, this.stats.maxHealth);
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
            className: this.className,
            level: this.level,
            mainHand: this.mainHand,
            offHandWeapon: this.equipment.offHandWeapon,
            potion: this.equipment.potion,
            attributes: this.attributes,
            stats: this.stats
        };
    }

    // Helper functions
    json(): CharacterJSON {
        return {
            name: this._name,
            className: this.className,
            level: this.level,
            currHealth: this.currentHealth,
            maxHealth: this.stats.getStat(StatType.MaxHealth),
            currMana: this.currentHealth,
            manaCost: this.stats.getStat(StatType.ManaCost),
            buffs: this.statusEffectManager.getBuffString(),
            debuffs: this.statusEffectManager.getDebuffString()
        };
    }
}

export { CharacterInfo, CharacterJSON };