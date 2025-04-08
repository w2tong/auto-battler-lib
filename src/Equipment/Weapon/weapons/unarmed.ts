import AttackType from '../../../AttackType';
import DamageType from '../../../DamageType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type UnarmedId = 'unarmed0';

const unarmed: { [id in UnarmedId]: Weapon } = {
    unarmed0: {
        id: 'unarmed0',
        itemType: ItemType.Weapon,
        name: 'Unarmed',
        tier: 0,
        img: '',

        type: WeaponType.Unarmed,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 4, bonus: 0 },
    },
} as const;

export { UnarmedId, unarmed };