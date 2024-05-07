import DoubleStrike from '../Ability/DoubleStrike';
import { AttributeType } from '../Character/Attributes/Attributes';
import { StatType } from '../Character/Stats/Stats';
import defaultEquipment from '../Equipment/defaultEquipment';
import NPC from './NPC';

const Fighter: NPC = {
    name: 'Fighter',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 1},
        [AttributeType.Strength]: {base: 10, perLvl: 1.5},
        [AttributeType.Dexterity]: {base: 0, perLvl: 0.5},
        [AttributeType.Perception]: {base: 0, perLvl: 0.5},
        [AttributeType.Constitution]: {base: 5, perLvl: 1.5},
    },
    stats: {
        [StatType.Armour]: { base: 0, perLvl: 1.2 },
        [StatType.Deflection] : { base: 0, perLvl: 0.2 },
        [StatType.BlockPower]: { base: 0, perLvl: 0.2 },
    
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    
        [StatType.MaxMana]: { base: 100 }
    },
    equipment: defaultEquipment.Fighter,
    ability: DoubleStrike
};

export default Fighter;

