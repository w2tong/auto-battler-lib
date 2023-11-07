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
| 'thornsRing0' | 'thornsRing1' | 'thornsRing2'
| 'mpAtkRing0' | 'mpAtkRing1' | 'mpAtkRing2'
| 'mpRegenRing0' | 'mpRegenRing1' | 'mpRegenRing2'
| 'mpCostRing0' | 'mpCostRing1' | 'mpCostRing2'
;

const rings: {[id in RingId]: Ring} = {
    abRing0: {
        id: 'abRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Attack',
        tier: 0,
        img: 'abRing.png',
        attackBonus: 1
    },
    abRing1: {
        id: 'abRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Attack',
        tier: 3,
        img: 'abRing.png',
        attackBonus: 2
    },
    abRing2: {
        id: 'abRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Attack',
        tier: 0,
        img: 'abRing.png',
        attackBonus: 3
    },
    dbRing0: {
        id: 'dbRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Damage',
        tier: 0,
        img: 'dbRing.png',
        damageBonus: 1
    },
    dbRing1: {
        id: 'dbRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Damage',
        tier: 3,
        img: 'dbRing.png',
        damageBonus: 2
    },
    dbRing2: {
        id: 'dbRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Damage',
        tier: 5,
        img: 'dbRing.png',
        damageBonus: 3
    },
    crRing0: {
        id: 'crRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Chance',
        tier: 3,
        img: 'crRing.png',
        critRangeBonus: 1
    },
    crRing1: {
        id: 'crRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Pog Clazy Crit Chance',
        tier: 5,
        img: 'crRing.png',
        critRangeBonus: 2
    },
    cmRing0: {
        id: 'cmRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Crit Damage',
        tier: 1,
        img: 'cmRing.png',
        critMultBonus: 0.2
    },
    cmRing1: {
        id: 'cmRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Crit Damage',
        tier: 3,
        img: 'cmRing.png',
        critMultBonus: 0.35
    },
    cmRing2: {
        id: 'cmRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Crit Damage',
        tier: 5,
        img: 'cmRing.png',
        critMultBonus: 0.5
    },
    acRing0: {
        id: 'acRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Armour',
        tier: 0,
        img: 'acRing.png',
        armourClass: 1
    },
    acRing1: {
        id: 'acRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Armour',
        tier: 3,
        img: 'acRing.png',
        armourClass: 2
    },
    acRing2: {
        id: 'acRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Armour',
        tier: 5,
        img: 'acRing.png',
        armourClass: 3
    },
    thornsRing0: {
        id: 'thornsRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser Thorns',
        tier: 1,
        img: 'thornsRing.png',
        thorns: 1
    },
    thornsRing1: {
        id: 'thornsRing1',
        itemType: ItemType.Ring,
        name: 'Ring of Thorns',
        tier: 3,
        img: 'thornsRing.png',
        thorns: 2
    },
    thornsRing2: {
        id: 'thornsRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater Thorns',
        tier: 5,
        img: 'thornsRing.png',
        thorns: 3
    },
    mpAtkRing0: {
        id: 'mpAtkRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser M.Atk Ring',
        tier: 1,
        img: 'mpAtkRing.png',
        manaPerAtk: 2.5
    },
    mpAtkRing1: {
        id: 'mpAtkRing1',
        itemType: ItemType.Ring,
        name: 'Ring of M.Atk Ring',
        tier: 3,
        img: 'mpAtkRing.png',
        manaPerAtk: 5.0
    },
    mpAtkRing2: {
        id: 'mpAtkRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater M.Atk Ring',
        tier: 5,
        img: 'mpAtkRing.png',
        manaPerAtk: 7.5
    },
    mpRegenRing0: {
        id: 'mpRegenRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser M.Regen Ring',
        tier: 1,
        img: 'mpRegenRing.png',
        manaRegen: 4
    },
    mpRegenRing1: {
        id: 'mpRegenRing1',
        itemType: ItemType.Ring,
        name: 'Ring of M.Regen Ring',
        tier: 3,
        img: 'mpRegenRing.png',
        manaRegen: 7
    },
    mpRegenRing2: {
        id: 'mpRegenRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater M.Regen Ring',
        tier: 5,
        img: 'mpRegenRing.png',
        manaRegen: 11
    },
    mpCostRing0: {
        id: 'mpCostRing0',
        itemType: ItemType.Ring,
        name: 'Ring of Lesser M.Cost Ring',
        tier: 1,
        img: 'mpCostRing.png',
        manaCostReduction: 5
    },
    mpCostRing1: {
        id: 'mpCostRing1',
        itemType: ItemType.Ring,
        name: 'Ring of M.Cost Ring',
        tier: 3,
        img: 'mpCostRing.png',
        manaCostReduction: 7.5
    },
    mpCostRing2: {
        id: 'mpCostRing2',
        itemType: ItemType.Ring,
        name: 'Ring of Greater M.Cost Ring',
        tier: 5,
        img: 'mpCostRing.png',
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