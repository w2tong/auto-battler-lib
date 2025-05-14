import { startingAbility, startingEquipment } from '../Character/Classes/classLoadouts';
import AttributeType from '../Character/Attributes/AttributeType';
import { ClassName } from '../Character/Classes/classes';
import StatType from '../Character/Stats/StatType';
import NPC from './NPC';

const Fighter: NPC = {
    name: 'Fighter',
    attributes: {
        [AttributeType.Strength]: { base: 10, perLvl: 1.5 },
        [AttributeType.Dexterity]: { base: 0, perLvl: 0.5 },
        [AttributeType.Perception]: { base: 0, perLvl: 0.5 },
        [AttributeType.Constitution]: { base: 5, perLvl: 1.5 },
    },
    stats: {
        [StatType.Armour]: { base: 0, perLvl: 1.2 },
        [StatType.Deflection]: { base: 0, perLvl: 0.2 },
        [StatType.BlockPower]: { base: 0, perLvl: 0.2 },

        [StatType.Accuracy]: { base: 0, perLvl: 1 },
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: startingEquipment[ClassName.Fighter],
    ability: startingAbility[ClassName.Fighter]
};

export default Fighter;

