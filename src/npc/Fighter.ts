import { startingAbility, startingEquipment } from '../Character/Classes/classLoadouts';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import NPC from './NPC';
import ClassName from '../Character/Classes/ClassName';

const Fighter: NPC = {
    id: 'fighter',
    name: 'Bandit Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { perLvl: 1.5 },
        [AttributeType.Dexterity]: { perLvl: 0.5 },
        [AttributeType.Perception]: { perLvl: 0.5 },
        [AttributeType.Constitution]: { perLvl: 1.5 },
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
} as const;

export default Fighter;

