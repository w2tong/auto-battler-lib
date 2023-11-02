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
    Light = 'Light',
    Medium = 'Medium',
    Heavy = 'Heavy',
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
'lightarmour0' | 'lightarmour1' | 'lightarmour2' | 'lightarmour3' | 'lightarmour4' | 'lightarmour5' |
'mediumarmour0' | 'mediumarmour1' | 'mediumarmour2' | 'mediumarmour3' | 'mediumarmour4' | 'mediumarmour5' |
'heavyarmour0' | 'heavyarmour1' |  'heavyarmour2' |  'heavyarmour3' |  'heavyarmour4' |  'heavyarmour5'
;

const armour: {[id in ArmourId]: Armour} = {
    robe0: {
        id: 'robe0',
        itemType: ItemType.Armour,
        name: 'Robe',
        tier: 0,
        type: ArmourType.Unarmoured,
        armourClass: 0,
        manaRegen: 10
    },
    robe1: {
        id: 'robe1',
        itemType: ItemType.Armour,
        name: 'Robe +1',
        tier: 1,
        type: ArmourType.Unarmoured,
        armourClass: 1,
        manaRegen: 11
    },
    robe2: {
        id: 'robe2',
        itemType: ItemType.Armour,
        name: 'Robe +2',
        tier: 2,
        type: ArmourType.Unarmoured,
        armourClass: 2,
        manaRegen: 12
    },
    robe3: {
        id: 'robe3',
        itemType: ItemType.Armour,
        name: 'Robe +3',
        tier: 3,
        type: ArmourType.Unarmoured,
        armourClass: 3,
        manaRegen: 13
    },
    robe4: {
        id: 'robe4',
        itemType: ItemType.Armour,
        name: 'Robe +4',
        tier: 4,
        type: ArmourType.Unarmoured,
        armourClass: 4,
        manaRegen: 14
    },
    robe5: {
        id: 'robe5',
        itemType: ItemType.Armour,
        name: 'Robe +5',
        tier: 5,
        type: ArmourType.Unarmoured,
        armourClass: 5,
        manaRegen: 15
    },
    lightarmour0: {
        id: 'lightarmour0',
        itemType: ItemType.Armour,
        name: 'Leather Armour',
        tier: 0,
        type: ArmourType.Light,
        armourClass: 1,
        manaRegen: 5
    },
    lightarmour1: {
        id: 'lightarmour1',
        itemType: ItemType.Armour,
        name: 'Leather Armour +1',
        tier: 1,
        type: ArmourType.Light,
        armourClass: 2,
        manaRegen: 6
    },
    lightarmour2: {
        id: 'lightarmour2',
        itemType: ItemType.Armour,
        name: 'Leather Armour +2',
        tier: 2,
        type: ArmourType.Light,
        armourClass: 3,
        manaRegen: 7
    },
    lightarmour3: {
        id: 'lightarmour3',
        itemType: ItemType.Armour,
        name: 'Leather Armour +3',
        tier: 3,
        type: ArmourType.Light,
        armourClass: 4,
        manaRegen: 8
    },
    lightarmour4: {
        id: 'lightarmour4',
        itemType: ItemType.Armour,
        name: 'Leather Armour +4',
        tier: 4,
        type: ArmourType.Light,
        armourClass: 5,
        manaRegen: 9
    },
    lightarmour5: {
        id: 'lightarmour5',
        itemType: ItemType.Armour,
        name: 'Leather Armour +5',
        tier: 5,
        type: ArmourType.Light,
        armourClass: 6,
        manaRegen: 10
    },
    mediumarmour0: {
        id: 'mediumarmour0',
        itemType: ItemType.Armour,
        name: 'Chainmail',
        tier: 0,
        type: ArmourType.Medium,
        armourClass: 2,
        physResist: 5,
        manaRegen: 1
    },
    mediumarmour1: {
        id: 'mediumarmour1',
        itemType: ItemType.Armour,
        name: 'Chainmail +1',
        tier: 1,
        type: ArmourType.Medium,
        armourClass: 3,
        physResist: 6,
        manaRegen: 1
    },
    mediumarmour2: {
        id: 'mediumarmour2',
        itemType: ItemType.Armour,
        name: 'Chainmail +2',
        tier: 2,
        type: ArmourType.Medium,
        armourClass: 4,
        physResist: 7,
        manaRegen: 2
    },
    mediumarmour3: {
        id: 'mediumarmour3',
        itemType: ItemType.Armour,
        name: 'Chainmail +3',
        tier: 3,
        type: ArmourType.Medium,
        armourClass: 5,
        physResist: 8,
        manaRegen: 3
    },
    mediumarmour4: {
        id: 'mediumarmour4',
        itemType: ItemType.Armour,
        name: 'Chainmail +4',
        tier: 4,
        type: ArmourType.Medium,
        armourClass: 6,
        physResist: 9,
        manaRegen: 4
    },
    mediumarmour5: {
        id: 'mediumarmour5',
        itemType: ItemType.Armour,
        name: 'Chainmail +5',
        tier: 5,
        type: ArmourType.Medium,
        armourClass: 7,
        physResist: 10,
        manaRegen: 5
    },
    heavyarmour0: {
        id: 'heavyarmour0',
        itemType: ItemType.Armour,
        name: 'Plate Armour',
        tier: 0,
        type: ArmourType.Heavy,
        armourClass: 3,
        physResist: 5,
    },
    heavyarmour1: {
        id: 'heavyarmour1',
        itemType: ItemType.Armour,
        name: 'Plate Armour +1',
        tier: 1,
        type: ArmourType.Heavy,
        armourClass: 4,
        physResist: 6,
        physDR: 1,
    },
    heavyarmour2: {
        id: 'heavyarmour2',
        itemType: ItemType.Armour,
        name: 'Plate Armour +2',
        tier: 2,
        type: ArmourType.Heavy,
        armourClass: 5,
        physResist: 7,
        physDR: 2,
    },
    heavyarmour3: {
        id: 'heavyarmour3',
        itemType: ItemType.Armour,
        name: 'Plate Armour +3',
        tier: 3,
        type: ArmourType.Heavy,
        armourClass: 6,
        physResist: 8,
        physDR: 3,
    },
    heavyarmour4: {
        id: 'heavyarmour4',
        itemType: ItemType.Armour,
        name: 'Plate Armour +4',
        tier: 4,
        type: ArmourType.Heavy,
        armourClass: 7,
        physResist: 9,
        physDR: 4,
    },
    heavyarmour5: {
        id: 'heavyarmour5',
        itemType: ItemType.Armour,
        name: 'Plate Armour +5',
        tier: 5,
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