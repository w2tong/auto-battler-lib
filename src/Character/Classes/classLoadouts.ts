import Ability from '../../Ability/Ability';
import Bless from '../../Ability/Bless';
import DoubleStrike from '../../Ability/DoubleStrike';
import Firebolt from '../../Ability/Firebolt';
import Vanish from '../../Ability/Vanish';
import WoundingShot from '../../Ability/WoundingShot';
import { armour } from '../../Equipment/Armour';
import { EquipmentImport, EquipSlot } from '../../Equipment/Equipment';
import { shields } from '../../Equipment/Shield';
import { weapons } from '../../Equipment/Weapon/weapons';
import ClassName from './ClassName';

const startingAbility: Record<ClassName, Ability> = {
    [ClassName.Fighter]: DoubleStrike,
    [ClassName.Priest]: Bless,
    [ClassName.Ranger]: WoundingShot,
    [ClassName.Rogue]: Vanish,
    [ClassName.Wizard]: Firebolt
};

const startingEquipment: Record<ClassName, EquipmentImport> = {
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

export { startingAbility, startingEquipment };