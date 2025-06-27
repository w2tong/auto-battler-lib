import AttributeType from '../Character/Attributes/AttributeType';
import { type Item, type ItemAttributes, type ItemStats, ItemType } from './Item';

interface Neck extends Item {
    id: NeckId;
    itemType: ItemType.Neck;
    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type NeckId =
    'strNeck0' | 'strNeck1' | 'strNeck2' |
    'dexNeck0' | 'dexNeck1' | 'dexNeck2' |
    'perNeck0' | 'perNeck1' | 'perNeck2' |
    'conNeck0' | 'conNeck1' | 'conNeck2' |
    'intNeck0' | 'intNeck1' | 'intNeck2' |
    'wisNeck0' | 'wisNeck1' | 'wisNeck2';

const necks: { [id in NeckId]: Neck } = {
    // Strength Necklaces
    strNeck0: {
        id: 'strNeck0',
        itemType: ItemType.Neck,
        name: 'Necklace of Lesser Strength',
        tier: 1,

        attributes: {
            [AttributeType.Strength]: 5
        }
    },
    strNeck1: {
        id: 'strNeck1',
        itemType: ItemType.Neck,
        name: 'Necklace of Strength',
        tier: 3,

        attributes: {
            [AttributeType.Strength]: 10
        }
    },
    strNeck2: {
        id: 'strNeck2',
        itemType: ItemType.Neck,
        name: 'Necklace of Greater Strength',
        tier: 5,

        attributes: {
            [AttributeType.Strength]: 15
        }
    },

    dexNeck0: {
        id: 'dexNeck0',
        itemType: ItemType.Neck,
        name: 'Necklace of Lesser Dexterity',
        tier: 1,

        attributes: {
            [AttributeType.Dexterity]: 5
        }
    },
    dexNeck1: {
        id: 'dexNeck1',
        itemType: ItemType.Neck,
        name: 'Necklace of Dexterity',
        tier: 3,

        attributes: {
            [AttributeType.Dexterity]: 10
        }
    },
    dexNeck2: {
        id: 'dexNeck2',
        itemType: ItemType.Neck,
        name: 'Necklace of Greater Dexterity',
        tier: 5,

        attributes: {
            [AttributeType.Dexterity]: 15
        }
    },


    perNeck0: {
        id: 'perNeck0',
        itemType: ItemType.Neck,
        name: 'Necklace of Lesser Perception',
        tier: 1,

        attributes: {
            [AttributeType.Perception]: 5
        }
    },
    perNeck1: {
        id: 'perNeck1',
        itemType: ItemType.Neck,
        name: 'Necklace of Perception',
        tier: 3,

        attributes: {
            [AttributeType.Perception]: 10
        }
    },
    perNeck2: {
        id: 'perNeck2',
        itemType: ItemType.Neck,
        name: 'Necklace of Greater Perception',
        tier: 5,

        attributes: {
            [AttributeType.Perception]: 15
        }
    },

    conNeck0: {
        id: 'conNeck0',
        itemType: ItemType.Neck,
        name: 'Necklace of Lesser Constitution',
        tier: 1,

        attributes: {
            [AttributeType.Constitution]: 5
        }
    },
    conNeck1: {
        id: 'conNeck1',
        itemType: ItemType.Neck,
        name: 'Necklace of Constitution',
        tier: 3,

        attributes: {
            [AttributeType.Constitution]: 10
        }
    },
    conNeck2: {
        id: 'conNeck2',
        itemType: ItemType.Neck,
        name: 'Necklace of Greater Constitution',
        tier: 5,

        attributes: {
            [AttributeType.Constitution]: 15
        }
    },

    intNeck0: {
        id: 'intNeck0',
        itemType: ItemType.Neck,
        name: 'Lesser Necklace of Intelligence',
        tier: 1,

        attributes: {
            [AttributeType.Intelligence]: 5
        }
    },
    intNeck1: {
        id: 'intNeck1',
        itemType: ItemType.Neck,
        name: 'Necklace of Intelligence',
        tier: 3,

        attributes: {
            [AttributeType.Intelligence]: 10
        }
    },
    intNeck2: {
        id: 'intNeck2',
        itemType: ItemType.Neck,
        name: 'Greater Necklace of Intelligence',
        tier: 5,

        attributes: {
            [AttributeType.Intelligence]: 15
        }
    },
    wisNeck0: {
        id: 'wisNeck0',
        itemType: ItemType.Neck,
        name: 'Lesser Necklace of Wisdom',
        tier: 1,

        attributes: {
            [AttributeType.Wisdom]: 5
        }
    },
    wisNeck1: {
        id: 'wisNeck1',
        itemType: ItemType.Neck,
        name: 'Necklace of Wisdom',
        tier: 3,

        attributes: {
            [AttributeType.Wisdom]: 10
        }
    },
    wisNeck2: {
        id: 'wisNeck2',
        itemType: ItemType.Neck,
        name: 'Greater Necklace of Wisdom',
        tier: 5,

        attributes: {
            [AttributeType.Wisdom]: 15
        }
    }
} as const;

export { Neck, NeckId, necks };