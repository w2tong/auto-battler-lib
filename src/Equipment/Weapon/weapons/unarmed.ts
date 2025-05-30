import AttackType from '../../../types/AttackType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type UnarmedId = 'fist';

const unarmed: { [id in UnarmedId]: Weapon } = {
    fist: {
        id: 'fist',
        itemType: ItemType.Weapon,
        name: 'Fist',
        tier: 0,

        type: WeaponType.Unarmed,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 2, max: 4, bonus: 0 },
    },
} as const;

export { UnarmedId, unarmed };