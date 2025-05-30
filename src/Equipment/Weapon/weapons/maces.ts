import AttackType from '../../../types/AttackType';
import StatType from '../../../Character/Stats/StatType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type MaceId = 'mace0' | 'mace1' | 'mace2' | 'mace3' | 'mace4' | 'mace5';

const maces: { [id in MaceId]: Weapon } = {
    mace0: {
        id: 'mace0',
        itemType: ItemType.Weapon,
        name: 'Mace',
        tier: 0,

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 10
        }
    },
    mace1: {
        id: 'mace1',
        itemType: ItemType.Weapon,
        name: 'Mace +1',
        tier: 1,

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 1 },
        stats: {
            [StatType.ArmourPenetration]: 12
        }
    },
    mace2: {
        id: 'mace2',
        itemType: ItemType.Weapon,
        name: 'Mace +2',
        tier: 2,

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 2 },
        stats: {
            [StatType.ArmourPenetration]: 14
        }
    },
    mace3: {
        id: 'mace3',
        itemType: ItemType.Weapon,
        name: 'Mace +3',
        tier: 3,

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 3 },
        stats: {
            [StatType.ArmourPenetration]: 16
        }
    },
    mace4: {
        id: 'mace4',
        itemType: ItemType.Weapon,
        name: 'Mace +4',
        tier: 4,

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 4 },
        stats: {
            [StatType.ArmourPenetration]: 18
        }
    },
    mace5: {
        id: 'mace5',
        itemType: ItemType.Weapon,
        name: 'Mace +5',
        tier: 5,

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 5 },
        stats: {
            [StatType.ArmourPenetration]: 20
        }
    },
} as const;

export { MaceId, maces };