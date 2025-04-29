import StatType from '../Stats/StatType';
import AttributeType from './AttributeType';

const AttributeStatScaling: {
    [AttributeType.WeaponSkill]: {
        [StatType.Accuracy]: number;
    },
    [AttributeType.Strength]: {
        [StatType.DamagePercent]: number,
        [StatType.BlockPower]: number,
        [StatType.MaxHealth]: number;
    },
    [AttributeType.Dexterity]: {
        [StatType.DamagePercent]: number,
        [StatType.Dodge]: number,
        [StatType.Initiative]: number;
    },
    [AttributeType.Perception]: {
        [StatType.DodgeReduction]: number,
        [StatType.CriticalDamage]: number,
        [StatType.ArmourPenetration]: number;
    },
    [AttributeType.Constitution]: {
        [StatType.HealthPercent]: number,
        [StatType.StatusResistance]: number,
        [StatType.Armour]: number;
    },
    [AttributeType.Intelligence]: {
        [StatType.SpellPower]: number,
        [StatType.Armour]: number,
        [StatType.ManaOnHit]: number;
    },
    [AttributeType.Wisdom]: {
        [StatType.ManaRegen]: number,
        [StatType.ManaOnHit]: number,
        [StatType.StartingMana]: number,
        [StatType.Initiative]: number,
        [StatType.StatusResistance]: number;
    },
} = {
    [AttributeType.WeaponSkill]: {
        [StatType.Accuracy]: 1,
    },
    [AttributeType.Strength]: {
        [StatType.DamagePercent]: 0.01,
        [StatType.BlockPower]: 0.2,
        [StatType.MaxHealth]: 0.5
    },
    [AttributeType.Dexterity]: {
        [StatType.DamagePercent]: 0.005,
        [StatType.Dodge]: 1,
        [StatType.Initiative]: 0.2
    },
    [AttributeType.Perception]: {
        [StatType.DodgeReduction]: 1,
        [StatType.CriticalDamage]: 0.005,
        [StatType.ArmourPenetration]: 0.5
    },
    [AttributeType.Constitution]: {
        [StatType.HealthPercent]: 0.01,
        [StatType.StatusResistance]: 0.2,
        [StatType.Armour]: 0.1
    },
    [AttributeType.Intelligence]: {
        [StatType.SpellPower]: 1,
        [StatType.Armour]: 0.2,
        [StatType.ManaOnHit]: 0.1
    },
    [AttributeType.Wisdom]: {
        [StatType.ManaRegen]: 0.5,
        [StatType.ManaOnHit]: 0.5,
        [StatType.StartingMana]: 2,
        [StatType.Initiative]: 0.2,
        [StatType.StatusResistance]: 0.2
    },
} as const;

export default AttributeStatScaling;