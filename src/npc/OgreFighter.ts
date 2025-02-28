import DoubleStrike from '../Ability/DoubleStrike';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { weapons } from '../Equipment/Weapon';
import NPC from './NPC';

const OgreFighter: NPC = {
    name: 'Ogre Fighter',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 1},
        [AttributeType.Strength]: {base: 10, perLvl: 2},
        [AttributeType.Dexterity]: {base: 0, perLvl: 0.5},
        [AttributeType.Perception]: {base: 0, perLvl: 0.5},
        [AttributeType.Constitution]: {base: 10, perLvl: 2},
    },
    stats: {
        [StatType.MaxHealth]: { base: 25, perLvl: 5 },
        [StatType.Armour]: { base: 0, perLvl: 0.8 },
        [StatType.Deflection] : { base: 0, perLvl: 0.2 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 20 },
    
        [StatType.HitChance]: { base: Stats.DEFAULT_HIT_CHANCE - 10 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    
        [StatType.ManaCost]: { base: 100 }
    },
    equipment: {
        mainHand: weapons.greatsword0,
        armour: armour.leatherArmour0
    },
    ability: DoubleStrike
};

export default OgreFighter;