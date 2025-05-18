import AttributeType from '../Character/Attributes/AttributeType';
import { ClassName } from '../Character/Classes/classes';
import { startingAbility, startingEquipment } from '../Character/Classes/classLoadouts';
import StatType from '../Character/Stats/StatType';
import NPC from './NPC';

const Wizard: NPC = {
    name: 'Wizard',
    className: ClassName.Wizard,
    attributes: {
        [AttributeType.Dexterity]: { perLvl: 0.5 },
        [AttributeType.Perception]: { perLvl: 1 },
        [AttributeType.Constitution]: { perLvl: 0.5 },
        [AttributeType.Intelligence]: { perLvl: 1.5 },
        [AttributeType.Wisdom]: { perLvl: 0.5 },
    },
    stats: {
        [StatType.Armour]: { base: 0, perLvl: 1 },

        [StatType.Accuracy]: { base: 0, perLvl: 1 },
        [StatType.Damage]: { base: 0, perLvl: 0.1 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.SpellPower]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: startingEquipment[ClassName.Wizard],
    ability: startingAbility[ClassName.Wizard]
};

export default Wizard;

