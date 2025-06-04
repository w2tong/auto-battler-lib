import { Item, ItemType } from './Item';

interface Neck extends Item {
    id: NeckId;
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
    }
} as const;

export { Neck, NeckId, necks };