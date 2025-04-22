import AttackType from '../../../AttackType';
import DamageType from '../../../DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type LongswordId = 'longsword0' | 'longsword1' | 'longsword2' | 'longsword3' | 'longsword4' | 'longsword5';

const longswords: { [id in LongswordId]: Weapon } = {
    longsword0: {
        id: 'longsword0',
        itemType: ItemType.Weapon,
        name: 'Longsword',
        tier: 0,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 0 },
    },
    longsword1: {
        id: 'longsword1',
        itemType: ItemType.Weapon,
        name: 'Longsword +1',
        tier: 1,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 1 },
    },
    longsword2: {
        id: 'longsword2',
        itemType: ItemType.Weapon,
        name: 'Longsword +2',
        tier: 2,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 2 },
    },
    longsword3: {
        id: 'longsword3',
        itemType: ItemType.Weapon,
        name: 'Longsword +3',
        tier: 3,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 3 },
    },
    longsword4: {
        id: 'longsword4',
        itemType: ItemType.Weapon,
        name: 'Longsword +4',
        tier: 4,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 4 },
    },
    longsword5: {
        id: 'longsword5',
        itemType: ItemType.Weapon,
        name: 'Longsword +5',
        tier: 5,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 5 },
    },
} as const;

export { LongswordId, longswords };