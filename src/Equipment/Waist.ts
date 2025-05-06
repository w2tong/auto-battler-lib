import StatType from '../Character/Stats/StatType';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Waist extends Item {
    itemType: ItemType.Waist;
    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type WaistId =
    'chargesBelt0' | 'chargesBelt1'
    | 'effBelt0' | 'effBelt1' | 'effBelt2' | 'effBelt3'
    | 'healBelt0' | 'healBelt1' | 'healBelt2' | 'healBelt3'
    ;

const waists: { [id in WaistId]: Waist } = {
    chargesBelt0: {
        id: 'chargesBelt0',
        itemType: ItemType.Waist,
        name: 'Waist of Charges',
        tier: 4,
        img: 'waist-multi.png',

        stats: {
            [StatType.PotionCharges]: 1
        }
    },
    chargesBelt1: {
        id: 'waist',
        itemType: ItemType.Waist,
        name: 'Waist of Greater Charges',
        tier: 5,
        img: 'waist-multi.png',

        stats: {
            [StatType.PotionCharges]: 2
        }
    },
    effBelt0: {
        id: 'effBelt0',
        itemType: ItemType.Waist,
        name: 'Waist of Effectiveness',
        tier: 2,
        img: 'waist-red-pot.png',

        stats: {
            [StatType.PotionEffectiveness]: 0.25
        }
    },
    effBelt1: {
        id: 'effBelt1',
        itemType: ItemType.Waist,
        name: 'Waist of Greater Effectiveness',
        tier: 3,
        img: 'waist-red-pot.png',

        stats: {
            [StatType.PotionEffectiveness]: 0.50
        }
    },
    effBelt2: {
        id: 'effBelt2',
        itemType: ItemType.Waist,
        name: 'Waist of Superior Effectiveness',
        tier: 4,
        img: 'waist-red-pot.png',

        stats: {
            [StatType.PotionEffectiveness]: 0.75
        }
    },
    effBelt3: {
        id: 'effBelt3',
        itemType: ItemType.Waist,
        name: 'Waist of Supreme Effectiveness',
        tier: 5,
        img: 'waist-red-pot.png',

        stats: {
            [StatType.PotionEffectiveness]: 1.00
        }
    },
    healBelt0: {
        id: 'healBelt0',
        itemType: ItemType.Waist,
        name: 'Waist of Healing',
        tier: 2,
        img: 'waist-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 5
        }
    },
    healBelt1: {
        id: 'healBelt1',
        itemType: ItemType.Waist,
        name: 'Waist of Greater Healing',
        tier: 3,
        img: 'waist-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 10
        }
    },
    healBelt2: {
        id: 'healBelt2',
        itemType: ItemType.Waist,
        name: 'Waist of Superior Healing',
        tier: 4,
        img: 'waist-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 20
        }
    },
    healBelt3: {
        id: 'healBelt3',
        itemType: ItemType.Waist,
        name: 'Waist of Supreme Healing',
        tier: 5,
        img: 'waist-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 40
        }
    },

} as const;

export { Waist, WaistId, waists };