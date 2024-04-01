import { getRandomRange } from '../util';
import Battle, { Side } from '../Battle';
import BuffTracker from '../Buffs/BuffTracker';
import { BuffId } from '../Buffs/buffs';
import { PlayerStats } from '../statTemplates';
import { RangeType, Weapon, weapons } from '../Equipment/Weapons';
import { Shield } from '../Equipment/Shield';
import { Equipment, defaultEquipment } from '../Equipment/Equipment';
import DamageType from '../DamageType';
import HitType from '../HitType';
import { rollDice } from '../dice';
import { Potion } from '../Equipment/Potion';
import { ClassName, Classes } from './Classes/classes';
import { Attributes, BaseAttributes } from './Attributes';
import { StatType, Stats, calcTotalStat } from './Stats';

type CharacterInfo = {
    name: string,
    className: string,
    level: number,
    mainHand: Weapon,
    offHandWeapon?: Weapon,
    potion?: Potion,

    attributes: Attributes,
    stats: Stats
}

type CharacterJSON = {
    name: string;
    className: string;
    level: number;
    currHealth: number;
    maxHealth: number;
    currMana: number;
    maxMana: number;
    buffs: string;
    debuffs: string;
}

// TODO: add default (aas static vars) vals for 
// enum ManaOnHit {
//     OneHanded = 10,
//     TwoHanded = 20
// }
// enum ManaRegen {
//     OneHanded = 5,
//     TwoHanded = 10
// }
// const critRange = 20;
// const critMult = 2;

// Crit chance, crit dmg, hit chance, dodge chance, mana regen, mana on hit (one-hand vs two-hand)
export default class Character {
    static dualWieldPenalty = -2;
    static offHandPenalty = -4;
    static twoHandedMult = 1.5;

    private userId?: string;

    protected _name: string;
    protected className: string;

    protected level: number;

    // Attributes and Stats
    protected attributes: Attributes;
    protected stats: Stats;
    protected currentHealth: number;
    protected currentMana: number;

    // Equipment
    protected _mainHand: Weapon;
    protected offHandWeapon?: Weapon;
    protected offHandShield?: Shield;
    protected potion: Potion;

    // Buffs/Debuffs
    protected _buffTracker: BuffTracker = new BuffTracker(this);

    // Battle Info
    protected _target: Character|null = null;
    protected _battle : {ref: Battle, side: Side, index: number} | null = null;

    constructor(level: number, className: string, attributes: BaseAttributes, equipment: Equipment, name: string, options?: {userId?: string, currHealthPc?: number, currManaPc?: number}) {
        this._name = name;
        this.level = level;
        this.className = className;

        // Weapons and Potion
        this._mainHand = Object.assign({}, equipment.mainHand);
        this.offHandWeapon = Object.assign({}, equipment.offHandWeapon);
        this.potion = Object.assign({}, equipment.potion);

        // Attributes
        this.attributes = new Attributes(attributes);
        // TODO: Add attributes from equipment
        this.stats = new Stats(this.attributes, equipment);
        this.currentHealth = 
        this.currentMana = calcTotalStat(this.stats[StatType.StartingMana]);

        if (options?.userId) {
            const userId = options.userId;
            this.userId = userId;
            // Add user upgrades
            // if (userUpgrades[userId]) {
            //     this.mainHand.attackBonus += upgrades.attackBonus.levels[userUpgrades[userId].attackBonus];
            //     if (this.offHandWeapon) this.offHandWeapon.attackBonus += upgrades.attackBonus.levels[userUpgrades[userId].attackBonus];
            //     this._armourClass += upgrades.armourClass.levels[userUpgrades[userId].armourClass];
            //     this.maxHealth += upgrades.health.levels[userUpgrades[userId].health];
            // }
        }

        this.currentHealth = options?.currHealthPc ? Math.ceil(this.stats.maxHealth * options.currHealthPc) : this.stats.maxHealth;
        this._mainHand.damageBonus = Math.floor(this._mainHand.damageBonus);
        if (this.offHandWeapon) this.offHandWeapon.damageBonus = Math.floor(this.offHandWeapon.damageBonus);
    }

