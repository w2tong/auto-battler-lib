import StatType from '../Character/Stats/StatType';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Ring extends Item {
    itemType: ItemType.Ring;
    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type RingId =
    'atkRing0' | 'atkRing1' | 'atkRing2'
    | 'dmgRing0' | 'dmgRing1' | 'dmgRing2'
    | 'critRing0' | 'critRing1' | 'critRing2'
    | 'critDmgRing0' | 'critDmgRing1' | 'critDmgRing2'
    | 'dodgeRing0' | 'dodgeRing1' | 'dodgeRing2'
    | 'thornsRing0' | 'thornsRing1' | 'thornsRing2'
    | 'mpHitRing0' | 'mpHitRing1' | 'mpHitRing2'
    | 'mpRegenRing0' | 'mpRegenRing1' | 'mpRegenRing2'
    | 'mpCostRing0' | 'mpCostRing1' | 'mpCostRing2'
    ;

const rings: { [id in RingId]: Ring } = {
    atkRing0: {
        id: 'atkRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Attack',
        tier: 0,
        img: 'ring-red.png',

        stats: {
            [StatType.Accuracy]: 4
        }
    },
    atkRing1: {
        id: 'atkRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Attack',
        tier: 3,
        img: 'ring-red.png',

        stats: {
            [StatType.Accuracy]: 7
        }
    },
    atkRing2: {
        id: 'atkRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Attack',
        tier: 0,
        img: 'ring-red.png',

        stats: {
            [StatType.Accuracy]: 10
        }
    },
    dmgRing0: {
        id: 'dmgRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Damage',
        tier: 0,
        img: 'ring-orange.png',

        stats: {
            [StatType.Damage]: 1
        }
    },
    dmgRing1: {
        id: 'dmgRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Damage',
        tier: 3,
        img: 'ring-orange.png',

        stats: {
            [StatType.Damage]: 2
        }
    },
    dmgRing2: {
        id: 'dmgRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Damage',
        tier: 5,
        img: 'ring-orange.png',

        stats: {
            [StatType.Damage]: 3
        }
    },
    critRing0: {
        id: 'critRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Crit Chance',
        tier: 1,
        img: 'ring-black.png',

        stats: {
            [StatType.CriticalChance]: 4
        }
    },
    critRing1: {
        id: 'critRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Chance',
        tier: 3,
        img: 'ring-black.png',

        stats: {
            [StatType.CriticalChance]: 7
        }
    },
    critRing2: {
        id: 'critRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Crit Chance',
        tier: 5,
        img: 'ring-black.png',

        stats: {
            [StatType.CriticalChance]: 10
        }
    },
    critDmgRing0: {
        id: 'critDmgRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Crit Damage',
        tier: 1,
        img: 'ring-grey.png',

        stats: {
            [StatType.CriticalDamage]: 10
        }
    },
    critDmgRing1: {
        id: 'critDmgRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Damage',
        tier: 3,
        img: 'ring-grey.png',

        stats: {
            [StatType.CriticalDamage]: 20
        }
    },
    critDmgRing2: {
        id: 'critDmgRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Crit Damage',
        tier: 5,
        img: 'ring-grey.png',

        stats: {
            [StatType.CriticalDamage]: 30
        }
    },
    dodgeRing0: {
        id: 'dodgeRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Dodge',
        tier: 0,
        img: 'ring-shield.png',

        stats: {
            [StatType.Dodge]: 5
        }
    },
    dodgeRing1: {
        id: 'dodgeRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Dodge',
        tier: 3,
        img: 'ring-shield.png',

        stats: {
            [StatType.Dodge]: 10
        }
    },
    dodgeRing2: {
        id: 'dodgeRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Dodge',
        tier: 5,
        img: 'ring-shield.png',

        stats: {
            [StatType.Dodge]: 15
        }
    },
    thornsRing0: {
        id: 'thornsRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Thorns',
        tier: 1,
        img: 'ring-thorns.png',

        stats: {
            [StatType.Thorns]: 1
        }
    },
    thornsRing1: {
        id: 'thornsRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Thorns',
        tier: 3,
        img: 'ring-thorns.png',

        stats: {
            [StatType.Thorns]: 2
        }
    },
    thornsRing2: {
        id: 'thornsRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Thorns',
        tier: 5,
        img: 'ring-thorns.png',

        stats: {
            [StatType.Thorns]: 3
        }
    },
    mpHitRing0: {
        id: 'mpHitRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Mana Hit',
        tier: 1,
        img: 'ring-purple.png',

        stats: {
            [StatType.ManaOnHit]: 1
        }
    },
    mpHitRing1: {
        id: 'mpHitRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Mana Hit',
        tier: 3,
        img: 'ring-purple.png',

        stats: {
            [StatType.ManaOnHit]: 2
        }
    },
    mpHitRing2: {
        id: 'mpHitRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Mana Hit',
        tier: 5,
        img: 'ring-purple.png',

        stats: {
            [StatType.ManaOnHit]: 3
        }
    },
    mpRegenRing0: {
        id: 'mpRegenRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Mana Regen',
        tier: 1,
        img: 'ring-blue.png',

        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    mpRegenRing1: {
        id: 'mpRegenRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Mana Regen',
        tier: 3,
        img: 'ring-blue.png',

        stats: {
            [StatType.ManaRegen]: 4
        }
    },
    mpRegenRing2: {
        id: 'mpRegenRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Mana Regen',
        tier: 5,
        img: 'ring-blue.png',

        stats: {
            [StatType.ManaRegen]: 6
        }
    },
    mpCostRing0: {
        id: 'mpCostRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Mana Cost',
        tier: 1,
        img: 'ring-teal.png',

        stats: {
            [StatType.ManaCost]: -4
        }
    },
    mpCostRing1: {
        id: 'mpCostRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Mana Cost',
        tier: 3,
        img: 'ring-teal.png',

        stats: {
            [StatType.ManaCost]: -7
        }
    },
    mpCostRing2: {
        id: 'mpCostRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Mana Cost',
        tier: 5,
        img: 'ring-teal.png',

        stats: {
            [StatType.ManaCost]: -10
        }
    }

};

export { Ring, RingId, rings };