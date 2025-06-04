import type { Weapon, WeaponId } from './Weapon';
import { longswords } from './weapons/longswords';
import { greatswords } from './weapons/greatswords';
import { daggers } from './weapons/daggers';
import { quarterstaffs } from './weapons/quarterstaffs';
import { wands } from './weapons/wands';
import { unarmed } from './weapons/unarmed';
import { bites, } from './weapons/bites';
import { maces } from './weapons/maces';
import { bows } from './weapons/bows';

const weapons: { [id in WeaponId]: Weapon } = {
    ...unarmed,
    ...longswords,
    ...greatswords,
    ...daggers,
    ...quarterstaffs,
    ...wands,
    ...maces,
    ...bites,
    ...bows
} as const;

export { WeaponId, weapons };