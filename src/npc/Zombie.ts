import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const Zombie: NPC = {
    name: 'Zombie',
    attributes: {
        [AttributeType.Strength]: { perLvl: 1 },
        [AttributeType.Dexterity]: { perLvl: 0.5 },
        [AttributeType.Perception]: { perLvl: 0.25 },
        [AttributeType.Constitution]: { perLvl: 1 }
    },
    stats: {
        [StatType.MaxHealth]: { base: 16, perLvl: 3.5 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 10 },

        [StatType.Accuracy]: { base: -10, perLvl: 1 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    },
    equipment: {
        [EquipSlot.MainHand]: weapons.poisonbite0
    }
};

export default Zombie;