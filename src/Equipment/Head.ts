import StatType from '../Character/Stats/StatType';
import { type Item, type ItemAttributes, type ItemStats, ItemType } from './Item';

interface Head extends Item {
    id: HeadId;
    itemType: ItemType.Head;
    armourClass?: number;
    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type HeadId =
    'helmet0' | 'helmet1' | 'helmet2' |
    'clothHood0' | 'clothHood1' | 'clothHood2'
    ;

const heads: { [id in HeadId]: Head } = {
    helmet0: {
        id: 'helmet0',
        itemType: ItemType.Head,
        name: 'Leather Helmet',
        tier: 0,

        stats: {
            [StatType.Armour]: 3
        }
    },
    helmet1: {
        id: 'helmet1',
        itemType: ItemType.Head,
        name: 'Mail Coif',
        tier: 3,

        stats: {
            [StatType.Armour]: 6
        }
    },
    helmet2: {
        id: 'helmet2',
        itemType: ItemType.Head,
        name: 'Plate Helmet',
        tier: 5,

        stats: {
            [StatType.Armour]: 10
        }
    },
    clothHood0: {
        id: 'clothHood0',
        itemType: ItemType.Head,
        name: 'Cloth Hood',
        tier: 0,

        stats: {
            [StatType.ManaCost]: -5
        }
    },
    clothHood1: {
        id: 'clothHood1',
        itemType: ItemType.Head,
        name: 'Cloth Hood +1',
        tier: 3,

        stats: {
            [StatType.ManaCost]: -10
        }
    },
    clothHood2: {
        id: 'clothHood2',
        itemType: ItemType.Head,
        name: 'Cloth Hood +2',
        tier: 5,

        stats: {
            [StatType.ManaCost]: -15
        }
    }
} as const;

export { Head, HeadId, heads };