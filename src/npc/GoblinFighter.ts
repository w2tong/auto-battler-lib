import DoubleStrike from '../Ability/DoubleStrike';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import { armour } from '../Equipment/Armour';
import { shields } from '../Equipment/Shield';
import { weapons } from '../Equipment/Weapon';
import NPC from './NPC';

const GoblinFighter: NPC = {
    name: 'Goblin Fighter',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 1},
        [AttributeType.Strength]: {base: 10, perLvl: 1.25},
        [AttributeType.Dexterity]: {base: 5, perLvl: 0.75},
        [AttributeType.Perception]: {base: 0, perLvl: 0.5},
        [AttributeType.Constitution]: {base: 0, perLvl: 1},
    },
    stats: {
        [StatType.MaxHealth]: { base: 14, perLvl: 3 },
        [StatType.Armour]: { base: 0, perLvl: 1.2 },
        [StatType.Deflection] : { base: 0, perLvl: 0.1 },
        [StatType.BlockPower]: { base: 0, perLvl: 0.1 },
    
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    
        [StatType.MaxMana]: { base: 100 }
    },
    equipment: {
        mainHand: weapons.longsword0,
        offHandShield: shields.buckler0,
        armour: armour.mailArmour0
    },
    ability: DoubleStrike
};

export default GoblinFighter;