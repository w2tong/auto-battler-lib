import { getRandomRange } from '../util';
import Battle, { Side } from '../Battle';
import BuffTracker from '../Buffs/BuffTracker';
import { BuffId } from '../Buffs/buffs';
import { PlayerStats } from '../statTemplates';
import { RangeType, Weapon, weapons } from '../Equipment/Weapon';
import { Shield } from '../Equipment/Shield';
import { Equipment, defaultEquipment } from '../Equipment/Equipment';
import HitType from '../HitType';
import { dice, rollDice } from '../dice';
import { Potion } from '../Equipment/Potion';
import { ClassName, Classes } from './Classes/classes';
import { Attributes, BaseAttributes } from './Attributes';
import { StatType, Stats, calcTotalStat } from './Stats';
import DamageRange, { damageRoll } from '../DamageRange';
import { WeaponStyle } from '../Equipment/Hands';

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

// Crit chance, crit dmg, hit chance, dodge chance, mana regen, mana on hit (one-hand vs two-hand)
export default class Character {
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
    protected weaponStyle: WeaponStyle;

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
        this.weaponStyle = 
            // If dual-wielding
            this._mainHand && this.offHandWeapon ? WeaponStyle.DualWield :
            // If two-handing
                this._mainHand.twoHanded ? WeaponStyle.TwoHanded :
                // Else one-handing
                    WeaponStyle.OneHanded;

        this.potion = Object.assign({}, equipment.potion);

        // Attributes
        this.attributes = new Attributes(attributes, equipment);
        this.stats = new Stats(this.attributes, equipment, this.weaponStyle);
        this.currentHealth = options?.currHealthPc ? Math.ceil(this.stats.maxHealth * options.currHealthPc) : this.stats.maxHealth;
        this.currentMana = calcTotalStat(this.stats[StatType.StartingMana]);

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

    usePotion(): void {
        if (this.potion && this.potion.charges > 0 && this.currentHealth <= this.stats.maxHealth/2) {
            const potionHeal = Math.round((rollDice(this.potion.dice) + this.potion.bonus) * (1 + calcTotalStat(this.stats[StatType.PotionEffectiveness])/100));
            this.addHealth(potionHeal);
            this.potion.charges -= 1;
            if (this.battle) this.battle.ref.log.add(`${this.name} used ${this.potion.name} and healed for ${potionHeal.toLocaleString()}.`);
        }
    }

    useMana(): void {
        this.currentMana -= this.stats.maxMana;
    }

    doTurn(): void {
        this.usePotion();
        this.weaponAttack();
        this.buffTracker.tick();
    }

    hitRoll({target, range, isOffHand}: {target: Character, range: RangeType, isOffHand: boolean}): boolean {
        if (isOffHand && !this.offHandWeapon) return false;
        const roll = rollDice(dice['1d100']);
        const hitChance = this.stats.hitChance + 
        // Add Off-hand hit chance
        (isOffHand ? this.stats.offHandHitChance : 0) + 
        // Add Melee/Ranged hit chance
        (range === RangeType.Melee ? this.stats.meleeHitChance : this.stats.rangedHitChance);
        const targetDodgeChance = target.stats.dodge - this.stats.dodgeReduction;

        return roll + hitChance >= targetDodgeChance;
    }

    critRoll(): boolean {
        const roll = rollDice(dice['1d100']);
        return roll <= this.stats.criticalChance;
    }

    // TODO: add support for attacks that use spell power
    // replace range with attack type? that includes (melee, ranged, spell)
    attack({target, range, damageRange, isOffHand, abilityName}: {target: Character, range: RangeType, damageRange: DamageRange, isOffHand: boolean, abilityName?: string}): boolean {

        let hitType: HitType = HitType.Miss;
        let damage: number = 0;
        let sneak: boolean = false;
        let blocked: boolean = false;

        const hit = this.hitRoll({
            target, 
            range, 
            isOffHand
        });

        // Calculate damage for the attack if hit
        if (hit) {
            hitType = HitType.Hit;
            
            damage = damageRoll(damageRange);
            
            // TODO: add sneak daamge
            if (this.isInvisible()) {
                // const sneakDamage = this.isInvisible() ? rollDice({num: 1 + Math.floor(this.mainHand.damageBonus/2), sides: 4}) : 0;
                sneak = true;
            }

            // Add damage bonuses
            let damageBonus = this.stats.damage;
            let damagePercentBonus = this.stats.damagePercent;
            if (range === RangeType.Melee) {
                damageBonus += this.stats.meleeDamage;
                damagePercentBonus += this.stats.meleeDamagePercent;
            }
            else {
                damageBonus += this.stats.rangedDamage;
                damagePercentBonus += this.stats.rangedDamage;
            }
            damage = (damage + damageBonus) * damagePercentBonus;
            
            const crit = this.critRoll();
            if (crit) {
                damage *= 1 + this.stats.criticalDamage/100;
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
                sneak,
                blocked,
                abilityName
            });
        }

        return hit;
    }

    // TODO: redo damage calculations
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
                range: this.mainHand.range, 
                damageRange: this.mainHand.damageRange,
                isOffHand: false
            });
            if (mainHandHit) {
                this.addMana(this.stats.manaOnHit);
                if (this.mainHand.onHit) this.mainHand.onHit.func(this, this.target);
                hitTarget = true;
            }
            
            // Off-hand attack
            if (this.offHandWeapon) {
                const offHandHit = this.attack({
                    target: this.target, 
                    range: this.offHandWeapon.range, 
                    damageRange: this.offHandWeapon.damageRange,
                    isOffHand: true
                });
                if (offHandHit) {
                    this.addMana(this.stats.manaOnHit);
                    if (this.offHandWeapon.onHit) this.offHandWeapon.onHit.func(this, this.target);
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

        this.currentHealth -= Math.round(damageTaken);
        if (addToLog) this.battle.ref.log.addDamage(this.name, source, damage);
        if (this.isDead()) {
            this.battle.ref.setCharDead(this.battle.side, this.battle.index);
            this.battle.ref.log.add(`${this.name} died.`);
        }
    }

    addMana(mana: number): void {
        this.currentMana += mana;
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