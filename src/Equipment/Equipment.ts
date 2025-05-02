import { Amulet, amulets } from './Amulet';
import { Armour, ArmourId, armour } from './Armour';
import { Belt, BeltId, belts } from './Belt';
import { Hands, HandsId, hands } from './Hands';
import { Head, HeadId, heads } from './Head';
import { ItemType } from './Item';
import { Potion, PotionId, potions } from './Potion';
import { Ring, RingId, rings } from './Ring';
import { Shield, ShieldId, shields } from './Shield';
import { Weapon, WeaponTypeProperties } from './Weapon/Weapon';
import { WeaponId, weapons } from './Weapon/weapons';

type Equip = Weapon | Shield | Armour | Head | Hands | Ring | Potion | Belt | Amulet;
const equips: { [key: string]: Equip; } = { ...weapons, ...shields, ...armour, ...heads, ...hands, ...rings, ...potions, ...belts, ...amulets } as const;

type EquipmentImport = {
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
};

class Equipment {
    mainHand: Weapon;
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

    constructor(equipmentImport: EquipmentImport) {

        this.mainHand = equipmentImport.mainHand ?? weapons.fist;
        if (equipmentImport.mainHand === undefined && equipmentImport.offHandWeapon === undefined && this.offHandShield === undefined) {
            this.offHandWeapon = weapons.fist;
        }
        if (equipmentImport.offHandWeapon) this.offHandWeapon = equipmentImport.offHandWeapon;

        this.offHandShield = equipmentImport.offHandShield;
        this.armour = equipmentImport.armour;
        this.head = equipmentImport.head;
        this.hands = equipmentImport.hands;
        this.ring1 = equipmentImport.ring1;
        this.ring2 = equipmentImport.ring2;
        this.potion = structuredClone(equipmentImport.potion);
        this.belt = equipmentImport.belt;
        this.amulet = equipmentImport.amulet;
    }
}

type EquipmentItemIds = {
    [EquipSlot.MainHand]: string | null;
    [EquipSlot.OffHand]: string | null;
    [EquipSlot.Head]: string | null;
    [EquipSlot.Armour]: string | null;
    [EquipSlot.Hands]: string | null;
    [EquipSlot.Belt]: string | null;
    [EquipSlot.Ring1]: string | null;
    [EquipSlot.Ring2]: string | null;
    [EquipSlot.Potion]: string | null;
    [EquipSlot.Amulet]: string | null;
};

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

const equipValidationMap: Record<EquipSlot, (item: Equip) => boolean> = {
    [EquipSlot.MainHand]: (item) => item.itemType === ItemType.Weapon,
    [EquipSlot.OffHand]: (item) => {
        if (item.itemType === ItemType.Weapon) {
            const { twoHanded, light } = WeaponTypeProperties[item.type];
            return twoHanded === false && light === true;
        }
        return item.itemType === ItemType.Shield;
    },
    [EquipSlot.Armour]: (item) => item.itemType === ItemType.Armour,
    [EquipSlot.Head]: (item) => item.itemType === ItemType.Head,
    [EquipSlot.Hands]: (item) => item.itemType === ItemType.Hands,
    [EquipSlot.Ring1]: (item) => item.itemType === ItemType.Ring,
    [EquipSlot.Ring2]: (item) => item.itemType === ItemType.Ring,
    [EquipSlot.Potion]: (item) => item.itemType === ItemType.Potion,
    [EquipSlot.Belt]: (item) => item.itemType === ItemType.Belt,
    [EquipSlot.Amulet]: (item) => item.itemType === ItemType.Amulet,
};

function isValidEquip(itemId: string, slot: EquipSlot): boolean {
    const item = equips[itemId];
    if (!item) return false;

    const validate = equipValidationMap[slot];
    return validate ? validate(item) : false;
}

function createEquipmentImport(equipmentItemIds: EquipmentItemIds): EquipmentImport {
    const equipmentImport: EquipmentImport = {};
    // Main Hand
    if (equipmentItemIds[EquipSlot.MainHand] && equipmentItemIds[EquipSlot.MainHand] in weapons) {
        equipmentImport.mainHand = weapons[equipmentItemIds[EquipSlot.MainHand] as WeaponId];
    }
    // Off Hand
    if (equipmentItemIds[EquipSlot.OffHand]) {
        if (equipmentItemIds[EquipSlot.OffHand] in weapons) {
            equipmentImport.offHandWeapon = weapons[equipmentItemIds[EquipSlot.OffHand] as WeaponId];
        }
        else if (equipmentItemIds[EquipSlot.OffHand] in shields) {
            equipmentImport.offHandShield = shields[equipmentItemIds[EquipSlot.OffHand] as ShieldId];
        }
    }

    // Armour
    if (equipmentItemIds[EquipSlot.Armour] && equipmentItemIds[EquipSlot.Armour] in armour) {
        equipmentImport.armour = armour[equipmentItemIds[EquipSlot.Armour] as ArmourId];
    }

    // Head
    if (equipmentItemIds[EquipSlot.Head] && equipmentItemIds[EquipSlot.Head] in heads) {
        equipmentImport.head = heads[equipmentItemIds[EquipSlot.Head] as HeadId];
    }

    // Hands
    if (equipmentItemIds[EquipSlot.Hands] && equipmentItemIds[EquipSlot.Hands] in hands) {
        equipmentImport.hands = hands[equipmentItemIds[EquipSlot.Hands] as HandsId];
    }

    // Rings
    if (equipmentItemIds[EquipSlot.Ring1] && equipmentItemIds[EquipSlot.Ring1] in rings) {
        equipmentImport.ring1 = rings[equipmentItemIds[EquipSlot.Ring1] as RingId];
    }
    if (equipmentItemIds[EquipSlot.Ring2] && equipmentItemIds[EquipSlot.Ring2] in rings) {
        equipmentImport.ring2 = rings[equipmentItemIds[EquipSlot.Ring2] as RingId];
    }

    if (equipmentItemIds[EquipSlot.Potion] && equipmentItemIds[EquipSlot.Potion] in potions) {
        equipmentImport.potion = potions[equipmentItemIds[EquipSlot.Potion] as PotionId];
    }

    if (equipmentItemIds[EquipSlot.Belt] && equipmentItemIds[EquipSlot.Belt] in belts) {
        equipmentImport.belt = belts[equipmentItemIds[EquipSlot.Belt] as BeltId];
    }

    return equipmentImport;
}

export { Equip, EquipmentItemIds, equips, EquipmentImport, Equipment, EquipSlot, isValidEquip, createEquipmentImport };