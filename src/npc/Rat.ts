import AttributeType from '../Character/Attributes/AttributeType';
import Attributes from '../Character/Attributes/Attributes';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const Rat: NPC = {
    id: 'rat',
    name: 'Rat',
    attributes: {
        [AttributeType.Strength]: { base: Attributes.MIN_VALUE + 3, perLvl: 1 },
        [AttributeType.Dexterity]: { perLvl: 1 },
        [AttributeType.Perception]: { perLvl: 1 },
        [AttributeType.Constitution]: { base: Attributes.MIN_VALUE + 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE },
    },
    stats: {
        [StatType.HealthPercent]: { base: -0.75 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE + 10 },
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

export default Rat;