import StatType from '../Stats/StatType';
import AttributeType from './AttributeType';

const AttributeStatScaling: {
    [AttributeType.Strength]: {
        [StatType.DamagePercent]: number,
        [StatType.BlockPower]: number;
    },
    [AttributeType.Dexterity]: {
        [StatType.CriticalChance]: number,
        [StatType.Dodge]: number,
        [StatType.Initiative]: number;
    },
    [AttributeType.Perception]: {
        [StatType.Accuracy]: number;
    },
    [AttributeType.Constitution]: {
        [StatType.MaxHealth]: number,
        [StatType.HealthPercent]: number,
        [StatType.StatusResistance]: number;
    },
    [AttributeType.Intelligence]: {
        [StatType.SpellPower]: number,
        [StatType.ManaOnHit]: number;
    },
    [AttributeType.Wisdom]: {
        [StatType.ManaRegen]: number,
        [StatType.StartingMana]: number,
        [StatType.Initiative]: number,
        [StatType.StatusResistance]: number;
    },
} = {
    [AttributeType.Strength]: {
        [StatType.DamagePercent]: 0.01,
        [StatType.BlockPower]: 0.2,
    },
    [AttributeType.Dexterity]: {
        [StatType.CriticalChance]: 0.5,
        [StatType.Dodge]: 0.5,
        [StatType.Initiative]: 0.2
    },
    [AttributeType.Perception]: {
        [StatType.Accuracy]: 1
    },
    [AttributeType.Constitution]: {
        [StatType.MaxHealth]: 1,
        [StatType.HealthPercent]: 0.02,
        [StatType.StatusResistance]: 0.2
    },
    [AttributeType.Intelligence]: {
        [StatType.SpellPower]: 2,
        [StatType.ManaOnHit]: 0.1
    },
    [AttributeType.Wisdom]: {
        [StatType.ManaRegen]: 0.2,
        [StatType.StartingMana]: 5,
        [StatType.Initiative]: 0.4,
        [StatType.StatusResistance]: 0.2
    },
} as const;

export default AttributeStatScaling;