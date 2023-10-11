import { Item, ItemType } from './Item';

interface Head extends Item {
    itemType: ItemType.Head
    armourClass?: number
    manaPerAtk?: number;
    manaRegen?: number;
    manaCostReduction?: number;
    initiativeBonus?: number;
}

type HeadId = 
'helmet0' | 'helmet1' | 'helmet2' |
'clothHood0' | 'clothHood1' | 'clothHood2' 
;

const heads: {[id in HeadId]: Head} = {
    helmet0: {
        id: 'helmet0',
        itemType: ItemType.Head,
        name: 'Leather Helmet',
        armourClass: 1
    },
    helmet1: {
        id: 'helmet1',
        itemType: ItemType.Head,
        name: 'Mail Coif',
        armourClass: 2
    },
    helmet2: {
        id: 'helmet2',
        itemType: ItemType.Head,
        name: 'Plate Helmet',
        armourClass: 3
    },
    clothHood0: {
        id: 'clothhood0',
        itemType: ItemType.Head,
        name: 'Cloth Hood',
        manaCostReduction: 10
    },
    clothHood1: {
        id: 'clothhood1',
        itemType: ItemType.Head,
        name: 'Cloth Hood +1',
        manaCostReduction: 15
    },
    clothHood2: {
        id: 'clothhood2',
        itemType: ItemType.Head,
        name: 'Cloth Hood +2',
        manaCostReduction: 20
    }
} as const;

function getHeadTooltip(head: Head) {
    const tooltip = [];
    if (head.armourClass) tooltip.push(`Armour Class: ${head.armourClass}`);
    if (head.manaPerAtk) tooltip.push(`Mana/Attack: ${head.manaPerAtk}`);
    if (head.manaRegen) tooltip.push(`Mana Regen: ${head.manaRegen}`);
    if (head.manaCostReduction) tooltip.push(`Mana Cost Reduction: ${head.manaCostReduction}`);
    if (head.initiativeBonus) tooltip.push(`Initiative Bonus: ${head.initiativeBonus}`);
    return tooltip.join('\n');
}

function getHeadDescription(head: Head) {
    const descriptions = [];
    if (head.armourClass) descriptions.push(`AC: ${head.armourClass}`);
    if (head.manaPerAtk) descriptions.push(`MP/ATK: ${head.manaPerAtk}`);
    if (head.manaRegen) descriptions.push(`MP Regen: ${head.manaRegen}`);
    if (head.manaCostReduction) descriptions.push(`MCR: ${head.manaCostReduction}`);
    if (head.initiativeBonus) descriptions.push(`IB: ${head.initiativeBonus}`);
    return descriptions.join(', ');
}

export { Head, HeadId, heads, getHeadTooltip, getHeadDescription };