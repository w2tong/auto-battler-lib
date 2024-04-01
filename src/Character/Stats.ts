import { Equipment } from '../Equipment/Equipment';
import { AttributeStatScaling, AttributeType, Attributes } from './Attributes';

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
    HealthPercent = 'Health %',
    Armour = 'Armour',
    Deflection = 'Deflection',
    Dodge = 'Dodge',
    StatusResistance = 'Status Resistance',
    Thorns = 'Thorns',

    BlockChance = 'Block Chance',
    BlockPower = 'Block Power',

    // Offensive Stats
    CriticalChance = 'Critical Chance',
    CriticalDamage = 'Critical Damage',

    MeleeHitChance = 'Melee Hit Chance',
    MeleeDamage = 'Melee Damage',

    RangedHitChance = 'Ranged Hit Chance',
    RangedDamage = 'Ranged Damage',

    ArmourPenetration = 'Armour Penetration',
    DodgeReduction = 'Dodge Reduction',

    // Spell
    SpellPower = 'Spell Power',

    // Mana
    MaxMana = 'Max Mana',
    StartingMana = 'Starting Mana',
    ManaRegen = 'Mana Regen',
    ManaOnHit = 'Mana On Hit',
    ManaCostReduction = 'Mana Cost Reduction',

    // Initiative
    Initiative = 'Initiative',

    // Potion
    PotionCharges = 'Potion Charges',
    PotionHealing = 'Potion Healing',
    PotionEffectiveness = 'Potion Effectiveness'
}

class Stats {
    // Defensive Stats
    [StatType.MaxHealth]: Stat = {base: 0, bonus: 0};
    [StatType.HealthPercent]: Stat = {base: 0, bonus: 0};
    [StatType.Armour]: Stat = {base: 0, bonus: 0};
    [StatType.Deflection]: Stat = {base: 0, bonus: 0};
    [StatType.Dodge]: Stat = {base: 0, bonus: 0};
    [StatType.StatusResistance]: Stat = {base: 0, bonus: 0};
    [StatType.Thorns]: Stat = {base: 0, bonus: 0};

    [StatType.BlockChance]: Stat = {base: 0, bonus: 0};
    [StatType.BlockPower]: Stat = {base: 0, bonus: 0};
    
    // Offensive Stats
    [StatType.CriticalChance]: Stat = {base: 0, bonus: 0};
    [StatType.CriticalDamage]: Stat = {base: 0, bonus: 0};

    [StatType.MeleeHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeDamage]: Stat = {base: 0, bonus: 0};

    [StatType.RangedHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.RangedDamage]: Stat = {base: 0, bonus: 0};

    [StatType.ArmourPenetration]: Stat = {base: 0, bonus: 0};
    [StatType.DodgeReduction]: Stat = {base: 0, bonus: 0};
    
    // Spell
    [StatType.SpellPower]: Stat = {base: 0, bonus: 0};
    
    // Mana
    [StatType.MaxMana]: Stat = {base: 0, bonus: 0};
    [StatType.StartingMana]: Stat = {base: 0, bonus: 0};
    [StatType.ManaRegen]: Stat = {base: 0, bonus: 0};
    [StatType.ManaOnHit]: Stat = {base: 0, bonus: 0};
    [StatType.ManaCostReduction]: Stat = {base: 0, bonus: 0};
    
    // Initiative
    [StatType.Initiative]: Stat = {base: 0, bonus: 0};
    
    // Potion
    [StatType.PotionCharges]: Stat = {base: 0, bonus: 0};
    [StatType.PotionHealing]: Stat = {base: 0, bonus: 0};
    [StatType.PotionEffectiveness]: Stat = {base: 0, bonus: 0};

