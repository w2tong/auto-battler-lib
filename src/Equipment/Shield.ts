import StatType from '../Character/Stats/StatType';
import { type Item, type ItemAttributes, type ItemStats, ItemType } from './Item';

enum ShieldType {
    Light = 'Light',
    Medium = 'Medium',
    Heavy = 'Heavy'
}

interface Shield extends Item {
    id: ShieldId;
    itemType: ItemType.Shield;
    type: ShieldType;
    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type ShieldId = 'buckler0' | 'buckler1' | 'buckler2' | 'buckler3' | 'buckler4' | 'buckler5' |
    'spikedShield0' | 'spikedShield1' | 'spikedShield2' | 'spikedShield3' | 'spikedShield4' | 'spikedShield5' |
    'towerShield0' | 'towerShield1' | 'towerShield2' | 'towerShield3' | 'towerShield4' | 'towerShield5';
const shields: { [id in ShieldId]: Shield } = {
    buckler0: {
        id: 'buckler0',
        name: 'Buckler',
        itemType: ItemType.Shield,
        tier: 0,

        type: ShieldType.Light,
        stats: {
            [StatType.BlockChance]: 50,
            [StatType.BlockPower]: 3
        }
    },
    buckler1: {
        id: 'buckler1',
        name: 'Buckler +1',
        itemType: ItemType.Shield,
        tier: 1,

        type: ShieldType.Light,
        stats: {
            [StatType.BlockChance]: 50,
            [StatType.BlockPower]: 6
        }
    },
    buckler2: {
        id: 'buckler2',
        name: 'Buckler +2',
        itemType: ItemType.Shield,
        tier: 2,

        type: ShieldType.Light,
        stats: {
            [StatType.BlockChance]: 50,
            [StatType.BlockPower]: 9
        }
    },
    buckler3: {
        id: 'buckler3',
        name: 'Buckler +3',
        itemType: ItemType.Shield,
        tier: 3,

        type: ShieldType.Light,
        stats: {
            [StatType.BlockChance]: 50,
            [StatType.BlockPower]: 12
        }
    },
    buckler4: {
        id: 'buckler4',
        name: 'Buckler +4',
        itemType: ItemType.Shield,
        tier: 4,

        type: ShieldType.Light,
        stats: {
            [StatType.BlockChance]: 50,
            [StatType.BlockPower]: 15
        }
    },
    buckler5: {
        id: 'buckler5',
        name: 'Buckler +5',
        itemType: ItemType.Shield,
        tier: 5,

        type: ShieldType.Light,
        stats: {
            [StatType.BlockChance]: 50,
            [StatType.BlockPower]: 18
        }
    },
    spikedShield0: {
        id: 'spikedShield0',
        name: 'Spiked Shield',
        itemType: ItemType.Shield,
        tier: 0,

        type: ShieldType.Medium,
        stats: {
            [StatType.BlockChance]: 40,
            [StatType.BlockPower]: 3,
            [StatType.Thorns]: 2,
            [StatType.Damage]: -1
        }
    },
    spikedShield1: {
        id: 'spikedShield1',
        name: 'Spiked Shield +1',
        itemType: ItemType.Shield,
        tier: 1,

        type: ShieldType.Medium,
        stats: {
            [StatType.BlockChance]: 40,
            [StatType.BlockPower]: 6,
            [StatType.Thorns]: 4,
            [StatType.Damage]: -1
        }
    },
    spikedShield2: {
        id: 'spikedShield2',
        name: 'Spiked Shield +2',
        itemType: ItemType.Shield,
        tier: 2,

        type: ShieldType.Medium,
        stats: {
            [StatType.BlockChance]: 40,
            [StatType.BlockPower]: 9,
            [StatType.Thorns]: 7,
            [StatType.Damage]: -1
        }
    },
    spikedShield3: {
        id: 'spikedShield3',
        name: 'Spiked Shield +3',
        itemType: ItemType.Shield,
        tier: 3,

        type: ShieldType.Medium,
        stats: {
            [StatType.BlockChance]: 40,
            [StatType.BlockPower]: 12,
            [StatType.Thorns]: 11,
            [StatType.Damage]: -1
        }
    },
    spikedShield4: {
        id: 'spikedShield4',
        name: 'Spiked Shield +4',
        itemType: ItemType.Shield,
        tier: 4,

        type: ShieldType.Medium,
        stats: {
            [StatType.BlockChance]: 40,
            [StatType.BlockPower]: 15,
            [StatType.Thorns]: 16,
            [StatType.Damage]: -1
        }
    },
    spikedShield5: {
        id: 'spikedShield5',
        name: 'Spiked Shield +5',
        itemType: ItemType.Shield,
        tier: 5,

        type: ShieldType.Medium,
        stats: {
            [StatType.BlockChance]: 40,
            [StatType.BlockPower]: 18,
            [StatType.Thorns]: 16,
            [StatType.Damage]: -1
        }
    },
    towerShield0: {
        id: 'towerShield0',
        name: 'Tower Shield',
        itemType: ItemType.Shield,
        tier: 0,

        type: ShieldType.Heavy,
        stats: {
            [StatType.BlockChance]: 60,
            [StatType.BlockPower]: 5,
            [StatType.Accuracy]: -10,
        }
    },
    towerShield1: {
        id: 'towerShield1',
        name: 'Tower Shield +1',
        itemType: ItemType.Shield,
        tier: 1,

        type: ShieldType.Heavy,
        stats: {
            [StatType.BlockChance]: 60,
            [StatType.BlockPower]: 10,
            [StatType.Accuracy]: -10,
        }
    },
    towerShield2: {
        id: 'towerShield2',
        name: 'Tower Shield +2',
        itemType: ItemType.Shield,
        tier: 2,

        type: ShieldType.Heavy,
        stats: {
            [StatType.BlockChance]: 60,
            [StatType.BlockPower]: 15,
            [StatType.Accuracy]: -10,
        }
    },
    towerShield3: {
        id: 'towerShield3',
        name: 'Tower Shield +3',
        itemType: ItemType.Shield,
        tier: 3,

        type: ShieldType.Heavy,
        stats: {
            [StatType.BlockChance]: 60,
            [StatType.BlockPower]: 20,
            [StatType.Accuracy]: -10,
        }
    },
    towerShield4: {
        id: 'towerShield4',
        name: 'Tower Shield +4',
        itemType: ItemType.Shield,
        tier: 4,

        type: ShieldType.Heavy,
        stats: {
            [StatType.BlockChance]: 60,
            [StatType.BlockPower]: 25,
            [StatType.Accuracy]: -10,
        }
    },
    towerShield5: {
        id: 'towerShield5',
        name: 'Tower Shield +5',
        itemType: ItemType.Shield,
        tier: 5,

        type: ShieldType.Heavy,
        stats: {
            [StatType.BlockChance]: 60,
            [StatType.BlockPower]: 30,
            [StatType.Accuracy]: -10,
        }
    },
};

export { ShieldType, Shield, ShieldId, shields };