import { ArmourType } from '../../Equipment/Armour';
import { Equipment } from '../../Equipment/Equipment';
import { ItemStats } from '../../Equipment/Item';
import WeaponStyle, { getWeaponStyle } from '../../WeaponStyle';
import Attributes from '../Attributes/Attributes';
import AttributeStatScaling from '../Attributes/AttributeStatScaling';
import AttributeType from '../Attributes/AttributeType';
import ArmourTypeDodgeMultiplier from './ArmourTypeDodgeMultiplier';
import Stat from './Stat';
import { StatTemplate } from './StatTemplate';
import StatType from './StatType';

class Stats {
    static TWO_HANDED_BONUS = 0.5;

    static DEFAULT_MAX_HEALTH = 20;
    static DEFAULT_MAX_HEALTH_PER_LVL = 4;
    static DEFAULT_DODGE = 40;
    static DEFAULT_CRIT_CHANCE = 5;
    static DEFAULT_CRIT_DAMAGE = 1.5;

    static DEFAULT_MANA_COST = 100;
    static DEFAULT_MANA_ON_HIT = 5;
    static DEFAULT_MANA_REGEN = 5;

    static DUAL_WIELD_ACCURACY_PENALTY = -10;
    static OFF_HAND_ACCURACY_PENALTY = -20;

    armourType: ArmourType;
    weaponStyle: WeaponStyle;

