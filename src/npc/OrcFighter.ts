import DoubleStrike from '../Ability/DoubleStrike';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import { Stats } from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { weapons } from '../Equipment/Weapon';
import NPC from './NPC';

const OrcFighter: NPC = {
    name: 'Orc Fighter',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 1},
        [AttributeType.Strength]: {base: 10, perLvl: 1.75},
        [AttributeType.Dexterity]: {base: 0, perLvl: 0.5},
        [AttributeType.Perception]: {base: 0, perLvl: 0.5},
        [AttributeType.Constitution]: {base: 10, perLvl: 1.75},
    },
    stats: {
        [StatType.MaxHealth]: { base: 24, perLvl: 4 },
        [StatType.Armour]: { base: 0, perLvl: 1 },
        [StatType.Deflection] : { base: 0, perLvl: 0.2 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 10 },
    
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    
        [StatType.MaxMana]: { base: 100 }
    },
    equipment: {
        mainHand: weapons.greatsword0,
        armour: armour.mailArmour0
    },
    ability: DoubleStrike
};

export default OrcFighter;