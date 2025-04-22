import AttackType from '../../../AttackType';
import StatType from '../../../Character/Stats/StatType';
import DamageType from '../../../DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type MaceId = 'mace0';

const maces: { [id in MaceId]: Weapon } = {
    mace0: {
        id: 'mace0',
        itemType: ItemType.Weapon,
        name: 'Mace',
        tier: 0,
        img: 'weapon-mace.png',

        type: WeaponType.Mace,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 10
        }
    },
} as const;

export { MaceId, maces };