import { ClassName } from '../Character/Classes/classes';
import { armour } from './Armour';
import { EquipmentImport, EquipSlot } from './Equipment';
import { shields } from './Shield';
import { weapons } from './Weapon/weapons';

const defaultEquipment: { [name in ClassName]: EquipmentImport } = {
    [ClassName.Fighter]: {
        [EquipSlot.MainHand]: weapons.longsword0,
        [EquipSlot.OffHand]: shields.buckler0,
        [EquipSlot.Armour]: armour.plateArmour0
    },
    [ClassName.Priest]: {
        [EquipSlot.MainHand]: weapons.mace0,
        [EquipSlot.OffHand]: shields.buckler0,
        [EquipSlot.Armour]: armour.robe0
    },
    [ClassName.Ranger]: {
        [EquipSlot.MainHand]: weapons.longbow0,
        [EquipSlot.Armour]: armour.leatherArmour0
    },
    [ClassName.Rogue]: {
        [EquipSlot.MainHand]: weapons.dagger0,
        [EquipSlot.OffHand]: weapons.dagger0,
        [EquipSlot.Armour]: armour.leatherArmour0
    },
    [ClassName.Wizard]: {
        [EquipSlot.MainHand]: weapons.wand0,
        [EquipSlot.OffHand]: shields.buckler0,
        [EquipSlot.Armour]: armour.robe0
    }
};

export default defaultEquipment;