    setBattle(ref: Battle, side: Side, index: number) {
        this._battle = {
            ref,
            side,
            index
        };
    }
    

    static addHandsBonus(weapon: Weapon, bonuses: {attack: number, damage: number, critRange: number, critMult: number}) {
        weapon.attackBonus += bonuses.attack;
        weapon.damageBonus += bonuses.damage * (weapon.twoHanded ? Character.twoHandedMult : 1);
        weapon.critRange -= bonuses.critRange;
        weapon.critMult += bonuses.critMult;
    }

    get name() {
        return this._name;
    }

    get mainHand() {
        return this._mainHand;
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

    get buffTracker() {
        return this._buffTracker;
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

    doTurn(): void {
        if (this.potion && this.potion.charges > 0 && this.currentHealth <= this.stats.maxHealth/2) {
            const potionHeal = Math.round((rollDice(this.potion.dice) + this.potion.bonus) * (1 + calcTotalStat(this.stats[StatType.PotionEffectiveness])/100));
            this.addHealth(potionHeal);
            this.potion.charges -= 1;
            if (this.battle) this.battle.ref.log.add(`${this.name} used ${this.potion.name} and healed for ${potionHeal.toLocaleString()}.`);
        }
        else {
            this.attack();
        }
        this.buffTracker.tick();
    }

    // TODO: redo with hit chance, dodge chance, and dodge reduction
    attackRoll(weapon: Weapon): {hitType: HitType, details: string} {
        if (!this.target) return {hitType: HitType.Miss, details: 'No Target'};
        const attackRoll = rollDice({num: 1, sides: 20});
        const rollToHitTaget = this.target.stats.dodge - (weapon.range === RangeType.Melee ? this.stats.meleeHitChance : this.stats.rangedHitChance) - this.stats.dodgeReduction;
        const details = `${attackRoll} vs. ${rollToHitTaget <= 2 ? 2 : rollToHitTaget <= 20 ? rollToHitTaget : 20}`;
        if (attackRoll === 1) {
            return {hitType: HitType.CritMiss, details};
        }
        else if (attackRoll === 20) {
            return {hitType: HitType.Crit, details};
        }
        else if (attackRoll >= rollToHitTaget) {
            if (attackRoll >= weapon.critRange) {
                return {hitType: HitType.Crit, details};
            }
            return {hitType: HitType.Hit, details};
        }
        else {
            return {hitType: HitType.Miss, details};
        }
    }

    attack(): void {
        if (!this.battle) return;
        this.setTarget();
        if (this.target) { 
            let hitTarget = false;
            
            // Main hand attack
            let attack = this.attackRoll(this.mainHand);
            if (attack.hitType === HitType.Hit || attack.hitType === HitType.Crit) {
                hitTarget = true;
                const damageRoll = rollDice(this.mainHand.damage);
                const sneakDamage = this.isInvisible() ? rollDice({num: 1 + Math.floor(this.mainHand.damageBonus/2), sides: 4}) : 0;
                let damage = damageRoll + this.mainHand.damageBonus + sneakDamage;
                if (attack.hitType === HitType.Crit) damage = Math.floor(damage * this.mainHand.critMult);
                // TODO: add calculations for block chance and block power
                this.battle.ref.log.addAttack(this.name, this.target.name, attack.details, attack.hitType, sneakDamage > 0);
                this.target.takeDamage(this.name, damage, this.mainHand.damageType);
                if (this.mainHand.onHit) this.mainHand.onHit.func(this, this.target);
                this.addMana(this.mainHand.manaPerAtk);
                
            }
            else {
                this.battle.ref.log.addAttack(this.name, this.target.name, attack.details, attack.hitType, false);
            }

            // Off hand attack
            if (this.offHandWeapon) {
                attack = this.attackRoll(this.offHandWeapon);
                if (attack.hitType === HitType.Hit || attack.hitType === HitType.Crit) {
                    hitTarget = true;
                    const damageRoll = rollDice(this.offHandWeapon.damage);
                    const sneakDamage = this.isInvisible() ? rollDice({num: 1 + Math.floor(this.offHandWeapon.damageBonus/2), sides: 4}) : 0;
                    let damage = damageRoll + this.offHandWeapon.damageBonus + sneakDamage;
                    if (attack.hitType === HitType.Crit) damage = Math.floor(damage * this.mainHand.critMult);
                    this.battle.ref.log.addAttack(this.name, this.target.name, attack.details, attack.hitType, sneakDamage > 0);
                    this.target.takeDamage(this.name, damage, this.offHandWeapon.damageType);
                    if (this.offHandWeapon.onHit) this.offHandWeapon.onHit.func(this, this.target);
                    this.addMana(this.offHandWeapon.manaPerAtk);
                }
                else {
                    this.battle.ref.log.addAttack(this.name, this.target.name, attack.details, attack.hitType, false);
                }
            }

            // Apply thorns damage if target was hit
            if (hitTarget && this.target.stats.thorns > 0) {
                this.takeDamage('Thorns', this.target.stats.thorns, DamageType.Physical);
            }
            
        }
    }

    takeDamage(source: string, damage: number, type: DamageType): void {
        if (!this.battle) return;
        let damageTaken = damage;
        // Apply deflection
        damageTaken = Math.max(damageTaken - calcTotalStat(this.stats[StatType.Deflection]), 0);
        // Apply armour
        damageTaken = Math.max(Math.round(damageTaken * calcTotalStat(this.stats[StatType.Armour])/100), 0);
        this.currentHealth -= damageTaken;
        this.battle.ref.log.addDamage(this.name, source, damage, type);
        if (this.isDead()) {
            this.battle.ref.setCharDead(this.battle.side, this.battle.index);
            this.battle.ref.log.add(`${this.name} died.`);
        }
    }

    addMana(mana: number): void {
        this.currentMana = Math.min(this.currentMana + mana, this.stats.maxMana);
    }

    addHealth(health: number): void {
        this.currentHealth = Math.min(this.currentHealth + health, this.stats.maxHealth);
    }

    isDead(): boolean {
        return this.currentHealth <= 0;
    }

    isInvisible(): boolean {
        return this.buffTracker.getBuff(BuffId.Invisible) > 0;
    }

    info(): CharacterInfo {
        const info: CharacterInfo = {
            name: this.name,
            className: this.className,
            level: this.level,
            mainHand: this.mainHand,
            potion: this.potion,
            attributes: this.attributes,
            stats: this.stats
        };
        if (this.offHandWeapon) {
            info.offHandWeapon = this.offHandWeapon;
        }
        return info;
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
            buffs: this.buffTracker.getBuffString(),
            debuffs: this.buffTracker.getDebuffString()
        };
    }
}

function newPlayerChar(userId: string, character: {name: string, level: number; class: ClassName}, equipment: Equipment) {
    const classDefault = defaultEquipment[character.class];
    // Set main hand to class default weapon if missing
    if (classDefault.mainHand && !equipment.mainHand) {
        if ((classDefault.mainHand.twoHanded && !equipment.offHandWeapon && !equipment.offHandShield) || !classDefault.mainHand.twoHanded) {
            equipment.mainHand = classDefault.mainHand;
        }
        else {
            equipment.mainHand = weapons.unarmed0;
        }
    }
    // Set off hand to class default weapon/shield if missing and main hand is not two-handed
    if ((classDefault.offHandWeapon || classDefault.offHandShield) && !equipment.offHandWeapon && !equipment.offHandShield && equipment.mainHand && !equipment.mainHand.twoHanded) {
        equipment.offHandWeapon = classDefault.offHandWeapon;
        equipment.offHandShield = classDefault.offHandShield;
    }
    return new Classes[character.class](character.level, PlayerStats[character.class], equipment, character.name, {userId});
}

export { CharacterInfo, CharacterJSON, newPlayerChar };