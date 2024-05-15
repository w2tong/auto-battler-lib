import Vanish from '../Ability/Vanish';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import defaultEquipment from '../Equipment/defaultEquipment';
import NPC from './NPC';

const Rogue: NPC = {
    name: 'Rogue',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 1},
        [AttributeType.Strength]: {base: 10, perLvl: 1},
        [AttributeType.Dexterity]: {base: 0, perLvl: 1.5},
        [AttributeType.Perception]: {base: 0, perLvl: 0.75},
        [AttributeType.Constitution]: {base: 5, perLvl: 0.75},
    },
    stats: {
        [StatType.Armour]: { base: 0, perLvl: 0.8 },
    
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    
        [StatType.ManaCost]: { base: 100 }
    },
    equipment: defaultEquipment.Rogue,
    ability: Vanish
};

export default Rogue;

