import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';

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

interface Item {
    id: string;
    itemType: ItemType;
    name: string;
    tier: Tier;
    img: string;
}

type ItemAttributes = { [type in AttributeType]?: number };
type ItemStats = { [type in StatType]?: number };

export { Item, ItemType };
export type { Tier, ItemAttributes, ItemStats };