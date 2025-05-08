import AttackType from '../../../types/AttackType';
import AttributeType from '../../../Character/Attributes/AttributeType';
import StatType from '../../../Character/Stats/StatType';
import DamageType from '../../../types/DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type QuarterstaffId = 'quarterstaff0' | 'quarterstaff1' | 'quarterstaff2' | 'quarterstaff3' | 'quarterstaff4' | 'quarterstaff5';

const quarterstaffs: { [id in QuarterstaffId]: Weapon } = {
    quarterstaff0: {
        id: 'quarterstaff0',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff',
        tier: 0,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 0 },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff1: {
        id: 'quarterstaff1',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +1',
        tier: 1,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 2 },
        attributes: {
            [AttributeType.Wisdom]: 1
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff2: {
        id: 'quarterstaff2',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +2',
        tier: 2,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 4 },
        attributes: {
            [AttributeType.Wisdom]: 2
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff3: {
        id: 'quarterstaff3',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +3',
        tier: 3,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 6 },
        attributes: {
            [AttributeType.Wisdom]: 3
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff4: {
        id: 'quarterstaff4',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +4',
        tier: 4,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 8 },
        attributes: {
            [AttributeType.Wisdom]: 4
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff5: {
        id: 'quarterstaff5',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +5',
        tier: 5,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 10 },
        attributes: {
            [AttributeType.Wisdom]: 5
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
} as const;

export { QuarterstaffId, quarterstaffs };