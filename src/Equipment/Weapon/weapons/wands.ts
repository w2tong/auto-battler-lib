import AttackType from '../../../types/AttackType';
import AttributeType from '../../../Character/Attributes/AttributeType';
import StatType from '../../../Character/Stats/StatType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type WandId = 'wand0' | 'wand1' | 'wand2' | 'wand3' | 'wand4' | 'wand5';

const wands: { [id in WandId]: Weapon } = {
    wand0: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand',
        tier: 0,

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 2, max: 4, bonus: 0 },
        spellPowerRatio: 0.1,
        stats: {
            [StatType.SpellPower]: 5
        }
    },
    wand1: {
        id: 'wand1',
        itemType: ItemType.Weapon,
        name: 'Wand +1',
        tier: 1,

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 2, max: 4, bonus: 1 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 1
        },
        stats: {
            [StatType.SpellPower]: 10
        }
    },
    wand2: {
        id: 'wand2',
        itemType: ItemType.Weapon,
        name: 'Wand +2',
        tier: 2,

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 2, max: 4, bonus: 2 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 2
        },
        stats: {
            [StatType.SpellPower]: 15
        }
    },
    wand3: {
        id: 'wand3',
        itemType: ItemType.Weapon,
        name: 'Wand +3',
        tier: 3,

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 2, max: 4, bonus: 3 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 3
        },
        stats: {
            [StatType.SpellPower]: 20
        }
    },
    wand4: {
        id: 'wand4',
        itemType: ItemType.Weapon,
        name: 'Wand +4',
        tier: 4,

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 2, max: 4, bonus: 4 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 4
        },
        stats: {
            [StatType.SpellPower]: 25
        }
    },
    wand5: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand +5',
        tier: 5,

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 2, max: 4, bonus: 5 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 5
        },
        stats: {
            [StatType.SpellPower]: 30
        }
    },
} as const;

export { WandId, wands };