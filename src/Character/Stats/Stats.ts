import ArmourType from '../../ArmourType';
import { Equipment } from '../../Equipment/Equipment';
import { ItemStats } from '../../Equipment/Item';
import WeaponStyle from '../../WeaponStyle';
import AttributeStatScaling from '../Attributes/AttributeStatScaling';
import AttributeType from '../Attributes/AttributeType';
import Character from '../Character';
import Stat from './Stat';
import { StatTemplate } from './StatTemplate';
import StatType from './StatType';

function calcTotalStat(stat: Stat) {
    return stat.base + stat.attribute + stat.bonus;
}

const ArmourTypeDodgeMultiplier: {[type in ArmourType]: number} = {
    [ArmourType.Unarmoured]: 1,
    [ArmourType.Light]: 0.9,
    [ArmourType.Medium]: 0.6,
    [ArmourType.Heavy]: 0.4,
};

type BaseStats = {[stat in StatType]?: number};

class Stats {
    static TwoHandedBonus = 0.5;

    static DEFAULT_MAX_HEALTH = 20;
    static DEFAULT_MAX_HEALTH_PER_LVL = 4;
    static DEFAULT_DODGE = 50;
    static DEFAULT_HIT_CHANCE = 50;
    static DEFAULT_CRIT_CHANCE = 5;
    static DEFAULT_CRIT_DAMAGE = 1.5;

    static DEFAULT_MAX_MANA = 100;
    static DEFAULT_MANA_ON_HIT = 5;
    static DEFAULT_MANA_REGEN = 5;

    static DUAL_WIELD_HIT_CHANCE_PENALTY = -10;
    static OFF_HAND_HIT_CHANCE_PENALTY = -20;

    character: Character;
    armourTypeDodgeMultiplier: number;

    // Defensive
    [StatType.MaxHealth]: Stat = {base: Stats.DEFAULT_MAX_HEALTH, attribute: 0, bonus: 0};
    [StatType.HealthPercent]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.Armour]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.Deflection]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.Dodge]: Stat = {base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0};
    [StatType.StatusResistance]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.Thorns]: Stat = {base: 0, attribute: 0, bonus: 0};
    // Block
    [StatType.BlockChance]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.BlockPower]: Stat = {base: 0, attribute: 0, bonus: 0};
    
    // Hit Chance
    [StatType.HitChance]: Stat = {base: Stats.DEFAULT_HIT_CHANCE, attribute: 0, bonus: 0};
    [StatType.OffHandHitChance]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.MeleeHitChance]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.RangedHitChance]: Stat = {base: 0, attribute: 0, bonus: 0};

    // Damage
    [StatType.Damage]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.OffHandDamage]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.MeleeDamage]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.RangedDamage]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.DamagePercent]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.MeleeDamagePercent]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.RangedDamagePercent]: Stat = {base: 0, attribute: 0, bonus: 0};

    // Critical
    [StatType.CriticalChance]: Stat = {base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0};
    [StatType.CriticalDamage]: Stat = {base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0};

    // Defense Reduction
    [StatType.ArmourPenetration]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.DodgeReduction]: Stat = {base: 0, attribute: 0, bonus: 0};
    
    // Spell
    [StatType.SpellHitChance]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.SpellPower]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.SpellPowerPercent]: Stat = {base: 0, attribute: 0, bonus: 0};
    
    // Mana
    [StatType.MaxMana]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.StartingMana]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.ManaRegen]: Stat = {base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0};
    [StatType.ManaOnHit]: Stat = {base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0};
    
    // Initiative
    [StatType.Initiative]: Stat = {base: 0, attribute: 0, bonus: 0};
    
    // Potion
    [StatType.PotionCharges]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.PotionHealing]: Stat = {base: 0, attribute: 0, bonus: 0};
    [StatType.PotionEffectiveness]: Stat = {base: 0, attribute: 0, bonus: 0};

    constructor({character, template, equipment}: {character: Character, template: StatTemplate, equipment: Equipment}) {
        this.character = character;

        // Set default max health
        this[StatType.MaxHealth].base = Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * character.level;

        // Set stats to template
        for (const [stat, {base, perLvl}] of Object.entries(template)) {
            this[stat as StatType].base = base + (perLvl ? perLvl * (character.level - 1) : 0);
        }

        // Add stats from attributes
        this.setStatsAttribute();

        // Add off-hand penalties
        if (equipment.offHandWeapon) {
            this[StatType.HitChance].bonus += Stats.DUAL_WIELD_HIT_CHANCE_PENALTY;
            this[StatType.OffHandHitChance].bonus += Stats.OFF_HAND_HIT_CHANCE_PENALTY;
        }

        this.armourTypeDodgeMultiplier =  equipment.armour ? ArmourTypeDodgeMultiplier[equipment.armour.type] : 0;

        // Add stats from equipment
        if (equipment.armour) this.addItemStats(equipment.armour.stats);
        if (equipment.belt) this.addItemStats(equipment.belt.stats);
        if (equipment.hands && ((equipment.hands.weaponStyle && equipment.hands.weaponStyle === character.weaponStyle) || !equipment.hands.weaponStyle)) {
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

    setStatsAttribute(): void {
        // Set attribute scaling stats to 0
        for (const stats of Object.values(AttributeStatScaling)) {
            for (const stat of Object.keys(stats)) {
                this[stat as StatType].attribute = 0;
            }
        }

        // Calculate attribute scaling stats
        for (const [type, {base, bonus}] of Object.entries(this.character.attributes)) {
            for (const [statType, scaling] of Object.entries(AttributeStatScaling[type as AttributeType])) {
                this[statType as StatType].attribute += (base + bonus) * scaling;
            }
        }
    }

    addItemStats(itemStats?: ItemStats) {
        if (!itemStats) return;
        for (const [type, val] of Object.entries(itemStats)) {
            this[type as StatType].bonus += val;
        }
    }

    getTwoHandedMultiplier(): number {
        return (1 + this.character.weaponStyle === WeaponStyle.TwoHanded ? Stats.TwoHandedBonus : 0);
    }

    // Defensive
    get maxHealth() {
        return calcTotalStat(this[StatType.MaxHealth]) * (1 + this.healthPercent);
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
        return calcTotalStat(this[StatType.SpellPower]) * (1 + this.spellPowerPercent);
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

export { Stat, BaseStats, Stats, calcTotalStat };