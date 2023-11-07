import Character from '../Character/Character';
import { Item, ItemType } from './Item';

// enum Price {
//     Tier0 = 5_000,
//     Tier1 = 10_000,
//     Tier2 = 20_000,
//     Tier3 = 35_000,
//     Tier4 = 60_000,
//     Tier5 = 100_000
// }

enum ArmourType {
    Unarmoured = 'Unarmoured',
    Light = 'Light Armour',
    Medium = 'Medium Armour',
    Heavy = 'Heavy Armour',
}

interface Armour extends Item {
    itemType: ItemType.Armour
    type: ArmourType;
    armourClass: number;
    physDR?: number;
    magicDR?: number;
    physResist?: number;
    magicResist?: number;
    manaRegen?: number;
    thorns?: number;
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
    robe0: {
        id: 'robe0',
        itemType: ItemType.Armour,
        name: 'Robe',
        tier: 0,
        img: 'armour-robe.png',
        type: ArmourType.Unarmoured,
        armourClass: 0,
        manaRegen: 10
    },
    robe1: {
        id: 'robe1',
        itemType: ItemType.Armour,
        name: 'Robe +1',
        tier: 1,
        img: 'armour-robe.png',
        type: ArmourType.Unarmoured,
        armourClass: 1,
        manaRegen: 11
    },
    robe2: {
        id: 'robe2',
        itemType: ItemType.Armour,
        name: 'Robe +2',
        tier: 2,
        img: 'armour-robe.png',
        type: ArmourType.Unarmoured,
        armourClass: 2,
        manaRegen: 12
    },
    robe3: {
        id: 'robe3',
        itemType: ItemType.Armour,
        name: 'Robe +3',
        tier: 3,
        img: 'armour-robe.png',
        type: ArmourType.Unarmoured,
        armourClass: 3,
        manaRegen: 13
    },
    robe4: {
        id: 'robe4',
        itemType: ItemType.Armour,
        name: 'Robe +4',
        tier: 4,
        img: 'armour-robe.png',
        type: ArmourType.Unarmoured,
        armourClass: 4,
        manaRegen: 14
    },
    robe5: {
        id: 'robe5',
        itemType: ItemType.Armour,
        name: 'Robe +5',
        tier: 5,
        img: 'armour-robe.png',
        type: ArmourType.Unarmoured,
        armourClass: 5,
        manaRegen: 15
    },
    leatherArmour0: {
        id: 'leatherArmour0',
        itemType: ItemType.Armour,
        name: 'Leather Armour',
        tier: 0,
        img: 'armour-leather.png',
        type: ArmourType.Light,
        armourClass: 1,
        manaRegen: 5
    },
    leatherArmour1: {
        id: 'leatherArmour1',
        itemType: ItemType.Armour,
        name: 'Leather Armour +1',
        tier: 1,
        img: 'armour-leather.png',
        type: ArmourType.Light,
        armourClass: 2,
        manaRegen: 6
    },
    leatherArmour2: {
        id: 'leatherArmour2',
        itemType: ItemType.Armour,
        name: 'Leather Armour +2',
        tier: 2,
        img: 'armour-leather.png',
        type: ArmourType.Light,
        armourClass: 3,
        manaRegen: 7
    },
    leatherArmour3: {
        id: 'leatherArmour3',
        itemType: ItemType.Armour,
        name: 'Leather Armour +3',
        tier: 3,
        img: 'armour-leather.png',
        type: ArmourType.Light,
        armourClass: 4,
        manaRegen: 8
    },
    leatherArmour4: {
        id: 'leatherArmour4',
        itemType: ItemType.Armour,
        name: 'Leather Armour +4',
        tier: 4,
        img: 'armour-leather.png',
        type: ArmourType.Light,
        armourClass: 5,
        manaRegen: 9
    },
    leatherArmour5: {
        id: 'leatherArmour5',
        itemType: ItemType.Armour,
        name: 'Leather Armour +5',
        tier: 5,
        img: 'armour-leather.png',
        type: ArmourType.Light,
        armourClass: 6,
        manaRegen: 10
    },
    mailArmour0: {
        id: 'mailArmour0',
        itemType: ItemType.Armour,
        name: 'Chainmail',
        tier: 0,
        img: 'armour-chainmail.png',
        type: ArmourType.Medium,
        armourClass: 2,
        physResist: 5,
        manaRegen: 1
    },
    mailArmour1: {
        id: 'mailArmour1',
        itemType: ItemType.Armour,
        name: 'Chainmail +1',
        tier: 1,
        img: 'armour-chainmail.png',
        type: ArmourType.Medium,
        armourClass: 3,
        physResist: 6,
        manaRegen: 1
    },
    mailArmour2: {
        id: 'mailArmour2',
        itemType: ItemType.Armour,
        name: 'Chainmail +2',
        tier: 2,
        img: 'armour-chainmail.png',
        type: ArmourType.Medium,
        armourClass: 4,
        physResist: 7,
        manaRegen: 2
    },
    mailArmour3: {
        id: 'mailArmour3',
        itemType: ItemType.Armour,
        name: 'Chainmail +3',
        tier: 3,
        img: 'armour-chainmail.png',
        type: ArmourType.Medium,
        armourClass: 5,
        physResist: 8,
        manaRegen: 3
    },
    mailArmour4: {
        id: 'mailArmour4',
        itemType: ItemType.Armour,
        name: 'Chainmail +4',
        tier: 4,
        img: 'armour-chainmail.png',
        type: ArmourType.Medium,
        armourClass: 6,
        physResist: 9,
        manaRegen: 4
    },
    mailArmour5: {
        id: 'mailArmour5',
        itemType: ItemType.Armour,
        name: 'Chainmail +5',
        tier: 5,
        img: 'armour-chainmail.png',
        type: ArmourType.Medium,
        armourClass: 7,
        physResist: 10,
        manaRegen: 5
    },
    plateArmour0: {
        id: 'plateArmour0',
        itemType: ItemType.Armour,
        name: 'Plate Armour',
        tier: 0,
        img: 'armour-plate.png',
        type: ArmourType.Heavy,
        armourClass: 3,
        physResist: 5,
    },
    plateArmour1: {
        id: 'plateArmour1',
        itemType: ItemType.Armour,
        name: 'Plate Armour +1',
        tier: 1,
        img: 'armour-plate.png',
        type: ArmourType.Heavy,
        armourClass: 4,
        physResist: 6,
        physDR: 1,
    },
    plateArmour2: {
        id: 'plateArmour2',
        itemType: ItemType.Armour,
        name: 'Plate Armour +2',
        tier: 2,
        img: 'armour-plate.png',
        type: ArmourType.Heavy,
        armourClass: 5,
        physResist: 7,
        physDR: 2,
    },
    plateArmour3: {
        id: 'plateArmour3',
        itemType: ItemType.Armour,
        name: 'Plate Armour +3',
        tier: 3,
        img: 'armour-plate.png',
        type: ArmourType.Heavy,
        armourClass: 6,
        physResist: 8,
        physDR: 3,
    },
    plateArmour4: {
        id: 'plateArmour4',
        itemType: ItemType.Armour,
        name: 'Plate Armour +4',
        tier: 4,
        img: 'armour-plate.png',
        type: ArmourType.Heavy,
        armourClass: 7,
        physResist: 9,
        physDR: 4,
    },
    plateArmour5: {
        id: 'plateArmour5',
        itemType: ItemType.Armour,
        name: 'Plate Armour +5',
        tier: 5,
        img: 'armour-plate.png',
        type: ArmourType.Heavy,
        armourClass: 8,
        physResist: 10,
        physDR: 5,
    }
} as const;

