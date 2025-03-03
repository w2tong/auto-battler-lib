import Firebolt from '../Ability/Firebolt';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import defaultEquipment from '../Equipment/defaultEquipment';
import NPC from './NPC';

const Rogue: NPC = {
    name: 'Rogue',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 1},
        [AttributeType.Dexterity]: {base: 0, perLvl: 0.5},
        [AttributeType.Perception]: {base: 0, perLvl: 1},
        [AttributeType.Constitution]: {base: 0, perLvl: 0.5},
        [AttributeType.Intelligence]: {base: 10, perLvl: 1.5},
        [AttributeType.Wisdom]: {base: 5, perLvl: 0.5},
    },
    stats: {
        [StatType.Armour]: { base: 0, perLvl: 1 },
    
        [StatType.Damage]: { base: 0, perLvl: 0.1 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.SpellPower]: {base: 0, perLvl: 0.2},
    
        [StatType.ManaCost]: { base: 100 }
    },
    equipment: defaultEquipment.Wizard,
    ability: Firebolt
};

export default Rogue;

