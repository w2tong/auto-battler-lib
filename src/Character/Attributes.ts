import { StatType } from './Stats';

interface Attribute {
    base: number;
    bonus: number;
}

enum AttributeType {
    WeaponSkill = 'WeaponSkill',
    Strength = 'Strength',
    Dexterity = 'Dexterity',
    Perception = 'Perception',
    Constitution = 'Constitution',
    Intelligence = 'Intelligence',
    Wisdom = 'Wisdom'
}

const AttributeStatScaling: {[key in AttributeType]: {[key in StatType]?: number}} = {
    [AttributeType.WeaponSkill]: {
        [StatType.HitChance]: 1,
    },
    [AttributeType.Strength]: {
        [StatType.MeleeDamage]: 0.5,
        [StatType.BlockPower]: 0.2,
        [StatType.MaxHealth]: 0.2
    },
    [AttributeType.Dexterity]: {
        [StatType.Dodge]: 1,
        [StatType.RangedDamage]: 0.5,
        [StatType.MeleeDamage]: 0.2,
        [StatType.Initiative]: 0.2
    },
    [AttributeType.Perception]: {
        [StatType.DodgeReduction]: 1,
        [StatType.CriticalDamage]: 0.2,
        [StatType.ArmourPenetration]: 0.2
    },
    [AttributeType.Constitution]: {
        [StatType.HealthPercent]: 1,
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
        [StatType.StartingMana]: 1
    },
};

type BaseAttributes = {
    [AttributeType.WeaponSkill]: number,
    [AttributeType.Strength]: number;
    [AttributeType.Dexterity]: number;
    [AttributeType.Perception]: number;
    [AttributeType.Constitution]: number;
    [AttributeType.Intelligence]: number;
    [AttributeType.Wisdom]: number;
}

class Attributes {
    [AttributeType.WeaponSkill]: Attribute;
    [AttributeType.Strength]: Attribute;
    [AttributeType.Dexterity]: Attribute;
    [AttributeType.Perception]: Attribute;
    [AttributeType.Constitution]: Attribute;
    [AttributeType.Intelligence]: Attribute;
    [AttributeType.Wisdom]: Attribute;

    constructor(
        {
            [AttributeType.WeaponSkill]: weaponSkill = 0,
            [AttributeType.Strength]: strength = 0,
            [AttributeType.Dexterity]: dexterity = 0,
            [AttributeType.Perception]: perception = 0,
            [AttributeType.Constitution]: constitution = 0,
            [AttributeType.Intelligence]: intelligence = 0,
            [AttributeType.Wisdom]: wisdom = 0,
        }: BaseAttributes
    ) {
        this[AttributeType.WeaponSkill] = { base: weaponSkill, bonus: 0 };
        this[AttributeType.Strength] = { base: strength, bonus: 0 };
        this[AttributeType.Dexterity] = { base: dexterity, bonus: 0 };
        this[AttributeType.Perception] = { base: perception, bonus: 0 };
        this[AttributeType.Constitution] = { base: constitution, bonus: 0 };
        this[AttributeType.Intelligence] = { base: intelligence, bonus: 0 };
        this[AttributeType.Wisdom] = { base: wisdom, bonus: 0 };
    }
}

export { Attribute, AttributeType, BaseAttributes, AttributeStatScaling, Attributes };