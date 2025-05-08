import AttackType from '../../../types/AttackType';
import AttributeType from '../../../Character/Attributes/AttributeType';
import StatType from '../../../Character/Stats/StatType';
import DamageType from '../../../types/DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type WandId = 'wand0' | 'wand1' | 'wand2' | 'wand3' | 'wand4' | 'wand5';

const wands: { [id in WandId]: Weapon } = {
    wand0: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand',
        tier: 0,
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 0 },
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
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 1 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 1
        },
        stats: {
            [StatType.SpellPower]: 5
        }
    },
    wand2: {
        id: 'wand2',
        itemType: ItemType.Weapon,
        name: 'Wand +2',
        tier: 2,
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 2 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 2
        },
        stats: {
            [StatType.SpellPower]: 5
        }
    },
    wand3: {
        id: 'wand3',
        itemType: ItemType.Weapon,
        name: 'Wand +3',
        tier: 3,
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 3 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 3
        },
        stats: {
            [StatType.SpellPower]: 5
        }
    },
    wand4: {
        id: 'wand4',
        itemType: ItemType.Weapon,
        name: 'Wand +4',
        tier: 4,
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 4 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 4
        },
        stats: {
            [StatType.SpellPower]: 5
        }
    },
    wand5: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand +5',
        tier: 5,
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 5 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 5
        },
        stats: {
            [StatType.SpellPower]: 5
        }
    },
} as const;

export { WandId, wands };