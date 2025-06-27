import StatType from '../Character/Stats/StatType';
import { type Item, type ItemAttributes, type ItemStats, ItemType } from './Item';

interface Ring extends Item {
    id: RingId;
    itemType: ItemType.Ring;
    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type RingId =
    'accRing0' | 'accRing1' | 'accRing2'
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
    accRing0: {
        id: 'accRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Accuracy',
        tier: 0,

        stats: {
            [StatType.Accuracy]: 5
        }
    },
    accRing1: {
        id: 'accRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Accuracy',
        tier: 3,

        stats: {
            [StatType.Accuracy]: 10
        }
    },
    accRing2: {
        id: 'accRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Accuracy',
        tier: 0,

        stats: {
            [StatType.Accuracy]: 15
        }
    },
    dmgRing0: {
        id: 'dmgRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Damage',
        tier: 0,

        stats: {
            [StatType.DamagePercent]: 0.05
        }
    },
    dmgRing1: {
        id: 'dmgRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Damage',
        tier: 3,

        stats: {
            [StatType.DamagePercent]: 0.075
        }
    },
    dmgRing2: {
        id: 'dmgRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Damage',
        tier: 5,

        stats: {
            [StatType.DamagePercent]: 0.1
        }
    },
    critRing0: {
        id: 'critRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Crit Chance',
        tier: 1,

        stats: {
            [StatType.CriticalChance]: 4
        }
    },
    critRing1: {
        id: 'critRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Chance',
        tier: 3,

        stats: {
            [StatType.CriticalChance]: 7
        }
    },
    critRing2: {
        id: 'critRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Crit Chance',
        tier: 5,

        stats: {
            [StatType.CriticalChance]: 10
        }
    },
    critDmgRing0: {
        id: 'critDmgRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Crit Damage',
        tier: 1,

        stats: {
            [StatType.CriticalDamage]: 0.10
        }
    },
    critDmgRing1: {
        id: 'critDmgRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Damage',
        tier: 3,

        stats: {
            [StatType.CriticalDamage]: 0.20
        }
    },
    critDmgRing2: {
        id: 'critDmgRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Crit Damage',
        tier: 5,

        stats: {
            [StatType.CriticalDamage]: 0.30
        }
    },
    dodgeRing0: {
        id: 'dodgeRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Dodge',
        tier: 0,

        stats: {
            [StatType.Dodge]: 5
        }
    },
    dodgeRing1: {
        id: 'dodgeRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Dodge',
        tier: 3,

        stats: {
            [StatType.Dodge]: 10
        }
    },
    dodgeRing2: {
        id: 'dodgeRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Dodge',
        tier: 5,

        stats: {
            [StatType.Dodge]: 15
        }
    },
    thornsRing0: {
        id: 'thornsRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Thorns',
        tier: 1,

        stats: {
            [StatType.Thorns]: 1
        }
    },
    thornsRing1: {
        id: 'thornsRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Thorns',
        tier: 3,

        stats: {
            [StatType.Thorns]: 3
        }
    },
    thornsRing2: {
        id: 'thornsRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Thorns',
        tier: 5,

        stats: {
            [StatType.Thorns]: 5
        }
    },
    mpHitRing0: {
        id: 'mpHitRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Mana Hit',
        tier: 1,

        stats: {
            [StatType.ManaOnHit]: 3
        }
    },
    mpHitRing1: {
        id: 'mpHitRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Mana Hit',
        tier: 3,

        stats: {
            [StatType.ManaOnHit]: 6
        }
    },
    mpHitRing2: {
        id: 'mpHitRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Mana Hit',
        tier: 5,

        stats: {
            [StatType.ManaOnHit]: 9
        }
    },
    mpRegenRing0: {
        id: 'mpRegenRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Mana Regen',
        tier: 1,

        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    mpRegenRing1: {
        id: 'mpRegenRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Mana Regen',
        tier: 3,

        stats: {
            [StatType.ManaRegen]: 4
        }
    },
    mpRegenRing2: {
        id: 'mpRegenRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Mana Regen',
        tier: 5,

        stats: {
            [StatType.ManaRegen]: 6
        }
    },
    mpCostRing0: {
        id: 'mpCostRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Mana Cost',
        tier: 1,

        stats: {
            [StatType.ManaCost]: -4
        }
    },
    mpCostRing1: {
        id: 'mpCostRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Mana Cost',
        tier: 3,

        stats: {
            [StatType.ManaCost]: -7
        }
    },
    mpCostRing2: {
        id: 'mpCostRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Mana Cost',
        tier: 5,

        stats: {
            [StatType.ManaCost]: -10
        }
    }

};

export { Ring, RingId, rings };