function getArmourTooltip(armour: Armour) {
    const tooltip = [`Armour Class: ${armour.armourClass}`];
    if (armour.physDR) tooltip.push(`Physical DR: ${armour.physDR}`);
    if (armour.magicDR) tooltip.push(`Magic DR: ${armour.magicDR}`);
    if (armour.physResist) tooltip.push(`Physical Resist: ${armour.physResist}%`);
    if (armour.magicResist) tooltip.push(`Magic Resist: ${armour.magicResist}%`);
    if (armour.manaRegen) tooltip.push(`Mana Regen: ${armour.manaRegen}`);
    if (armour.thorns) tooltip.push(`Thorns: ${armour.thorns}`);
    return tooltip.join('\n');
}

function getArmourDescription(armour: Armour) {
    const descriptions = [`AC: ${armour.armourClass}`];
    if (armour.physDR) descriptions.push(`Phys DR: ${armour.physDR}`);
    if (armour.magicDR) descriptions.push(`Mag DR: ${armour.magicDR}`);
    if (armour.physResist) descriptions.push(`Phys Res: ${armour.physResist}%`);
    if (armour.magicResist) descriptions.push(`Mag Res: ${armour.magicResist}%`);
    if (armour.manaRegen) descriptions.push(`MP Regen: ${armour.manaRegen}`);
    if (armour.thorns) descriptions.push(`Thorns: ${armour.thorns}`);
    return descriptions.join(', ');
}

export { Armour, ArmourId, armour, getArmourTooltip, getArmourDescription };