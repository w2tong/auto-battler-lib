import { type Weapon } from './Weapon';
import { type LongswordId, longswords } from './weapons/longswords';
import { type GreatswordId, greatswords } from './weapons/greatswords';
import { type DaggerId, daggers } from './weapons/daggers';
import { type QuarterstaffId, quarterstaffs } from './weapons/quarterstaffs';
import { type WandId, wands } from './weapons/wands';
import { type UnarmedId, unarmed } from './weapons/unarmed';
import { type BiteId, bites, } from './weapons/bites';
import { type MaceId, maces } from './weapons/maces';
import { type BowId, bows } from './weapons/bows';

type WeaponId = UnarmedId | LongswordId | GreatswordId | DaggerId | QuarterstaffId | WandId | BiteId | MaceId | BowId;

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