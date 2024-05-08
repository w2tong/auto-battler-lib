import { getRandomRange } from '../util';
import Battle, { Side } from '../Battle';
import StatusEffectManager from '../StatusEffect/StatusEffectManager';
import { AttackType, Weapon, weapons } from '../Equipment/Weapon';
import { Equipment } from '../Equipment/Equipment';
import HitType from '../HitType';
import { dice, rollDice } from '../dice';
import { Potion } from '../Equipment/Potion';
import { Stats, calcTotalStat } from './Stats/Stats';
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
    maxMana: number;
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
        this._currentMana = calcTotalStat(this.stats[StatType.StartingMana]);

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
        return this.stats.initiative;
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
        return `${Math.round(this.currentHealth)}/${calcTotalStat(this.stats[StatType.MaxHealth])}`;
    }

    getManaString(): string {
        return `${this.currentMana}/${calcTotalStat(this.stats[StatType.MaxMana])}`;
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
            const potionHeal = Math.round((rollDice(this.equipment.potion.dice) + this.equipment.potion.bonus) * (1 + calcTotalStat(this.stats[StatType.PotionEffectiveness])));
            this.addHealth(potionHeal);
            this.equipment.potion.charges -= 1;
            if (this.battle) this.battle.ref.log.add(`${this.name} used ${this.equipment.potion.name} and healed for ${potionHeal.toLocaleString()}.`);
        }
    }

    useMana(): void {
        this._currentMana -= this.stats.maxMana;
    }

    doTurn(): void {
        this.statusEffectManager.onTurnStart();
        this.usePotion();

        if (this.ability && this.currentMana >= this.stats.maxMana) {
            this.ability.func(this);
        }
        else {
            this.weaponAttack();
        }
        this.addMana(this.stats.manaRegen);
        this.statusEffectManager.onTurnEnd();
    }

    
    hitRoll({target, attackType, isOffHand}: {target: Character, attackType: AttackType, isOffHand: boolean}): boolean {
        if (isOffHand && !this.equipment.offHandWeapon) return false;
        // TODO: add crit miss (always 5% chance to miss) and crit hits (always 5% chance to hit)
        // rolling 1-5 misses
        // rolling 96-100 hits
        const roll = rollDice(dice['1d100']);
        
        let hitChance = this.stats.hitChance;
        // Add off-hand hit chance
        if (isOffHand) hitChance += this.stats.offHandHitChance;
        // Add attack type hit chance
        switch(attackType) {
            case AttackType.Melee:
                hitChance += this.stats.meleeHitChance;
                break;
            case AttackType.Ranged:
                hitChance += this.stats.rangedHitChance;
                break;
            case AttackType.Spell:
                hitChance += this.stats.spellHitChance;
                break;
        }
        (attackType === AttackType.Melee ? this.stats.meleeHitChance : this.stats.rangedHitChance);
        const targetDodgeChance = target.stats.dodge - this.stats.dodgeReduction;

        return roll + hitChance >= targetDodgeChance;
    }

    critRoll(): boolean {
        const roll = rollDice(dice['1d100']);
        return roll <= this.stats.criticalChance;
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
            let damageBonus = this.stats.damage;
            let damagePercentBonus = this.stats.damagePercent;
            switch(attackType) {
                case AttackType.Melee:
                    damageBonus += this.stats.meleeDamage;
                    damagePercentBonus += this.stats.meleeDamagePercent;
                    break;
                case AttackType.Ranged:
                    damageBonus += this.stats.rangedDamage;
                    damagePercentBonus += this.stats.rangedDamage;
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

            damage = (damage + damageBonus + spellDamage + sneakDamage) * (1 + (damagePercentBonus));
            
            const crit = this.critRoll();
            if (crit) {
                damage *= this.stats.criticalDamage;
                hitType = HitType.Crit;
            }
            
            // Calculate block chance/power
            if (target.stats.blockChance > 0 && rollDice(dice['1d100']) >= target.stats.blockChance) {
                damage -= target.stats.blockPower;
                blocked = true;
            }

            target.takeDamage({
                source: this.name, 
                damage,
                armourPenetration: this.stats.armourPenetration,
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

        return hit;
    }

    weaponAttack(): void {
        if (!this.battle) return;
        this.setTarget();
        if (!this.target) {
            this.battle.ref.log.add(`${this._name} has no target.`);
            return;
        }
        if (this.target) { 
            let hitTarget = false;
            
            // Main hand attack
            const mainHandHit = this.attack({
                target: this.target, 
                attackType: this.mainHand.attackType, 
                damageRange: this.mainHand.damageRange,
                isOffHand: false
            });
            if (mainHandHit) {
                this.addMana(this.stats.manaOnHit);
                if (this.mainHand.onHit) this.mainHand.onHit.func(this, this.target);
                hitTarget = true;
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
                    this.addMana(this.stats.manaOnHit);
                    if (this.equipment.offHandWeapon.onHit) this.equipment.offHandWeapon.onHit.func(this, this.target);
                    hitTarget = true;
                }
            }

            // Deal thorns damage to this Character if target was hit
            if (hitTarget && this.target.stats.thorns > 0) {
                this.takeDamage({
                    source: StatType.Thorns,
                    damage: this.target.stats.thorns,
                    armourPenetration: this.target.stats.armourPenetration,
                    addToLog: true
                });
            }
        }
    }

    takeDamage({source, damage, armourPenetration, addToLog}: {source: string, damage: number, armourPenetration: number, addToLog: boolean}): void {
        if (!this.battle) return;

        let damageTaken = damage;

        // Apply deflection
        damageTaken = Math.max(damageTaken - this.stats.deflection, 0);

        // Apply armour
        damageTaken = Math.max(Math.round(damageTaken * Math.max(this.stats.armour - armourPenetration, 0)/100), 0);

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
            maxHealth: this.stats[StatType.MaxHealth].base + this.stats[StatType.MaxHealth].bonus,
            currMana: this.currentHealth,
            maxMana: this.stats[StatType.MaxMana].base + this.stats[StatType.MaxMana].bonus,
            buffs: this.statusEffectManager.getBuffString(),
            debuffs: this.statusEffectManager.getDebuffString()
        };
    }
}

export { CharacterInfo, CharacterJSON };