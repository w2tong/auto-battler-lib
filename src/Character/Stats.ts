import { Equipment } from '../Equipment/Equipment';
import { WeaponStyle } from '../Equipment/Hands';
import { ItemStats } from '../Equipment/Item';
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
    SpellPower = 'Spell Power',

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

class Stats {
    static TwoHandedBonus = 50;

    static BaseManaOnHit = 5;
    static BaseManaRegen = 5;
    static BaseCriticalChance = 5;
    static BaseCriticalDamage = 50;

    static DualWieldPenalty = -10;
    static OffHandPenalty = -20;

    // Defensive Stats
    weaponStyle: WeaponStyle;
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
    [StatType.HitChance]: Stat = {base: 0, bonus: 0};
    [StatType.OffHandHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeHitChance]: Stat = {base: 0, bonus: 0};
    [StatType.RangedHitChance]: Stat = {base: 0, bonus: 0};

    [StatType.Damage]: Stat = {base: 0, bonus: 0};
    [StatType.OffHandDamage]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeDamage]: Stat = {base: 0, bonus: 0};
    [StatType.RangedDamage]: Stat = {base: 0, bonus: 0};

    [StatType.DamagePercent]: Stat = {base: 0, bonus: 0};
    [StatType.MeleeDamagePercent]: Stat = {base: 0, bonus: 0};
    [StatType.RangedDamagePercent]: Stat = {base: 0, bonus: 0};

    [StatType.CriticalChance]: Stat = {base: Stats.BaseCriticalChance, bonus: 0};
    [StatType.CriticalDamage]: Stat = {base: Stats.BaseCriticalDamage, bonus: 0};

    [StatType.ArmourPenetration]: Stat = {base: 0, bonus: 0};
    [StatType.DodgeReduction]: Stat = {base: 0, bonus: 0};
    
    // Spell
    [StatType.SpellPower]: Stat = {base: 0, bonus: 0};
    
    // Mana
    [StatType.MaxMana]: Stat = {base: 0, bonus: 0};
    [StatType.StartingMana]: Stat = {base: 0, bonus: 0};
    [StatType.ManaRegen]: Stat = {base: Stats.BaseManaRegen, bonus: 0};
    [StatType.ManaOnHit]: Stat = {base: 0, bonus: 0};
    
    // Initiative
    [StatType.Initiative]: Stat = {base: 0, bonus: 0};
    
    // Potion
    [StatType.PotionCharges]: Stat = {base: 0, bonus: 0};
    [StatType.PotionHealing]: Stat = {base: 0, bonus: 0};
    [StatType.PotionEffectiveness]: Stat = {base: 0, bonus: 0};

    constructor(attributes: Attributes, equipment: Equipment, weaponStyle: WeaponStyle) {
        // Add stats from attributes
        for (const [attributeType, {base, bonus}] of Object.entries(attributes)) {
            for (const [statType, scaling] of Object.entries(AttributeStatScaling[attributeType as AttributeType])) {
                this[statType as StatType].base += (base + bonus) * scaling;
            }
        }

        // Add off-hand penalties
        if (equipment.offHandWeapon) {
            this[StatType.HitChance].bonus += Stats.DualWieldPenalty;
            this[StatType.OffHandHitChance].bonus += Stats.OffHandPenalty;
        }

        this.weaponStyle = weaponStyle;

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

    get maxHealth() {
        return calcTotalStat(this[StatType.MaxHealth]) * (1 + calcTotalStat(this[StatType.HealthPercent])/100);
    }

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

    get damage() {
        return calcTotalStat(this[StatType.Damage]) * this.getTwoHandedMultiplier();
    }
    get meleeDamage() {
        return calcTotalStat(this[StatType.Damage]) * this.getTwoHandedMultiplier();
    }
    get rangedDamage() {
        return calcTotalStat(this[StatType.Damage]) * this.getTwoHandedMultiplier();
    }

    get criticalChance() {
        return calcTotalStat(this[StatType.CriticalChance]);
    }

    get criticalDamage() {
        return calcTotalStat(this[StatType.CriticalDamage]);
    }

    get dodge() {
        return calcTotalStat(this[StatType.Dodge]);
    }

    get dodgeReduction() {
        return calcTotalStat(this[StatType.Dodge]);
    }

    get thorns() {
        return calcTotalStat(this[StatType.Thorns]);
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

export { Stat, StatType, Stats, calcTotalStat };