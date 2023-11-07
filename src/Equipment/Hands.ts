import { Item, ItemType } from './Item';

enum WeaponStyle {
    DualWield = 'Dual Wield',
    TwoHanded = 'Two-Handed',
    OneHanded = 'One-Handed',
    Ranged = 'Ranged'
}

interface Hands extends Item {
    itemType: ItemType.Hands
    weaponStyle?: WeaponStyle;
    attackBonus?: number;
    damageBonus?: number;
    critRangeBonus?: number;
    critMultBonus?: number;
}

type HandsId = 
'dwGloves0' | 'dwGloves1' | 'dwGloves2'
| 'thGloves0' | 'thGloves1' | 'thGloves2'
| 'ohGloves0' | 'ohGloves1' | 'ohGloves2'
// | 'rGloves0'
;

const hands: {[id in HandsId]: Hands} = {
    dwGloves0: {
        id: 'dwGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of Lesser Dual Wielding',
        tier: 0,
        img: 'dwGloves.png',
        weaponStyle: WeaponStyle.DualWield,
        attackBonus: 2
    },
    dwGloves1: {
        id: 'dwGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of Dual Wielding',
        tier: 3,
        img: 'dwGloves.png',
        weaponStyle: WeaponStyle.DualWield,
        attackBonus: 4
    },
    dwGloves2: {
        id: 'dwGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of Greater Dual Wielding',
        tier: 5,
        img: 'dwGloves.png',
        weaponStyle: WeaponStyle.DualWield,
        attackBonus: 6
    },
    thGloves0: {
        id: 'thGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of Lesser Two Handing',
        tier: 0,
        img: 'thGloves.png',
        weaponStyle: WeaponStyle.TwoHanded,
        damageBonus: 2
    },
    thGloves1: {
        id: 'thGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of Two Handing',
        tier: 3,
        img: 'thGloves.png',
        weaponStyle: WeaponStyle.TwoHanded,
        damageBonus: 4
    },
    thGloves2: {
        id: 'thGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of Greater Two Handing',
        tier: 5,
        img: 'thGloves.png',
        weaponStyle: WeaponStyle.TwoHanded,
        damageBonus: 6
    },
    ohGloves0: {
        id: 'ohGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of the Lesser Duelist',
        tier: 0,
        img: 'ohGloves.png',
        weaponStyle: WeaponStyle.OneHanded,
        attackBonus: 1,
        damageBonus: 1
    },
    ohGloves1: {
        id: 'ohGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of the Duelist',
        tier: 3,
        img: 'ohGloves.png',
        weaponStyle: WeaponStyle.OneHanded,
        attackBonus: 2,
        damageBonus: 2
    },
    ohGloves2: {
        id: 'ohGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of the Greater Duelist',
        tier: 5,
        img: 'ohGloves.png',
        weaponStyle: WeaponStyle.OneHanded,
        attackBonus: 3,
        damageBonus: 3
    },
} as const;

function getHandsTooltip(hands: Hands) {
    const tooltip = [];
    if (hands.weaponStyle) tooltip.push(`Weapon Style: ${hands.weaponStyle}`);
    if (hands.attackBonus) tooltip.push(`Attack Bonus: ${hands.attackBonus}`);
    if (hands.damageBonus) tooltip.push(`Damage Bonus: ${hands.damageBonus}`);
    if (hands.critRangeBonus) tooltip.push(`Crit Range Bonus: ${hands.critRangeBonus}`);
    if (hands.critMultBonus) tooltip.push(`Crit Mult Bonus: ${hands.critMultBonus*100}%`);
    return tooltip.join('\n');
}

function getHandsDescription(hands: Hands) {
    const descriptions = [];
    if (hands.weaponStyle) descriptions.push(`Style: ${hands.weaponStyle}`);
    if (hands.attackBonus) descriptions.push(`ATK: ${hands.attackBonus}`);
    if (hands.damageBonus) descriptions.push(`DMG: ${hands.damageBonus}`);
    if (hands.critRangeBonus) descriptions.push(`Crit Range: ${hands.critRangeBonus}`);
    if (hands.critMultBonus) descriptions.push(`Crit Mult: ${hands.critMultBonus*100}%`);
    return descriptions.join(', ');
}

export { WeaponStyle, Hands, HandsId, hands, getHandsTooltip, getHandsDescription };