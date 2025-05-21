import { Item, ItemType } from './Item';

interface Neck extends Item {
    itemType: ItemType.Neck;
}

type NeckId =
    'neck'
    ;

const necks: { [id in NeckId]: Neck } = {
    neck: {
        id: 'neck',
        itemType: ItemType.Neck,
        name: 'Neck',
        tier: 0,
        img: ''
    }
} as const;

function getNeckTooltip(neck: Neck) {
    return neck.name;
}

function getNeckDescription(neck: Neck) {
    return neck.name;
}

export { Neck, NeckId, necks, getNeckTooltip, getNeckDescription };