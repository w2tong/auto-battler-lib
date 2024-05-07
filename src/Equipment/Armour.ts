import ArmourType from '../ArmourType';
import { AttributeType } from '../Character/Attributes';
import Character from '../Character/Character';
import { StatType } from '../Character/Stats';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Armour extends Item {
    itemType: ItemType.Armour;
    type: ArmourType;
    attributes?: ItemAttributes;
    stats?: ItemStats;
    onHit?: {
        func: (self: Character, target: Character) => void;
        description: string;
    }
}

type ArmourId = 
'robe0' | 'robe1' | 'robe2' | 'robe3' | 'robe4' | 'robe5' |
'leatherArmour0' | 'leatherArmour1' | 'leatherArmour2' | 'leatherArmour3' | 'leatherArmour4' | 'leatherArmour5' |
'mailArmour0' | 'mailArmour1' | 'mailArmour2' | 'mailArmour3' | 'mailArmour4' | 'mailArmour5' |
'plateArmour0' | 'plateArmour1' |  'plateArmour2' |  'plateArmour3' |  'plateArmour4' |  'plateArmour5'
;

const armour: {[id in ArmourId]: Armour} = {
    // Robes
    robe0: {
        id: 'robe0',
        itemType: ItemType.Armour,
        name: 'Robe',
        tier: 0,
        img: 'armour-robe.png',

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 5
        },
        stats: {
            [StatType.Dodge]: 5,
            [StatType.ManaRegen]: 5
        }
    },
    robe1: {
        id: 'robe1',
        itemType: ItemType.Armour,
        name: 'Robe +1',
        tier: 1,
        img: 'armour-robe.png',

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 6
        },
        stats: {
            [StatType.Dodge]: 10,
            [StatType.ManaRegen]: 6
        }
    },
    robe2: {
        id: 'robe2',
        itemType: ItemType.Armour,
        name: 'Robe +2',
        tier: 2,
        img: 'armour-robe.png',

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 7
        },
        stats: {
            [StatType.Dodge]: 15,
            [StatType.ManaRegen]: 7
        }
    },
    robe3: {
        id: 'robe3',
        itemType: ItemType.Armour,
        name: 'Robe +3',
        tier: 3,
        img: 'armour-robe.png',

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 8
        },
        stats: {
            [StatType.Dodge]: 20,
            [StatType.ManaRegen]: 8
        }
    },
    robe4: {
        id: 'robe4',
        itemType: ItemType.Armour,
        name: 'Robe +4',
        tier: 4,
        img: 'armour-robe.png',

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 9
        },
        stats: {
            [StatType.Dodge]: 25,
            [StatType.ManaRegen]: 9
        }
    },
    robe5: {
        id: 'robe5',
        itemType: ItemType.Armour,
        name: 'Robe +5',
        tier: 5,
        img: 'armour-robe.png',

        type: ArmourType.Unarmoured,
        attributes: {
            [AttributeType.Intelligence]: 10
        },
        stats: {
            [StatType.Dodge]: 30,
            [StatType.ManaRegen]: 10
        }
    },

    // Leather Armour
    leatherArmour0: {
        id: 'leatherArmour0',
        itemType: ItemType.Armour,
        name: 'Leather Armour',
        tier: 0,
        img: 'armour-leather.png',

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
        img: 'armour-leather.png',

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
        img: 'armour-leather.png',

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
        img: 'armour-leather.png',

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
        img: 'armour-leather.png',

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
        img: 'armour-leather.png',

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
        img: 'armour-chainmail.png',

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 30,
            [StatType.Deflection]: 1
        }
    },
    mailArmour1: {
        id: 'mailArmour1',
        itemType: ItemType.Armour,
        name: 'Chainmail +1',
        tier: 1,
        img: 'armour-chainmail.png',

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 35,
            [StatType.Deflection]: 2
        }
    },
    mailArmour2: {
        id: 'mailArmour2',
        itemType: ItemType.Armour,
        name: 'Chainmail +2',
        tier: 2,
        img: 'armour-chainmail.png',

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 40,
            [StatType.Deflection]: 3
        }
    },
    mailArmour3: {
        id: 'mailArmour3',
        itemType: ItemType.Armour,
        name: 'Chainmail +3',
        tier: 3,
        img: 'armour-chainmail.png',

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 45,
            [StatType.Deflection]: 4
        }
    },
    mailArmour4: {
        id: 'mailArmour4',
        itemType: ItemType.Armour,
        name: 'Chainmail +4',
        tier: 4,
        img: 'armour-chainmail.png',

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 50,
            [StatType.Deflection]: 5
        }
    },
    mailArmour5: {
        id: 'mailArmour5',
        itemType: ItemType.Armour,
        name: 'Chainmail +5',
        tier: 5,
        img: 'armour-chainmail.png',

        type: ArmourType.Medium,
        stats: {
            [StatType.Armour]: 55,
            [StatType.Deflection]: 6
        }
    },

    // Plate Armour
    plateArmour0: {
        id: 'plateArmour0',
        itemType: ItemType.Armour,
        name: 'Plate Armour',
        tier: 0,
        img: 'armour-plate.png',

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 40,
            [StatType.Deflection]: 2
        }
    },
    plateArmour1: {
        id: 'plateArmour1',
        itemType: ItemType.Armour,
        name: 'Plate Armour +1',
        tier: 1,
        img: 'armour-plate.png',

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 46,
            [StatType.Deflection]: 4
        }
    },
    plateArmour2: {
        id: 'plateArmour2',
        itemType: ItemType.Armour,
        name: 'Plate Armour +2',
        tier: 2,
        img: 'armour-plate.png',

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 52,
            [StatType.Deflection]: 6
        }
    },
    plateArmour3: {
        id: 'plateArmour3',
        itemType: ItemType.Armour,
        name: 'Plate Armour +3',
        tier: 3,
        img: 'armour-plate.png',

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 58,
            [StatType.Deflection]: 8
        }
    },
    plateArmour4: {
        id: 'plateArmour4',
        itemType: ItemType.Armour,
        name: 'Plate Armour +4',
        tier: 4,
        img: 'armour-plate.png',

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 64,
            [StatType.Deflection]: 10
        }
    },
    plateArmour5: {
        id: 'plateArmour5',
        itemType: ItemType.Armour,
        name: 'Plate Armour +5',
        tier: 5,
        img: 'armour-plate.png',

        type: ArmourType.Heavy,
        stats: {
            [StatType.Armour]: 70,
            [StatType.Deflection]: 12
        }
    },
} as const;

export { Armour, ArmourId, armour };