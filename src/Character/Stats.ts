import { ArmourTypeDodgeMultiplier } from '../Equipment/Armour';
import { Equipment } from '../Equipment/Equipment';
import { WeaponStyle } from '../Equipment/Hands';
import { ItemStats } from '../Equipment/Item';
import { AttributeStatScaling, AttributeType, Attributes } from './Attributes';
import { StatTemplate } from './StatTemplate';

interface Stat {
    base: number;
    bonus: number;
}

function calcTotalStat(stat: Stat) {
    return stat.base + stat.bonus;
}

enum StatType {
    // Defensive Stats
    MaxHealth = 'Max Health',
    HealthPercent = '% Health',
    Armour = 'Armour',
    Deflection = 'Deflection',
    Dodge = 'Dodge',
    StatusResistance = 'Status Resistance',
    Thorns = 'Thorns',

    BlockChance = 'Block Chance',
    BlockPower = 'Block Power',

    // Offensive Stats
    HitChance = 'Hit Chance',
    OffHandHitChance = 'Off-Hand Hit Chance',
    MeleeHitChance = 'Melee Hit Chance',
    RangedHitChance = 'Ranged Hit Chance',

    Damage = 'Damage',
    OffHandDamage = 'Off-Hand Damage',
    MeleeDamage = 'Melee Damage',
    RangedDamage = 'Ranged Damage',
    DamagePercent = '% Damage',
    MeleeDamagePercent = '% Melee Damage',
    RangedDamagePercent = '% Ranged Damage',

    CriticalChance = 'Critical Chance',
    CriticalDamage = 'Critical Damage',

    ArmourPenetration = 'Armour Penetration',
    DodgeReduction = 'Dodge Reduction',

    // Spell
    SpellHitChance = 'Spell Hit Chance',
    SpellPower = 'Spell Power',
    SpellPowerPercent = '% Spell Power',

    // Mana
    MaxMana = 'Max Mana',
    StartingMana = 'Starting Mana',
    ManaRegen = 'Mana Regen',
    ManaOnHit = 'Mana On Hit',

    // Initiative
    Initiative = 'Initiative',

    // Potion
    PotionCharges = 'Potion Charges',
    PotionHealing = 'Potion Healing',
    PotionEffectiveness = 'Potion Effectiveness'
}

type BaseStats = {
    // Defensive Stats
    [StatType.MaxHealth]?: number,
    [StatType.HealthPercent]?: number,
    [StatType.Armour]?: number,
    [StatType.Deflection]?: number,
    [StatType.Dodge]?: number,
    [StatType.StatusResistance]?: number,
    [StatType.Thorns]?: number,

    [StatType.BlockChance]?: number,
    [StatType.BlockPower]?: number,

    // Offensive Stats
    [StatType.HitChance]?: number,
    [StatType.OffHandHitChance]?: number,
    [StatType.MeleeHitChance]?: number,
    [StatType.RangedHitChance]?: number,

    [StatType.Damage]?: number,
    [StatType.OffHandDamage]?: number,
    [StatType.MeleeDamage]?: number,
    [StatType.RangedDamage]?: number,
    [StatType.DamagePercent]?: number,
    [StatType.MeleeDamagePercent]?: number,
    [StatType.RangedDamagePercent]?: number,

    [StatType.CriticalChance]?: number,
    [StatType.CriticalDamage]?: number,

    [StatType.ArmourPenetration]?: number,
    [StatType.DodgeReduction]?: number,

    // Spell
    [StatType.SpellHitChance]?: number,
    [StatType.SpellPower]?: number,
    [StatType.SpellPowerPercent]?: number,

    // Mana
    [StatType.MaxMana]?: number,
    [StatType.StartingMana]?: number,
    [StatType.ManaRegen]?: number,
    [StatType.ManaOnHit]?: number,

    // Initiative
    [StatType.Initiative]?: number,

    // Potion
    [StatType.PotionCharges]?: number,
    [StatType.PotionHealing]?: number,
    [StatType.PotionEffectiveness]?: number
}

class Stats {
    static TwoHandedBonus = 50;

    static DEFAULT_MAX_HEALTH = 20;
    static DEFAULT_MAX_HEALTH_PER_LVL = 5;
    static DEFAULT_DODGE = 50;
    static DEFAULT_HIT_CHANCE = 50;
    static DEFAULT_CRIT_CHANCE = 5;
    static DEFAULT_CRIT_DAMAGE = 50;

    static DEFAULT_MANA_ON_HIT = 5;
    static DEFAULT_MANA_REGEN = 5;

    static DualWieldPenalty = -10;
    static OffHandPenalty = -20;

    weaponStyle: WeaponStyle;
    armourTypeDodgeMultiplier: number;

