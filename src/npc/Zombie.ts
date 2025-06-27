import type NPC from './NPC';
import Attributes from '../Character/Attributes/Attributes';
import AttributeType from '../Character/Attributes/AttributeType';
import Stats from '../Character/Stats/Stats';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';

const Zombie: NPC = {
    id: 'zombie',
    name: 'Zombie',
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 4, perLvl: 1 },
        [AttributeType.Dexterity]: { base: Attributes.MIN_VALUE + 2 },
        [AttributeType.Perception]: { base: Attributes.MIN_VALUE + 1, perLvl: 1 },
        [AttributeType.Constitution]: { perLvl: 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE },
    },
    stats: {
        [StatType.HealthPercent]: { base: -0.25, perLvl: 0.01 },
        [StatType.Armour]: { base: -20, perLvl: 0.5 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 50, perLvl: Stats.DEFAULT_DODGE_PER_LVL },
        [StatType.Accuracy]: { base: Stats.DEFAULT_ACCURACY - 20 },
        [StatType.Damage]: { base: 1, perLvl: 0.2 }
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