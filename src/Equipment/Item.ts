import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import { ArmourId } from './Armour';
import { HandsId } from './Hands';
import { HeadId } from './Head';
import { NeckId } from './Neck';
import { PotionId } from './Potion';
import { RingId } from './Ring';
import { ShieldId } from './Shield';
import { WaistId } from './Waist';
import { WeaponId } from './Weapon/Weapon';

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