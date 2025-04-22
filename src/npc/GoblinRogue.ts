import DoubleStrike from '../Ability/DoubleStrike';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import { armour } from '../Equipment/Armour';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const GoblinRogue: NPC = {
    name: 'Goblin Rogue',
    attributes: {
        [AttributeType.WeaponSkill]: { base: 0, perLvl: 1 },
        [AttributeType.Strength]: { base: 10, perLvl: 1 },
        [AttributeType.Dexterity]: { base: 5, perLvl: 1 },
        [AttributeType.Perception]: { base: 0, perLvl: 0.5 },
        [AttributeType.Constitution]: { base: 0, perLvl: 0.75 },
    },
    stats: {
        [StatType.MaxHealth]: { base: 12, perLvl: 3 },
        [StatType.Armour]: { base: 0, perLvl: 0.8 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: {
        mainHand: weapons.dagger0,
        offHandWeapon: weapons.dagger0,
        armour: armour.leatherArmour0
    },
    ability: DoubleStrike
};

export default GoblinRogue;