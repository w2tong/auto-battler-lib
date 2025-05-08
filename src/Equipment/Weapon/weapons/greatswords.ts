import AttackType from '../../../types/AttackType';
import StatType from '../../../Character/Stats/StatType';
import DamageType from '../../../types/DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type GreatswordId = 'greatsword0' | 'greatsword1' | 'greatsword2' | 'greatsword3' | 'greatsword4' | 'greatsword5';

const greatswords: { [id in GreatswordId]: Weapon } = {
    greatsword0: {
        id: 'greatsword0',
        itemType: ItemType.Weapon,
        name: 'Greatsword',
        tier: 0,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 15
        }
    },
    greatsword1: {
        id: 'greatsword1',
        itemType: ItemType.Weapon,
        name: 'Greatsword +1',
        tier: 1,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 1 },
        stats: {
            [StatType.ArmourPenetration]: 19
        }
    },
    greatsword2: {
        id: 'greatsword2',
        itemType: ItemType.Weapon,
        name: 'Greatsword +2',
        tier: 2,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 2 },
        stats: {
            [StatType.ArmourPenetration]: 23
        }
    },
    greatsword3: {
        id: 'greatsword3',
        itemType: ItemType.Weapon,
        name: 'Greatsword +3',
        tier: 3,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 3 },
        stats: {
            [StatType.ArmourPenetration]: 27
        }
    },
    greatsword4: {
        id: 'greatsword4',
        itemType: ItemType.Weapon,
        name: 'Greatsword +4',
        tier: 4,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 4 },
        stats: {
            [StatType.ArmourPenetration]: 31
        }
    },
    greatsword5: {
        id: 'greatsword5',
        itemType: ItemType.Weapon,
        name: 'Greatsword +5',
        tier: 5,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 9, bonus: 5 },
        stats: {
            [StatType.ArmourPenetration]: 35
        }
    },
} as const;

export { GreatswordId, greatswords };