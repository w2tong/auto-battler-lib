import AttributeType from '../Character/Attributes/AttributeType';
import { ClassName } from '../Character/Classes/classes';
import { startingAbility, startingEquipment } from '../Character/Classes/classLoadouts';
import StatType from '../Character/Stats/StatType';
import NPC from './NPC';

const Rogue: NPC = {
    name: 'Rogue',
    className: ClassName.Rogue,
    attributes: {
        [AttributeType.Strength]: { perLvl: 1 },
        [AttributeType.Dexterity]: { perLvl: 1.5 },
        [AttributeType.Perception]: { perLvl: 0.75 },
        [AttributeType.Constitution]: { perLvl: 0.75 },
    },
    stats: {
        [StatType.Armour]: { base: 0, perLvl: 0.8 },

        [StatType.Accuracy]: { base: 0, perLvl: 1 },
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: startingEquipment[ClassName.Rogue],
    ability: startingAbility[ClassName.Rogue]
};

export default Rogue;

