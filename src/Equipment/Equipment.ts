import { ClassName } from '../Character/Classes/classes';
import { Amulet, amulets, getAmuletDescription, getAmuletTooltip } from './Amulet';
import { Armour, armour, getArmourDescription, getArmourTooltip } from './Armour';
import { Belt, belts, getBeltDescription, getBeltTooltip } from './Belt';
import { Hands, getHandsDescription, getHandsTooltip, hands } from './Hands';
import { Head, getHeadDescription, getHeadTooltip, heads } from './Head';
import { ItemType } from './Item';
import { Potion, getPotionDescription, getPotionTooltip, potions } from './Potion';
import { Ring, getRingDescription, getRingTooltip, rings } from './Ring';
import { Shield, getShieldDescription, getShieldTooltip, shields } from './Shield';
import { Weapon, getWeaponDescription, getWeaponTooltip, weapons } from './Weapons';

type Equip = Weapon|Shield|Armour|Head|Hands|Ring|Potion|Belt|Amulet;
const equips: {[key: string]: Equip} = {...weapons, ...shields, ...armour, ...heads, ...hands, ...rings, ...potions, ...belts, ...amulets} as const;

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
    amulet?: Amulet;
}

enum EquipSlot {
    MainHand = 'Main Hand',
    OffHand = 'Off Hand',
    Head = 'Head',
    Armour = 'Armour',
    Hands = 'Hands',
    Belt = 'Belt',
    Ring1 = 'Ring 1',
    Ring2 = 'Ring 2',
    Potion = 'Potion',
    Amulet = 'Amulet'
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
        case ItemType.Amulet: return getAmuletTooltip(item);
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
        case ItemType.Amulet: return getAmuletDescription(item);
        default: return 'Missing item description.';
    }
}

export { Equip, equips, Equipment, EquipSlot, defaultEquipment, getItemTooltip, getItemDescription };