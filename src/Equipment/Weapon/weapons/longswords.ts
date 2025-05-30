import StatType from '../../../Character/Stats/StatType';
import AttackType from '../../../types/AttackType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type LongswordId = 'longsword0' | 'longsword1' | 'longsword2' | 'longsword3' | 'longsword4' | 'longsword5';

const longswords: { [id in LongswordId]: Weapon } = {
    longsword0: {
        id: 'longsword0',
        itemType: ItemType.Weapon,
        name: 'Longsword',
        tier: 0,

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 0 },
        stats: {
            [StatType.Accuracy]: 5
        }
    },
    longsword1: {
        id: 'longsword1',
        itemType: ItemType.Weapon,
        name: 'Longsword +1',
        tier: 1,

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 1 },
        stats: {
            [StatType.Accuracy]: 7
        }
    },
    longsword2: {
        id: 'longsword2',
        itemType: ItemType.Weapon,
        name: 'Longsword +2',
        tier: 2,

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 2 },
        stats: {
            [StatType.Accuracy]: 9
        }
    },
    longsword3: {
        id: 'longsword3',
        itemType: ItemType.Weapon,
        name: 'Longsword +3',
        tier: 3,

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 3 },
        stats: {
            [StatType.Accuracy]: 11
        }
    },
    longsword4: {
        id: 'longsword4',
        itemType: ItemType.Weapon,
        name: 'Longsword +4',
        tier: 4,

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 4 },
        stats: {
            [StatType.Accuracy]: 13
        }
    },
    longsword5: {
        id: 'longsword5',
        itemType: ItemType.Weapon,
        name: 'Longsword +5',
        tier: 5,

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 3, max: 6, bonus: 5 },
        stats: {
            [StatType.Accuracy]: 15
        }
    },
} as const;

export { LongswordId, longswords };