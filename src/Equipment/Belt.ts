import { StatType } from '../Character/Stats/Stats';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Belt extends Item {
    itemType: ItemType.Belt;
    attributes?: ItemAttributes;
    stats: ItemStats;
}

type BeltId = 
'chargesBelt0' | 'chargesBelt1'
| 'effBelt0' | 'effBelt1' | 'effBelt2' | 'effBelt3'
| 'healBelt0' | 'healBelt1' | 'healBelt2' | 'healBelt3'
;

const belts: {[id in BeltId]: Belt} = {
    chargesBelt0: {
        id: 'chargesBelt0',
        itemType: ItemType.Belt,
        name: 'Belt of Charges',
        tier: 4,
        img: 'belt-multi.png',

        stats: {
            [StatType.PotionCharges]: 1
        }
    },
    chargesBelt1: {
        id: 'belt',
        itemType: ItemType.Belt,
        name: 'Belt of Greater Charges',
        tier: 5,
        img: 'belt-multi.png',

        stats: {
            [StatType.PotionCharges]: 2
        }
    },
    effBelt0: {
        id: 'effBelt0',
        itemType: ItemType.Belt,
        name: 'Belt of Effectiveness',
        tier: 2,
        img: 'belt-red-pot.png',

        stats: {
            [StatType.PotionEffectiveness]: 0.25
        }
    },
    effBelt1: {
        id: 'effBelt1',
        itemType: ItemType.Belt,
        name: 'Belt of Greater Effectiveness',
        tier: 3,
        img: 'belt-red-pot.png',
        
        stats: {
            [StatType.PotionEffectiveness]: 0.50
        }
    },
    effBelt2: {
        id: 'effBelt2',
        itemType: ItemType.Belt,
        name: 'Belt of Superior Effectiveness',
        tier: 4,
        img: 'belt-red-pot.png',
        
        stats: {
            [StatType.PotionEffectiveness]: 0.75
        }
    },
    effBelt3: {
        id: 'effBelt3',
        itemType: ItemType.Belt,
        name: 'Belt of Supreme Effectiveness',
        tier: 5,
        img: 'belt-red-pot.png',
        
        stats: {
            [StatType.PotionEffectiveness]: 1.00
        }
    },
    healBelt0: {
        id: 'healBelt0',
        itemType: ItemType.Belt,
        name: 'Belt of Healing',
        tier: 2,
        img: 'belt-green-pot.png',
        
        stats: {
            [StatType.PotionHealing]: 5
        }
    },
    healBelt1: {
        id: 'healBelt1',
        itemType: ItemType.Belt,
        name: 'Belt of Greater Healing',
        tier: 3,
        img: 'belt-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 10
        }
    },
    healBelt2: {
        id: 'healBelt2',
        itemType: ItemType.Belt,
        name: 'Belt of Superior Healing',
        tier: 4,
        img: 'belt-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 20
        }
    },
    healBelt3: {
        id: 'healBelt3',
        itemType: ItemType.Belt,
        name: 'Belt of Supreme Healing',
        tier: 5,
        img: 'belt-green-pot.png',

        stats: {
            [StatType.PotionHealing]: 40
        }
    },

} as const;

export { Belt, BeltId, belts };