    // Defensive
    [StatType.MaxHealth]: Stat = {base: Stats.DEFAULT_MAX_HEALTH, bonus: 0};
    [StatType.HealthPercent]: Stat = {base: 0, bonus: 0};
    [StatType.Armour]: Stat = {base: 0, bonus: 0};
    [StatType.Deflection]: Stat = {base: 0, bonus: 0};
    [StatType.Dodge]: Stat = {base: Stats.DEFAULT_DODGE, bonus: 0};
    [StatType.StatusResistance]: Stat = {base: 0, bonus: 0};
    [StatType.Thorns]: Stat = {base: 0, bonus: 0};
    // Block
    [StatType.BlockChance]: Stat = {base: 0, bonus: 0};
    [StatType.BlockPower]: Stat = {base: 0, bonus: 0};
    
    // Hit Chance
    [StatType.HitChance]: Stat = {base: Stats.DEFAULT_HIT_CHANCE, bonus: 0};
    [StatType.OffHandHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.RangedHitChance]: Stat = {base: 0, bonus: 0};

    // Damage
    [StatType.Damage]: Stat = {base: 0, bonus: 0};
    [StatType.OffHandDamage]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeDamage]: Stat = {base: 0, bonus: 0};
    [StatType.RangedDamage]: Stat = {base: 0, bonus: 0};
    [StatType.DamagePercent]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeDamagePercent]: Stat = {base: 0, bonus: 0};
    [StatType.RangedDamagePercent]: Stat = {base: 0, bonus: 0};

    // Critical
    [StatType.CriticalChance]: Stat = {base: Stats.DEFAULT_CRIT_CHANCE, bonus: 0};
    [StatType.CriticalDamage]: Stat = {base: Stats.DEFAULT_CRIT_DAMAGE, bonus: 0};

    // Defense Reduction
    [StatType.ArmourPenetration]: Stat = {base: 0, bonus: 0};
    [StatType.DodgeReduction]: Stat = {base: 0, bonus: 0};
    
    // Spell
    [StatType.SpellHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.SpellPower]: Stat = {base: 0, bonus: 0};
    [StatType.SpellPowerPercent]: Stat = {base: 0, bonus: 0};
    
    // Mana
    [StatType.MaxMana]: Stat = {base: 0, bonus: 0};
    [StatType.StartingMana]: Stat = {base: 0, bonus: 0};
    [StatType.ManaRegen]: Stat = {base: Stats.DEFAULT_MANA_REGEN, bonus: 0};
    [StatType.ManaOnHit]: Stat = {base: Stats.DEFAULT_MANA_ON_HIT, bonus: 0};
    
    // Initiative
    [StatType.Initiative]: Stat = {base: 0, bonus: 0};
    
    // Potion
    [StatType.PotionCharges]: Stat = {base: 0, bonus: 0};
    [StatType.PotionHealing]: Stat = {base: 0, bonus: 0};
    [StatType.PotionEffectiveness]: Stat = {base: 0, bonus: 0};

    constructor({level, template, attributes, equipment, weaponStyle}: {level: number, template: StatTemplate, attributes?: Attributes, equipment: Equipment, weaponStyle: WeaponStyle}) {
        // Set default max health
        this[StatType.MaxHealth].base = Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * level;

        // Set stats to template
        for (const [stat, {base, perLvl}] of Object.entries(template)) {
            this[stat as StatType].base = base + (perLvl ? perLvl * level : 0);
        }

        // Add stats from attributes
        if (attributes) {
            for (const [attributeType, {base, bonus}] of Object.entries(attributes)) {
                for (const [statType, scaling] of Object.entries(AttributeStatScaling[attributeType as AttributeType])) {
                    this[statType as StatType].base += (base + bonus) * scaling;
                }
            }
        }

        // Add off-hand penalties
        if (equipment.offHandWeapon) {
            this[StatType.HitChance].bonus += Stats.DualWieldPenalty;
            this[StatType.OffHandHitChance].bonus += Stats.OffHandPenalty;
        }

        this.weaponStyle = weaponStyle;
        this.armourTypeDodgeMultiplier =  equipment.armour ? ArmourTypeDodgeMultiplier[equipment.armour.type] : 0;

        // Add stats from equipment
        if (equipment.armour) this.addItemStats(equipment.armour.stats);
        if (equipment.belt) this.addItemStats(equipment.belt.stats);
        if (equipment.hands && ((equipment.hands.weaponStyle && equipment.hands.weaponStyle === weaponStyle) || !equipment.hands.weaponStyle)) {
            this.addItemStats(equipment.hands.stats);
        }
        if (equipment.head) this.addItemStats(equipment.head.stats);
        if (equipment.ring1) this.addItemStats(equipment.ring1.stats);
        if (equipment.ring2) this.addItemStats(equipment.ring2.stats);
        if (equipment.mainHand) this.addItemStats(equipment.mainHand.stats);
        if (equipment.offHandWeapon) this.addItemStats(equipment.offHandWeapon.stats);
        else if (equipment.offHandShield) this.addItemStats(equipment.offHandShield.stats);

        // Add stats from talents

        // TODO: Math.floor stats that are needed
    }

    addItemStats(itemStats?: ItemStats) {
        if (!itemStats) return;
        for (const [type, val] of Object.entries(itemStats)) {
            this[type as StatType].bonus += val;
        }
    }

    getTwoHandedMultiplier(): number {
        return (1 + this.weaponStyle === WeaponStyle.TwoHanded ? Stats.TwoHandedBonus/100 : 0);
    }

    // Defensive
    get maxHealth() {
        return calcTotalStat(this[StatType.MaxHealth]) * (1 + this.healthPercent/100);
    }
    get healthPercent() {
        return calcTotalStat(this[StatType.HealthPercent]);
    }
    get armour() {
        return calcTotalStat(this[StatType.Armour]);
    }
    get deflection() {
        return calcTotalStat(this[StatType.Deflection]);
    }
    get dodge() {
        return calcTotalStat(this[StatType.Dodge]) * this.armourTypeDodgeMultiplier;
    }
    get thorns() {
        return calcTotalStat(this[StatType.Thorns]);
    }
    // Block
    get blockChance() {
        return calcTotalStat(this[StatType.BlockChance]);
    }
    get blockPower() {
        return calcTotalStat(this[StatType.BlockPower]);
    }

    // Hit Chance
    get hitChance() {
        return calcTotalStat(this[StatType.HitChance]); 
    }

    get offHandHitChance() {
        return calcTotalStat(this[StatType.OffHandHitChance]); 
    }

    get meleeHitChance() {
        return calcTotalStat(this[StatType.MeleeHitChance]);
    }

    get rangedHitChance() {
        return calcTotalStat(this[StatType.RangedHitChance]);
    }

    // Damage
    get damage() {
        return calcTotalStat(this[StatType.Damage]) * this.getTwoHandedMultiplier();
    }
    get meleeDamage() {
        return calcTotalStat(this[StatType.Damage]) * this.getTwoHandedMultiplier();
    }
    get rangedDamage() {
        return calcTotalStat(this[StatType.Damage]) * this.getTwoHandedMultiplier();
    }
    get damagePercent() {
        return calcTotalStat(this[StatType.DamagePercent]);
    }
    get meleeDamagePercent() {
        return calcTotalStat(this[StatType.MeleeDamage]);
    }
    get rangedDamagePercent() {
        return calcTotalStat(this[StatType.RangedDamagePercent]);
    }

    // Critical
    get criticalChance() {
        return calcTotalStat(this[StatType.CriticalChance]);
    }

    get criticalDamage() {
        return calcTotalStat(this[StatType.CriticalDamage]);
    }

    // Defense Reduction
    get armourPenetration() {
        return calcTotalStat(this[StatType.ArmourPenetration]);
    }
    get dodgeReduction() {
        return calcTotalStat(this[StatType.Dodge]);
    }

    // Spell
    get spellHitChance() {
        return calcTotalStat(this[StatType.SpellHitChance]);
    }
    get spellPower() {
        return calcTotalStat(this[StatType.SpellPower]) * (1 + this.spellPowerPercent/100);
    }
    get spellPowerPercent() {
        return calcTotalStat(this[StatType.SpellPowerPercent]);
    }

    get initiative() {
        return calcTotalStat(this[StatType.Initiative]);
    }

    get maxMana() {
        return calcTotalStat(this[StatType.MaxMana]);
    }

    get manaRegen() {
        return calcTotalStat(this[StatType.ManaRegen]);
    }

    get manaOnHit() {
        return calcTotalStat(this[StatType.ManaOnHit]) * this.getTwoHandedMultiplier();
    }
}

