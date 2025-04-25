import AttackType from '../../../AttackType';
import StatType from '../../../Character/Stats/StatType';
import DamageType from '../../../DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type BowId = 'longbow0' | 'shortbow0';

const bows: { [id in BowId]: Weapon } = {
    shortbow0: {
        id: 'shortbow0',
        itemType: ItemType.Weapon,
        name: 'Shortbow',
        tier: 0,
        img: '',

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 0 },
        stats: {
            [StatType.RangedAccuracy]: 5
        }
    },
    longbow0: {
        id: 'longbow0',
        itemType: ItemType.Weapon,
        name: 'Longbow',
        tier: 0,
        img: '',

        type: WeaponType.Bow,
        attackType: AttackType.RangedWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 5
        }
    },
} as const;

export { BowId, bows };