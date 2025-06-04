import { Neck, NeckId, necks } from './Neck';
import { Armour, ArmourId, armour } from './Armour';
import { Waist, WaistId, waists } from './Waist';
import { Hands, HandsId, hands } from './Hands';
import { Head, HeadId, heads } from './Head';
import { ItemId, ItemType } from './Item';
import { Potion, PotionId, potions } from './Potion';
import { Ring, RingId, rings } from './Ring';
import { Shield, ShieldId, shields } from './Shield';
import { Weapon, WeaponTypeProperties } from './Weapon/Weapon';
import { WeaponId, weapons } from './Weapon/weapons';

type Equip = Weapon | Shield | Armour | Head | Hands | Ring | Potion | Waist | Neck;
const equips: { [key in ItemId]: Equip; } = { ...weapons, ...shields, ...armour, ...heads, ...hands, ...rings, ...potions, ...waists, ...necks } as const;

type EquipmentImport = {
    [EquipSlot.MainHand]?: Weapon,
    [EquipSlot.OffHand]?: Weapon | Shield,
    [EquipSlot.Head]?: Head,
    [EquipSlot.Armour]?: Armour,
    [EquipSlot.Hands]?: Hands,
    [EquipSlot.Waist]?: Waist,
    [EquipSlot.Ring1]?: Ring,
    [EquipSlot.Ring2]?: Ring,
    [EquipSlot.Potion]?: Potion,
    [EquipSlot.Neck]?: Neck;
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
    waist?: Waist;
    neck?: Neck;

    constructor(equipmentImport: EquipmentImport) {

        this.mainHand = equipmentImport[EquipSlot.MainHand] ?? weapons.fist;
        if (equipmentImport[EquipSlot.MainHand] === undefined && equipmentImport[EquipSlot.OffHand] === undefined) {
            this.offHandWeapon = weapons.fist;
        }
        if (equipmentImport[EquipSlot.OffHand]) {
            if (equipmentImport[EquipSlot.OffHand].itemType === ItemType.Weapon) this.offHandWeapon = equipmentImport[EquipSlot.OffHand];
            else if (equipmentImport[EquipSlot.OffHand].itemType === ItemType.Shield) this.offHandShield = equipmentImport[EquipSlot.OffHand];
        }

        this.armour = equipmentImport[EquipSlot.Armour];
        this.head = equipmentImport[EquipSlot.Head];
        this.hands = equipmentImport[EquipSlot.Hands];
        this.ring1 = equipmentImport[EquipSlot.Ring1];
        this.ring2 = equipmentImport[EquipSlot.Ring2];
        this.potion = structuredClone(equipmentImport[EquipSlot.Potion]);
        this.waist = equipmentImport[EquipSlot.Waist];
        this.neck = equipmentImport[EquipSlot.Neck];
    }
}

type EquipmentItemIds = Record<EquipSlot, string | null>;

enum EquipSlot {
    MainHand = 'Main Hand',
    OffHand = 'Off Hand',
    Head = 'Head',
    Armour = 'Armour',
    Hands = 'Hands',
    Waist = 'Waist',
    Ring1 = 'Ring 1',
    Ring2 = 'Ring 2',
    Potion = 'Potion',
    Neck = 'Neck'
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
    [EquipSlot.Waist]: (item) => item.itemType === ItemType.Waist,
    [EquipSlot.Neck]: (item) => item.itemType === ItemType.Neck,
};

function isValidEquip(itemId: ItemId, slot: EquipSlot): boolean {
    const item = equips[itemId];
    if (!item) return false;

    const validate = equipValidationMap[slot];
    return validate ? validate(item) : false;
}

function createEquipmentImport(equipmentItemIds: EquipmentItemIds): EquipmentImport {
    const equipmentImport: EquipmentImport = {};
    // Main Hand
    if (equipmentItemIds[EquipSlot.MainHand] && equipmentItemIds[EquipSlot.MainHand] in weapons) {
        equipmentImport[EquipSlot.MainHand] = weapons[equipmentItemIds[EquipSlot.MainHand] as WeaponId];
    }
    // Off Hand
    if (equipmentItemIds[EquipSlot.OffHand]) {
        if (equipmentItemIds[EquipSlot.OffHand] in weapons) {
            equipmentImport[EquipSlot.OffHand] = weapons[equipmentItemIds[EquipSlot.OffHand] as WeaponId];
        }
        else if (equipmentItemIds[EquipSlot.OffHand] in shields) {
            equipmentImport[EquipSlot.OffHand] = shields[equipmentItemIds[EquipSlot.OffHand] as ShieldId];
        }
    }

    // Armour
    if (equipmentItemIds[EquipSlot.Armour] && equipmentItemIds[EquipSlot.Armour] in armour) {
        equipmentImport[EquipSlot.Armour] = armour[equipmentItemIds[EquipSlot.Armour] as ArmourId];
    }

    // Head
    if (equipmentItemIds[EquipSlot.Head] && equipmentItemIds[EquipSlot.Head] in heads) {
        equipmentImport[EquipSlot.Head] = heads[equipmentItemIds[EquipSlot.Head] as HeadId];
    }

    // Hands
    if (equipmentItemIds[EquipSlot.Hands] && equipmentItemIds[EquipSlot.Hands] in hands) {
        equipmentImport[EquipSlot.Hands] = hands[equipmentItemIds[EquipSlot.Hands] as HandsId];
    }

    // Rings
    if (equipmentItemIds[EquipSlot.Ring1] && equipmentItemIds[EquipSlot.Ring1] in rings) {
        equipmentImport[EquipSlot.Ring1] = rings[equipmentItemIds[EquipSlot.Ring1] as RingId];
    }
    if (equipmentItemIds[EquipSlot.Ring2] && equipmentItemIds[EquipSlot.Ring2] in rings) {
        equipmentImport[EquipSlot.Ring2] = rings[equipmentItemIds[EquipSlot.Ring2] as RingId];
    }

    if (equipmentItemIds[EquipSlot.Potion] && equipmentItemIds[EquipSlot.Potion] in potions) {
        equipmentImport[EquipSlot.Potion] = potions[equipmentItemIds[EquipSlot.Potion] as PotionId];
    }

    if (equipmentItemIds[EquipSlot.Waist] && equipmentItemIds[EquipSlot.Waist] in waists) {
        equipmentImport[EquipSlot.Waist] = waists[equipmentItemIds[EquipSlot.Waist] as WaistId];
    }

    if (equipmentItemIds[EquipSlot.Neck] && equipmentItemIds[EquipSlot.Neck] in necks) {
        equipmentImport[EquipSlot.Neck] = necks[equipmentItemIds[EquipSlot.Neck] as NeckId];
    }

    return equipmentImport;
}

export { Equip, EquipmentItemIds, equips, EquipmentImport, Equipment, EquipSlot, isValidEquip, createEquipmentImport };