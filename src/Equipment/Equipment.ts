import { getABEquipmentItemIds } from '../../sql/tables/ab_equipment';
import { ClassName } from '../Classes/classes';
import { Armour, ArmourId, armour, getArmourDescription, getArmourTooltip } from './Armour';
import { Belt, BeltId, belts, getBeltDescription, getBeltTooltip } from './Belt';
import { Hands, HandsId, getHandsDescription, getHandsTooltip, hands } from './Hands';
import { Head, HeadId, getHeadDescription, getHeadTooltip, heads } from './Head';
import { ItemType } from './Item';
import { Potion, PotionId, getPotionDescription, getPotionTooltip, potions } from './Potion';
import { Ring, RingId, getRingDescription, getRingTooltip, rings } from './Ring';
import { Shield, getShieldDescription, getShieldTooltip, shields } from './Shield';
import { Weapon, WeaponId, getWeaponDescription, getWeaponTooltip, weapons } from './Weapons';

type Equip = Weapon|Shield|Armour|Head|Hands|Ring|Potion|Belt;
const equips: {[key: string]: Equip} = {...weapons, ...shields, ...armour, ...heads, ...hands, ...rings, ...potions, ...belts} as const;

type Equipment = {
    mainHand?: Weapon;
    offHandWeapon?: Weapon;
    offHandShield?: Shield;
    armour?: Armour;
    head?: Head;
    hands?: Hands;
    ring1?: Ring;
    ring2?: Ring;
    potion?: Potion;
    belt?: Belt;
}

const defaultEquipment: {[name in ClassName]: Equipment} = {
    [ClassName.Fighter]: {
        mainHand: weapons.longsword0,
        offHandShield: shields.buckler0
    },
    [ClassName.Rogue]: {
        mainHand: weapons.dagger0,
        offHandWeapon: weapons.dagger0
    },
    [ClassName.Wizard]: {
        mainHand: weapons.quarterstaff0
    }
};

async function fetchEquipment(userId: string, name: string): Promise<Equipment> {
    const dbEquipment = await getABEquipmentItemIds(userId, name);
    if (!dbEquipment) {
        return {};
    }
    const equipment: Equipment = {};
    // Main Hand
    if (dbEquipment.MAIN_HAND && dbEquipment.MAIN_HAND in weapons) {
        equipment.mainHand = weapons[dbEquipment.MAIN_HAND as WeaponId];
    }
    // Off Hand
    if (dbEquipment.OFF_HAND && equips[dbEquipment.OFF_HAND]) {
        const offHand = equips[dbEquipment.OFF_HAND];
        if (offHand.itemType === ItemType.Weapon) {
            equipment.offHandWeapon = offHand;
        }
        else if (offHand.itemType === ItemType.Shield) {
            equipment.offHandShield = offHand;
        }
    }
    // Armour
    if (dbEquipment.ARMOUR && dbEquipment.ARMOUR in armour) {
        equipment.armour = armour[dbEquipment.ARMOUR as ArmourId];
    }

    // Head
    if (dbEquipment.HEAD && dbEquipment.HEAD in heads) {
        equipment.head = heads[dbEquipment.HEAD as HeadId];
    }

    // Hands
    if (dbEquipment.HANDS && dbEquipment.HANDS in hands) {
        equipment.hands = hands[dbEquipment.HANDS as HandsId];
    }

    // Rings
    if (dbEquipment.RING1 && dbEquipment.RING1 in rings) {
        equipment.ring1 = rings[dbEquipment.RING1 as RingId];
    }
    if (dbEquipment.RING2 && dbEquipment.RING2 in rings) {
        equipment.ring2 = rings[dbEquipment.RING2 as RingId];
    }

    if (dbEquipment.POTION && dbEquipment.POTION in potions) {
        equipment.potion = potions[dbEquipment.POTION as PotionId];
    }

    if (dbEquipment.BELT && dbEquipment.BELT in belts) {
        equipment.belt = belts[dbEquipment.BELT as BeltId];
    }
    
    return equipment;
}

function getItemTooltip(item: Equip): string {
    switch(item.itemType) {
        case ItemType.Weapon: return getWeaponTooltip(item);
        case ItemType.Shield: return getShieldTooltip(item);
        case ItemType.Armour: return getArmourTooltip(item);
        case ItemType.Head: return getHeadTooltip(item);
        case ItemType.Hands: return getHandsTooltip(item);
        case ItemType.Ring: return getRingTooltip(item);
        case ItemType.Potion: return getPotionTooltip(item);
        case ItemType.Belt: return getBeltTooltip(item);
        default: return 'Missing item tooltip.';
    }
}

function getItemDescription(item: Equip) {
    switch(item.itemType) {
        case ItemType.Weapon: return getWeaponDescription(item);
        case ItemType.Shield: return getShieldDescription(item);
        case ItemType.Armour: return getArmourDescription(item);
        case ItemType.Head: return getHeadDescription(item);
        case ItemType.Hands: return getHandsDescription(item);
        case ItemType.Ring: return getRingDescription(item);
        case ItemType.Potion: return getPotionDescription(item);
        case ItemType.Belt: return getBeltDescription(item);
        default: return 'Missing item description.';
    }
}

export { Equip, equips, Equipment, defaultEquipment, fetchEquipment, getItemTooltip, getItemDescription };