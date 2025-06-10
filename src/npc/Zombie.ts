import Attributes from '../Character/Attributes/Attributes';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const Zombie: NPC = {
    id: 'zombie',
    name: 'Zombie',
    attributes: {
        [AttributeType.Strength]: { perLvl: 1 },
        [AttributeType.Dexterity]: { perLvl: 1 },
        [AttributeType.Perception]: { perLvl: 1 },
        [AttributeType.Constitution]: { perLvl: 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE },
    },
    stats: {
        [StatType.Dodge]: { base: 15 },
        [StatType.Accuracy]: { base: -10 },
        [StatType.Damage]: { base: 1, perLvl: 0.25 }
    },
    equipment: {
        1: { [EquipSlot.MainHand]: weapons.poisonbite0 },
        5: { [EquipSlot.MainHand]: weapons.poisonbite1 },
        9: { [EquipSlot.MainHand]: weapons.poisonbite2 },
        13: { [EquipSlot.MainHand]: weapons.poisonbite3 },
        17: { [EquipSlot.MainHand]: weapons.poisonbite4 },
        20: { [EquipSlot.MainHand]: weapons.poisonbite5 },
    }
} as const;

export default Zombie;