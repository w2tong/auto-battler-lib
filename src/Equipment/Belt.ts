import { Item, ItemType } from './Item';

interface Belt extends Item {
    itemType: ItemType.Belt;
    charges?: number;
    effectiveness?: number;
    healing?: number;
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
        img: 'chargesBelt.png',
        charges: 1
    },
    chargesBelt1: {
        id: 'belt',
        itemType: ItemType.Belt,
        name: 'Belt of Greater Charges',
        tier: 5,
        img: 'chargesBelt.png',
        charges: 2
    },
    effBelt0: {
        id: 'effBelt0',
        itemType: ItemType.Belt,
        name: 'Belt of Effectiveness',
        tier: 2,
        img: 'effBelt.png',
        effectiveness: 0.25
    },
    effBelt1: {
        id: 'effBelt1',
        itemType: ItemType.Belt,
        name: 'Belt of Greater Effectiveness',
        tier: 3,
        img: 'effBelt.png',
        effectiveness: 0.50
    },
    effBelt2: {
        id: 'effBelt2',
        itemType: ItemType.Belt,
        name: 'Belt of Superior Effectiveness',
        tier: 4,
        img: 'effBelt.png',
        effectiveness: 0.75
    },
    effBelt3: {
        id: 'effBelt3',
        itemType: ItemType.Belt,
        name: 'Belt of Supreme Effectiveness',
        tier: 5,
        img: 'effBelt.png',
        effectiveness: 1
    },
    healBelt0: {
        id: 'healBelt0',
        itemType: ItemType.Belt,
        name: 'Belt of Healing',
        tier: 2,
        img: 'healBelt.png',
        healing: 5
    },
    healBelt1: {
        id: 'healBelt1',
        itemType: ItemType.Belt,
        name: 'Belt of Greater Healing',
        tier: 3,
        img: 'healBelt.png',
        healing: 10
    },
    healBelt2: {
        id: 'healBelt2',
        itemType: ItemType.Belt,
        name: 'Belt of Superior Healing',
        tier: 4,
        img: 'healBelt.png',
        healing: 20
    },
    healBelt3: {
        id: 'healBelt3',
        itemType: ItemType.Belt,
        name: 'Belt of Supreme Healing',
        tier: 5,
        img: 'healBelt.png',
        healing: 40
    },

} as const;

function getBeltTooltip(belt: Belt) {
    const tooltip = [];
    if (belt.charges) tooltip.push(`Potion Charges: +${belt.charges}`);
    if (belt.effectiveness) tooltip.push(`Potion Effectiveness: +${belt.effectiveness*100}%`);
    if (belt.healing) tooltip.push(`Potion Healing: +${belt.healing}`);
    return tooltip.join('\n');
}

function getBeltDescription(belt: Belt) {
    const descriptions = [];
    if (belt.charges) descriptions.push(`Pot Charges: +${belt.charges}`);
    if (belt.effectiveness) descriptions.push(`Pot Eff: +${belt.effectiveness*100}%`);
    if (belt.healing) descriptions.push(`Pot Heal: +${belt.healing}`);
    return descriptions.join(', ');
}

export { Belt, BeltId, belts, getBeltTooltip, getBeltDescription };