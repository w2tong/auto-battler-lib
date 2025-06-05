import AttributeType from '../Character/Attributes/AttributeType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Armour extends Item {
    id: ArmourId;
    itemType: ItemType.Armour;
    type: ArmourType;
    attributes?: ItemAttributes;
    stats?: ItemStats;
    onHit?: {
        func: (self: Character, target: Character) => void;
        description: string;
    };
}

enum ArmourType {
    Unarmoured = 'Unarmoured',
    Light = 'Light Armour',
    Medium = 'Medium Armour',
    Heavy = 'Heavy Armour',
}

type ArmourId =
    'robe0' | 'robe1' | 'robe2' | 'robe3' | 'robe4' | 'robe5' |
    'leatherArmour0' | 'leatherArmour1' | 'leatherArmour2' | 'leatherArmour3' | 'leatherArmour4' | 'leatherArmour5' |
    'mailArmour0' | 'mailArmour1' | 'mailArmour2' | 'mailArmour3' | 'mailArmour4' | 'mailArmour5' |
    'plateArmour0' | 'plateArmour1' | 'plateArmour2' | 'plateArmour3' | 'plateArmour4' | 'plateArmour5'
    ;

const armour: { [id in ArmourId]: Armour } = {
    // Robes
    robe0: {
        id: 'robe0',
        itemType: ItemType.Armour,
        name: 'Robe',
        tier: 0,

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 5
        },
        stats: {
            [StatType.ManaRegen]: 5
        }
    },
    robe1: {
        id: 'robe1',
        itemType: ItemType.Armour,
        name: 'Robe +1',
        tier: 1,

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 6
        },
        stats: {
            [StatType.ManaRegen]: 7
        }
    },
    robe2: {
        id: 'robe2',
        itemType: ItemType.Armour,
        name: 'Robe +2',
        tier: 2,

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 7
        },
        stats: {
            [StatType.ManaRegen]: 9
        }
    },
    robe3: {
        id: 'robe3',
        itemType: ItemType.Armour,
        name: 'Robe +3',
        tier: 3,

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 8
        },
        stats: {
            [StatType.ManaRegen]: 11
        }
    },
    robe4: {
        id: 'robe4',
        itemType: ItemType.Armour,
        name: 'Robe +4',
        tier: 4,

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 9
        },
        stats: {
            [StatType.ManaRegen]: 13
        }
    },
    robe5: {
        id: 'robe5',
        itemType: ItemType.Armour,
        name: 'Robe +5',
        tier: 5,

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 10
        },
        stats: {
            [StatType.ManaRegen]: 15
        }
    },

    // Leather Armour
    leatherArmour0: {
        id: 'leatherArmour0',
        itemType: ItemType.Armour,
        name: 'Leather Armour',
        tier: 0,

        type: ArmourType.Light,
        stats: {
            [StatType.Armour]: 20,
        }
    },
    leatherArmour1: {
        id: 'leatherArmour1',
        itemType: ItemType.Armour,
        name: 'Leather Armour +1',
        tier: 1,

        type: ArmourType.Light,
        stats: {
            [StatType.Armour]: 24,
        }
    },
    leatherArmour2: {
        id: 'leatherArmour2',
        itemType: ItemType.Armour,
        name: 'Leather Armour +2',
        tier: 2,

        type: ArmourType.Light,
        stats: {
            [StatType.Armour]: 28,
        }
    },
    leatherArmour3: {
        id: 'leatherArmour3',
        itemType: ItemType.Armour,
        name: 'Leather Armour +3',
        tier: 3,

        type: ArmourType.Light,
        stats: {
            [StatType.Armour]: 32,
        }
    },
    leatherArmour4: {
        id: 'leatherArmour4',
        itemType: ItemType.Armour,
        name: 'Leather Armour +4',
        tier: 4,

        type: ArmourType.Light,
        stats: {
            [StatType.Armour]: 36,
        }
    },
    leatherArmour5: {
        id: 'leatherArmour5',
        itemType: ItemType.Armour,
        name: 'Leather Armour +5',
        tier: 5,

        type: ArmourType.Light,
        stats: {
            [StatType.Armour]: 40,
        }
    },

    // Mail Armour
    mailArmour0: {
        id: 'mailArmour0',
        itemType: ItemType.Armour,
        name: 'Chainmail',
        tier: 0,

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 30,
            [StatType.Deflection]: 0.5
        }
    },
    mailArmour1: {
        id: 'mailArmour1',
        itemType: ItemType.Armour,
        name: 'Chainmail +1',
        tier: 1,

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 35,
            [StatType.Deflection]: 1
        }
    },
    mailArmour2: {
        id: 'mailArmour2',
        itemType: ItemType.Armour,
        name: 'Chainmail +2',
        tier: 2,

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 40,
            [StatType.Deflection]: 1.5
        }
    },
    mailArmour3: {
        id: 'mailArmour3',
        itemType: ItemType.Armour,
        name: 'Chainmail +3',
        tier: 3,

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 45,
            [StatType.Deflection]: 2
        }
    },
    mailArmour4: {
        id: 'mailArmour4',
        itemType: ItemType.Armour,
        name: 'Chainmail +4',
        tier: 4,

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 50,
            [StatType.Deflection]: 2.5
        }
    },
    mailArmour5: {
        id: 'mailArmour5',
        itemType: ItemType.Armour,
        name: 'Chainmail +5',
        tier: 5,

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 55,
            [StatType.Deflection]: 3
        }
    },

    // Plate Armour
    plateArmour0: {
        id: 'plateArmour0',
        itemType: ItemType.Armour,
        name: 'Plate Armour',
        tier: 0,

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 40,
            [StatType.Deflection]: 1
        }
    },
    plateArmour1: {
        id: 'plateArmour1',
        itemType: ItemType.Armour,
        name: 'Plate Armour +1',
        tier: 1,

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 46,
            [StatType.Deflection]: 2
        }
    },
    plateArmour2: {
        id: 'plateArmour2',
        itemType: ItemType.Armour,
        name: 'Plate Armour +2',
        tier: 2,

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 52,
            [StatType.Deflection]: 3
        }
    },
    plateArmour3: {
        id: 'plateArmour3',
        itemType: ItemType.Armour,
        name: 'Plate Armour +3',
        tier: 3,

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 58,
            [StatType.Deflection]: 4
        }
    },
    plateArmour4: {
        id: 'plateArmour4',
        itemType: ItemType.Armour,
        name: 'Plate Armour +4',
        tier: 4,

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 64,
            [StatType.Deflection]: 5
        }
    },
    plateArmour5: {
        id: 'plateArmour5',
        itemType: ItemType.Armour,
        name: 'Plate Armour +5',
        tier: 5,

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 70,
            [StatType.Deflection]: 6
        }
    },
} as const;

export { Armour, ArmourId, ArmourType, armour };