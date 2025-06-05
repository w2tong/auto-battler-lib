import AttackType from '../../../types/AttackType';
import StatType from '../../../Character/Stats/StatType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type BowId = 'longbow0' | 'longbow1' | 'longbow2' | 'longbow3' | 'longbow4' | 'longbow5';

const bows: { [id in BowId]: Weapon } = {
    longbow0: {
        id: 'longbow0',
        itemType: ItemType.Weapon,
        name: 'Longbow',
        tier: 0,

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 5, max: 9, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 10
        }
    },
    longbow1: {
        id: 'longbow1',
        itemType: ItemType.Weapon,
        name: 'Longbow +1',
        tier: 1,

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 5, max: 9, bonus: 2 },
        stats: {
            [StatType.ArmourPenetration]: 12
        }
    },
    longbow2: {
        id: 'longbow2',
        itemType: ItemType.Weapon,
        name: 'Longbow +2',
        tier: 2,

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 5, max: 9, bonus: 4 },
        stats: {
            [StatType.ArmourPenetration]: 14
        }
    },
    longbow3: {
        id: 'longbow3',
        itemType: ItemType.Weapon,
        name: 'Longbow +3',
        tier: 3,

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 5, max: 9, bonus: 6 },
        stats: {
            [StatType.ArmourPenetration]: 16
        }
    },
    longbow4: {
        id: 'longbow4',
        itemType: ItemType.Weapon,
        name: 'Longbow +4',
        tier: 4,

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 5, max: 9, bonus: 8 },
        stats: {
            [StatType.ArmourPenetration]: 18
        }
    },
    longbow5: {
        id: 'longbow5',
        itemType: ItemType.Weapon,
        name: 'Longbow +5',
        tier: 5,

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageRange: { min: 5, max: 9, bonus: 10 },
        stats: {
            [StatType.ArmourPenetration]: 20
        }
    },
} as const;

export { BowId, bows };