// addRingBonuses(ring: Ring) {
//     this.mainHand.attackBonus += ring.attackBonus ?? 0;
//     this.mainHand.damageBonus += (ring.damageBonus ?? 0) * (this._mainHand.twoHanded ? Character.twoHandedMult : 1);
//     this.mainHand.critRange -= ring.critRangeBonus ?? 0;
//     this.mainHand.critMult += ring.critMultBonus ?? 0;
//     this.mainHand.manaPerAtk += ring.manaPerAtk ?? 0;

//     if (this.offHandWeapon) {
//         this.offHandWeapon.attackBonus += ring.attackBonus ?? 0;
//         this.offHandWeapon.damageBonus += ring.damageBonus ?? 0;
//         this.offHandWeapon.critRange -= ring.critRangeBonus ?? 0;
//         this.offHandWeapon.critMult += ring.critMultBonus ?? 0;
//         this.offHandWeapon.manaPerAtk += ring.manaPerAtk ?? 0;
//     }
//     // Defense
//     this._armourClass += ring.armourClass ?? 0;
//     this.physDR += ring.physDR ?? 0;
//     this.magicDR += ring.magicDR ?? 0;
//     this.physResist += ring.physResist ?? 0;
//     this.magicResist += ring.magicResist ?? 0;
//     this._thorns += ring.thorns ?? 0;
//     // Mana
//     this.manaRegen += ring.manaRegen ?? 0;
//     this.manaCostReduction += ring.manaCostReduction ?? 0;
//     // Other
//     this._initiativeBonus += ring.initiativeBonus ?? 0;
// }

export { Stat, StatType, BaseStats, Stats, calcTotalStat };