    // Defensive
    [StatType.MaxHealth]: Stat = { base: Stats.DEFAULT_MAX_HEALTH, attribute: 0, bonus: 0 };
    [StatType.HealthPercent]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.Armour]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.Deflection]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.Dodge]: Stat = { base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0 };
    [StatType.StatusResistance]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.Thorns]: Stat = { base: 0, attribute: 0, bonus: 0 };
    // Block
    [StatType.BlockChance]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.BlockPower]: Stat = { base: 0, attribute: 0, bonus: 0 };

    // Accuracy
    [StatType.Accuracy]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.OffHandAccuracy]: Stat = { base: Stats.OFF_HAND_ACCURACY_PENALTY, attribute: 0, bonus: 0 };
    [StatType.MeleeAccuracy]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.RangedAccuracy]: Stat = { base: 0, attribute: 0, bonus: 0 };

    // Damage
    [StatType.Damage]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.DamagePercent]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.OffHandDamage]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.MeleeWeaponDamage]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.MeleeWeaponDamagePercent]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.RangedWeaponDamage]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.RangedWeaponDamagePercent]: Stat = { base: 0, attribute: 0, bonus: 0 };

    // Critical
    [StatType.CriticalChance]: Stat = { base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0 };
    [StatType.CriticalDamage]: Stat = { base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0 };

    // Defense Reduction
    [StatType.ArmourPenetration]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.DodgeReduction]: Stat = { base: 0, attribute: 0, bonus: 0 };

    // Spell
    [StatType.SpellAccuracy]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.SpellPower]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.SpellPowerPercent]: Stat = { base: 0, attribute: 0, bonus: 0 };

    // Mana
    [StatType.ManaCost]: Stat = { base: Stats.DEFAULT_MANA_COST, attribute: 0, bonus: 0 };
    [StatType.StartingMana]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.ManaRegen]: Stat = { base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0 };
    [StatType.ManaOnHit]: Stat = { base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0 };

    // Initiative
    [StatType.Initiative]: Stat = { base: 0, attribute: 0, bonus: 0 };

    // Potion
    [StatType.PotionCharges]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.PotionHealing]: Stat = { base: 0, attribute: 0, bonus: 0 };
    [StatType.PotionEffectiveness]: Stat = { base: 0, attribute: 0, bonus: 0 };

    constructor({ template, attributes, equipment, level }: { template: StatTemplate, attributes: Attributes, equipment: Equipment, level: number; }) {

        this[StatType.MaxHealth].base = Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * (level - 1);

        // Set stats to template (sets MaxHealth if included in template)
        for (const [stat, { base, perLvl }] of Object.entries(template)) {
            this[stat as StatType].base = base + (perLvl ? perLvl * (level - 1) : 0);
        }

        // Add stats from attributes
        this.setStatsAttribute(attributes);

        // Add off-hand penalties
        if (equipment.offHandWeapon) {
            this[StatType.Accuracy].bonus += Stats.DUAL_WIELD_ACCURACY_PENALTY;
            this[StatType.OffHandAccuracy].bonus += Stats.OFF_HAND_ACCURACY_PENALTY;
        }

        this.armourType = equipment.armour?.type ?? ArmourType.Unarmoured;
        this.weaponStyle = getWeaponStyle({
            mainHand: equipment.mainHand,
            offHand: equipment.offHandWeapon
        });

        // Add stats from equipment
        if (equipment.armour) this.addItemStats(equipment.armour.stats);
        if (equipment.belt) this.addItemStats(equipment.belt.stats);

        if (equipment.hands && ((equipment.hands.weaponStyle && equipment.hands.weaponStyle === this.weaponStyle) || !equipment.hands.weaponStyle)) {
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

    setStatsAttribute(attributes: Attributes): void {
        // Set attribute scaling stats to 0
        for (const stats of Object.values(AttributeStatScaling)) {
            for (const stat of Object.keys(stats)) {
                this[stat as StatType].attribute = 0;
            }
        }

        // Calculate attribute scaling stats
        for (const [type, { base, bonus }] of Object.entries(attributes)) {
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

    addStatusEffectStats(stats?: { [type in StatType]?: number }) {
        if (!stats) return;
        for (const [type, val] of Object.entries(stats)) {
            this[type as StatType].bonus += val;
        }
    }

    removeStatusEffectStats(stats?: { [type in StatType]?: number }) {
        if (!stats) return;
        for (const [type, val] of Object.entries(stats)) {
            this[type as StatType].bonus -= val;
        }
    }

    getTwoHandedMultiplier(): number {
        return 1 + (this.weaponStyle === WeaponStyle.TwoHanded ? Stats.TWO_HANDED_BONUS : 0);
    }

    getStat(type: StatType): number {
        const stat = this[type];
        return stat.base + stat.attribute + stat.bonus;
    }

    // Defensive
    // Max Health cannot be reduced below 10% of its base from Health %
    get maxHealth() {
        return Math.max(
            this.getStat(StatType.MaxHealth) * (1 + this.getStat(StatType.HealthPercent)),
            this.getStat(StatType.MaxHealth) * 0.1
        );
    }
    get dodge() {
        return this.getStat(StatType.Dodge) * ArmourTypeDodgeMultiplier[this.armourType];
    }

    // Accuracy
    get accuracy() {
        return this.getStat(StatType.Accuracy);
    }

    // Crit
    get critChance() {
        return this.getStat(StatType.CriticalChance);
    }
    get critDamage() {
        return this.getStat(StatType.CriticalDamage);
    }

    // Damage
    get damage() {
        const damage = this.getStat(StatType.Damage);
        if (damage < 0) return damage;
        return damage * this.getTwoHandedMultiplier();

    }
    get meleeWeaponDamage() {
        const meleeWeaponDamage = this.getStat(StatType.MeleeWeaponDamage);
        if (meleeWeaponDamage < 0) return meleeWeaponDamage;
        return meleeWeaponDamage * this.getTwoHandedMultiplier();
    }
    get rangedWeaponDamage() {
        const rangedDamage = this.getStat(StatType.RangedWeaponDamage);
        if (rangedDamage < 0) return rangedDamage;
        return rangedDamage * this.getTwoHandedMultiplier();
    }

    get armourPenetration() {
        return this.getStat(StatType.ArmourPenetration);
    }

    // Spell power 
    get spellPower() {
        const spellPower = this.getStat(StatType.SpellPower);
        const spellPowerPercent = this.getStat(StatType.SpellPowerPercent);
        // Swap signs of spellPowerPercent when spellPower is negative
        const spellPowerMult = 1 + Math.max(spellPowerPercent * (spellPower >= 0 ? 1 : -1), -1.00);
        return Math.round(spellPower * spellPowerMult);
    }

    // Mana
    get manaOnHit() {
        const manaOnHit = this.getStat(StatType.ManaOnHit);
        if (manaOnHit < 0) return manaOnHit;
        return manaOnHit * this.getTwoHandedMultiplier();
    }
}

export default Stats;