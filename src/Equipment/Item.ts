import type AttributeType from '../Character/Attributes/AttributeType';
import type StatType from '../Character/Stats/StatType';
import { type ArmourId } from './Armour';
import { type HandsId } from './Hands';
import { type HeadId } from './Head';
import { type NeckId } from './Neck';
import { type PotionId } from './Potion';
import { type RingId } from './Ring';
import { type ShieldId } from './Shield';
import { type WaistId } from './Waist';
import { type WeaponId } from './Weapon/Weapon';

enum ItemType {
    Weapon = 'Weapon',
    Shield = 'Shield',
    Head = 'Head',
    Armour = 'Armour',
    Hands = 'Hands',
    Waist = 'Waist',
    Ring = 'Ring',
    Potion = 'Potion',
    Neck = 'Neck'
}

type Tier = 0 | 1 | 2 | 3 | 4 | 5;

type ItemId = WeaponId | ArmourId | HandsId | HeadId | NeckId | PotionId | RingId | ShieldId | WaistId;

interface Item {
    id: ItemId;
    itemType: ItemType;
    name: string;
    tier: Tier;
}

type ItemAttributes = { [type in AttributeType]?: number };
type ItemStats = { [type in StatType]?: number };

export { Item, ItemType };
export type { Tier, ItemId, ItemAttributes, ItemStats };