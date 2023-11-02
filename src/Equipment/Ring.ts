import { Item, ItemType } from './Item';

interface Ring extends Item {
    itemType: ItemType.Ring
    // Attack
    attackBonus?: number;
    damageBonus?: number;
    critRangeBonus?: number;
    critMultBonus?: number;
    // Defense
    armourClass?: number
    physDR?: number;
    magicDR?: number;
    physResist?: number;
    magicResist?: number;
    thorns?: number;
    // Mana
    manaPerAtk?: number;
    manaRegen?: number;
    manaCostReduction?: number;
    // Other
    initiativeBonus?: number;
}

type RingId = 
'abRing0' | 'abRing1' | 'abRing2'
| 'dbRing0' | 'dbRing1' | 'dbRing2'
| 'crRing0' | 'crRing1' 
| 'cmRing0' | 'cmRing1' | 'cmRing2' 
| 'acRing0' | 'acRing1' | 'acRing2'
| 'thrRing0' | 'thrRing1' | 'thrRing2'
| 'mpatkRing0' | 'mpatkRing1' | 'mpatkRing2'
| 'mrgnRing0' | 'mrgnRing1' | 'mrgnRing2'
| 'mcostRing0' | 'mcostRing1' | 'mcostRing2'
;

const rings: {[id in RingId]: Ring} = {
    abRing0: {
        id: 'abRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Attack',
        attackBonus: 1
    },
    abRing1: {
        id: 'abRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Attack',
        attackBonus: 2
    },
    abRing2: {
        id: 'abRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Attack',
        attackBonus: 3
    },
    dbRing0: {
        id: 'dbRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Damage',
        attackBonus: 1
    },
    dbRing1: {
        id: 'dbRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Damage',
        attackBonus: 2
    },
    dbRing2: {
        id: 'dbRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Damage',
        attackBonus: 3
    },
    crRing0: {
        id: 'crRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Chance',
        critRangeBonus: 1
    },
    crRing1: {
        id: 'crRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Pog Clazy Crit Chance',
        critRangeBonus: 2
    },
    cmRing0: {
        id: 'cmRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Crit Damage',
        critMultBonus: 0.2
    },
    cmRing1: {
        id: 'cmRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Damage',
        critMultBonus: 0.35
    },
    cmRing2: {
        id: 'cmRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Crit Damage',
        critMultBonus: 0.5
    },
    acRing0: {
        id: 'acRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Armour',
        armourClass: 1
    },
    acRing1: {
        id: 'acRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Armour',
        armourClass: 2
    },
    acRing2: {
        id: 'acRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Armour',
        armourClass: 3
    },
    thrRing0: {
        id: 'thrRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Thorns',
        thorns: 1
    },
    thrRing1: {
        id: 'thrRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Thorns',
        thorns: 2
    },
    thrRing2: {
        id: 'thrRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Thorns',
        thorns: 3
    },
    mpatkRing0: {
        id: 'mpatkRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser M.Atk Ring',
        manaPerAtk: 2.5
    },
    mpatkRing1: {
        id: 'mpatkRing1',
        itemType: ItemType.Ring,
        name: 'Ring of M.Atk Ring',
        manaPerAtk: 5.0
    },
    mpatkRing2: {
        id: 'mpatkRing3',
        itemType: ItemType.Ring,
        name: 'Ring of Greater M.Atk Ring',
        manaPerAtk: 7.5
    },
    mrgnRing0: {
        id: 'mrgnRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser M.Regen Ring',
        manaRegen: 4
    },
    mrgnRing1: {
        id: 'mrgnRing1',
        itemType: ItemType.Ring,
        name: 'Ring of M.Regen Ring',
        manaRegen: 7
    },
    mrgnRing2: {
        id: 'mrgnRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater M.Regen Ring',
        manaRegen: 11
    },
    mcostRing0: {
        id: 'mcostRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser M.Cost Ring',
        manaCostReduction: 5
    },
    mcostRing1: {
        id: 'mcostRing1',
        itemType: ItemType.Ring,
        name: 'Ring of M.Cost Ring',
        manaCostReduction: 7.5
    },
    mcostRing2: {
        id: 'mcostRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater M.Cost Ring',
        manaCostReduction: 10
    }

};

function getRingTooltip(ring: Ring) {
    const tooltip = [];
    if (ring.attackBonus) tooltip.push(`Attack Bonus: ${ring.attackBonus}`);
    if (ring.damageBonus) tooltip.push(`Damage Bonus: ${ring.damageBonus}`);
    if (ring.critRangeBonus) tooltip.push(`Crit Range Bonus: ${ring.critRangeBonus}`);
    if (ring.critMultBonus) tooltip.push(`Crit Mult Bonus: ${ring.critMultBonus*100}%`);

    if (ring.armourClass) tooltip.push(`Armour Class: ${ring.armourClass}`);
    if (ring.physDR) tooltip.push(`Physical DR: ${ring.physDR}`);
    if (ring.magicDR) tooltip.push(`Magic DR: ${ring.magicDR}`);
    if (ring.physResist) tooltip.push(`Physical Resist: ${ring.physResist}%`);
    if (ring.magicResist) tooltip.push(`Magic Resist: ${ring.magicResist}%`);
    if (ring.thorns) tooltip.push(`Thorns: ${ring.thorns}`);

    if (ring.manaPerAtk) tooltip.push(`Mana/Attack: ${ring.manaPerAtk}`);
    if (ring.manaRegen) tooltip.push(`Mana Regen: ${ring.manaRegen}`);
    if (ring.manaCostReduction) tooltip.push(`Mana Cost Reduction: ${ring.manaCostReduction}`);

    if (ring.initiativeBonus) tooltip.push(`Initiative Bonus: ${ring.initiativeBonus}`);
    return tooltip.join('\n');
}

function getRingDescription(ring: Ring) {
    const descriptions = [];
    if (ring.attackBonus) descriptions.push(`ATK: ${ring.attackBonus}`);
    if (ring.damageBonus) descriptions.push(`DMG: ${ring.damageBonus}`);
    if (ring.critRangeBonus) descriptions.push(`Crit Range: ${ring.critRangeBonus}`);
    if (ring.critMultBonus) descriptions.push(`Crit Mult: ${ring.critMultBonus*100}%`);

    if (ring.armourClass) descriptions.push(`AC: ${ring.armourClass}`);
    if (ring.physDR) descriptions.push(`Phys DR: ${ring.physDR}`);
    if (ring.magicDR) descriptions.push(`Mag DR: ${ring.magicDR}`);
    if (ring.physResist) descriptions.push(`Phys Res: ${ring.physResist}%`);
    if (ring.magicResist) descriptions.push(`Mag Res: ${ring.magicResist}%`);
    if (ring.thorns) descriptions.push(`Thorns: ${ring.thorns}`);

    if (ring.manaPerAtk) descriptions.push(`MP/ATK: ${ring.manaPerAtk}`);
    if (ring.manaRegen) descriptions.push(`MP Regen: ${ring.manaRegen}`);
    if (ring.manaCostReduction) descriptions.push(`MCR: ${ring.manaCostReduction}`);

    if (ring.initiativeBonus) descriptions.push(`IB: ${ring.initiativeBonus}`);
    return descriptions.join(', ');
}

export { Ring, RingId, rings, getRingTooltip, getRingDescription };