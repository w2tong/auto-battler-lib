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

interface Item {
    id: string;
    itemType: ItemType;
    name: string;
}

export { Item, ItemType };