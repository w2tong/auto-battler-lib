import { Item, ItemType } from './Item';

interface Amulet extends Item {
    itemType: ItemType.Amulet;
}

type AmuletId = 
'amulet'
;

const amulets: {[id in AmuletId]: Amulet} = {
    amulet: {
        id: 'amulet',
        itemType: ItemType.Amulet,
        name: 'Amulet',
        tier: 0,
        img: ''
    }
} as const;

function getAmuletTooltip(amulet: Amulet) {
    return amulet.name;
}

function getAmuletDescription(amulet: Amulet) {
    return amulet.name;
}

export { Amulet, AmuletId, amulets, getAmuletTooltip, getAmuletDescription };