    constructor(attributes: Attributes, equipment: Equipment) {
        // Add stats from attributes
        for (const [attributeType, {base, bonus}] of Object.entries(attributes)) {
            for (const [statType, scaling] of Object.entries(AttributeStatScaling[attributeType as AttributeType])) {
                this[statType as StatType].base += (base + bonus) * scaling;
            }
        }

        // Add stats from equipment
        // DEPRECATED
        // const lvlAttackBonus = calcStatValue(stats.attackBonus, level);
        // const lvlDamageBonus = calcStatValue(stats.damageBonus, level);
        // const lvlManaPerAtk = stats.manaPerAtk ? calcStatValue(stats.manaPerAtk, level) : 0;

        // // Main hand weapon
        // this._mainHand = Object.assign({}, equipment.mainHand);
        // this._mainHand.attackBonus += lvlAttackBonus;
        // this._mainHand.damageBonus += lvlDamageBonus * (this._mainHand.twoHanded ? Character.twoHandedMult : 1);
        // this._mainHand.manaPerAtk += lvlManaPerAtk;

        // this._armourClass = calcStatValue(stats.armourClass, level);
        // this.physDR = stats.physDR ? calcStatValue(stats.physDR, level) : 0;
        // this.magicDR = stats.magicDR ? calcStatValue(stats.magicDR, level) : 0;
        // this.physResist = stats.physResist ? calcStatValue(stats.physResist, level) : 0;
        // this.magicResist = stats.magicResist ? calcStatValue(stats.magicResist, level) : 0;
        // this._thorns = stats.thorns ? calcStatValue(stats.thorns, level) : 0;

        // this.maxHealth = calcStatValue(stats.health, level);

        // this.maxMana = stats.mana ?? 0;
        // this.currMana = options?.currManaPc ? Math.ceil(this.maxMana * options.currManaPc) : 0;
        // this.manaCostReduction = 0;

        // this.manaRegen = stats.manaRegen ? calcStatValue(stats.manaRegen, level) + (this._mainHand.manaRegen ?? 0) : 0;
        // this._initiativeBonus = calcStatValue(stats.initiativeBonus, level);

        // // Off hand weapon/shield
        // if (equipment.offHandWeapon && equipment.offHandShield) {
        //     throw Error('cannot have both weapon and shield in offhand');
        // }
        // if (equipment.offHandWeapon) {
        //     this.mainHand.attackBonus += Character.dualWieldPenalty;
        //     this.offHandWeapon = Object.assign({}, equipment.offHandWeapon);
        //     this.offHandWeapon.attackBonus += lvlAttackBonus + Character.dualWieldPenalty + Character.offHandPenalty;
        //     this.offHandWeapon.damageBonus += lvlDamageBonus;
        //     this.offHandWeapon.manaPerAtk += lvlManaPerAtk;
        //     this.manaRegen += this.offHandWeapon.manaRegen ?? 0;
        // }
        // else if (equipment.offHandShield) {
        //     const shield = equipment.offHandShield;
        //     this._armourClass += shield.armourClass;
        //     this.mainHand.attackBonus += shield.attackBonus ?? 0;
        //     this.physDR += shield.physDR ?? 0;
        //     this.magicDR += shield.magicDR ?? 0;
        //     this.physResist += shield.physResist ?? 0;
        //     this.magicResist += shield.magicResist ?? 0;
        //     this._thorns += shield.thorns ?? 0;
        // }

        // // Armour
        // if (equipment.armour) {
        //     this._armourClass += equipment.armour.armourClass;
        //     this.physDR += equipment.armour.physDR ?? 0;
        //     this.magicDR += equipment.armour.magicDR ?? 0;
        //     this.physResist += equipment.armour.physResist ?? 0;
        //     this.magicResist += equipment.armour.magicResist ?? 0;
        //     this.manaRegen += equipment.armour.manaRegen ?? 0;
        //     this._thorns += equipment.armour.thorns ?? 0;
        // }

        // // Head
        // if (equipment.head) {
        //     this._armourClass += equipment.head.armourClass ?? 0;
        //     this.mainHand.manaPerAtk += equipment.head.manaPerAtk ?? 0;
        //     if (this.offHandWeapon) this.offHandWeapon.manaPerAtk += equipment.head.manaPerAtk ?? 0;
        //     this.manaRegen += equipment.head.manaRegen ?? 0;
        //     this.manaCostReduction += equipment.head.manaCostReduction ?? 0;
        //     this._initiativeBonus += equipment.head.initiativeBonus ?? 0;
        // }

        // //Hands
        // if (equipment.hands) {
        //     const handsBonuses = {
        //         attack: equipment.hands.attackBonus ?? 0,
        //         damage: equipment.hands.damageBonus ?? 0,
        //         critRange: equipment.hands.critRangeBonus ?? 0,
        //         critMult: equipment.hands.critMultBonus ?? 0
        //     };
        //     if (equipment.hands.weaponStyle) {
        //         if (equipment.hands.weaponStyle === WeaponStyle.DualWield && this.mainHand && this.offHandWeapon) {
        //             Character.addHandsBonus(this.mainHand, handsBonuses);
        //             if (this.offHandWeapon) Character.addHandsBonus(this.offHandWeapon, handsBonuses);
        //         }
        //         else if (
        //             (equipment.hands.weaponStyle === WeaponStyle.TwoHanded && this.mainHand.twoHanded) ||
        //             (equipment.hands.weaponStyle === WeaponStyle.OneHanded && !this.mainHand.twoHanded && !this.offHandWeapon) ||
        //             (equipment.hands.weaponStyle === WeaponStyle.Ranged && this.mainHand.range === RangeType.LongRange)
        //         ) {
        //             Character.addHandsBonus(this.mainHand, handsBonuses);
        //         }
        //     }
        //     else {
        //         Character.addHandsBonus(this.mainHand, handsBonuses);
        //         if (this.offHandWeapon) Character.addHandsBonus(this.offHandWeapon, handsBonuses);
        //     }
        // }

        // // Rings
        // if (equipment.ring1) this.addRingBonuses(equipment.ring1);
        // if (equipment.ring2) this.addRingBonuses(equipment.ring2);

        if (equipment.belt) {
            if (equipment.belt.charges) this[StatType.PotionCharges].bonus += equipment.belt.charges;
            if (equipment.belt.effectiveness) this[StatType.PotionEffectiveness].bonus += equipment.belt.effectiveness;
            if (equipment.belt.healing) this[StatType.PotionHealing].bonus += equipment.belt.healing;
        }

        // Add stats from talents
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

export { Stat, StatType, Stats, calcTotalStat };