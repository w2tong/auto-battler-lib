enum ItemType {
    Weapon = 'Weapon',
    Shield = 'Shield',
    Head = 'Head',
    Amulet = 'Amulet',
    Armour = 'Armour',
    Hands = 'Hands',
    Belt = 'Belt',
    Ring = 'Ring',
    Potion = 'Potion'
}

type Tier = 0|1|2|3|4|5;

interface Item {
    id: string;
    itemType: ItemType;
    name: string;
    tier: Tier;
}

export { Item, ItemType };
export type { Tier };