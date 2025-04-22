import StatType from '../Stats/StatType';
import AttributeType from './AttributeType';

// TODO: test if these changed values are being calculated correctly
const AttributeStatScaling: { [key in AttributeType]: { [key in StatType]?: number } } = {
    [AttributeType.WeaponSkill]: {
        [StatType.Accuracy]: 1,
    },
    [AttributeType.Strength]: {
        [StatType.MeleeWeaponDamagePercent]: 0.01,
        [StatType.BlockPower]: 0.2,
        [StatType.MaxHealth]: 0.5
    },
    [AttributeType.Dexterity]: {
        [StatType.Dodge]: 1,
        [StatType.RangedWeaponDamagePercent]: 0.01,
        [StatType.MeleeWeaponDamagePercent]: 0.005,
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