import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const Zombie: NPC = {
    name: 'Zombie',
    attributes: {
        [AttributeType.WeaponSkill]: { base: 0, perLvl: 0.75 },
        [AttributeType.Strength]: { base: 0, perLvl: 1 },
        [AttributeType.Dexterity]: { base: 0, perLvl: 0.5 },
        [AttributeType.Perception]: { base: 0, perLvl: 0.25 },
        [AttributeType.Constitution]: { base: 0, perLvl: 1 }
    },
    stats: {
        [StatType.MaxHealth]: { base: 16, perLvl: 3.5 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 10 },

        [StatType.HitChance]: { base: -10 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },
    },
    equipment: {
        mainHand: weapons.poisonbite0
    }
};

export default Zombie;