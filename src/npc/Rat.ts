import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { weapons } from '../Equipment/Weapon';
import NPC from './NPC';

const Rat: NPC = {
    name: 'Rat',
    attributes: {
        [AttributeType.WeaponSkill]: {base: 0, perLvl: 0.75},
        [AttributeType.Strength]: {base: 0, perLvl: 0.5},
        [AttributeType.Dexterity]: {base: 0, perLvl: 1},
        [AttributeType.Perception]: {base: 0, perLvl: 0.5},
        [AttributeType.Constitution]: {base: 0, perLvl: 0.25}
    },
    stats: {
        [StatType.MaxHealth]: { base: 5, perLvl: 2 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE + 10 },

        [StatType.HitChance]: { base: -10 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    },
    equipment: {
        mainHand: weapons.poisonbite0
    }
};

export default Rat;