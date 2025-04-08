import AttackType from '../../../AttackType';
import StatType from '../../../Character/Stats/StatType';
import DamageType from '../../../DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type DaggerId = 'dagger0' | 'dagger1' | 'dagger2' | 'dagger3' | 'dagger4' | 'dagger5';

const daggers: { [id in DaggerId]: Weapon } = {
    dagger0: {
        id: 'dagger0',
        itemType: ItemType.Weapon,
        name: 'Dagger',
        tier: 0,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 0 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger1: {
        id: 'dagger1',
        itemType: ItemType.Weapon,
        name: 'Dagger +1',
        tier: 1,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 1 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger2: {
        id: 'dagger2',
        itemType: ItemType.Weapon,
        name: 'Dagger +2',
        tier: 2,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 2 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger3: {
        id: 'dagger3',
        itemType: ItemType.Weapon,
        name: 'Dagger +3',
        tier: 3,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 3 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger4: {
        id: 'dagger4',
        itemType: ItemType.Weapon,
        name: 'Dagger +4',
        tier: 4,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 4 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger5: {
        id: 'dagger5',
        itemType: ItemType.Weapon,
        name: 'Dagger +5',
        tier: 5,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 5 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
} as const;

export { DaggerId, daggers };