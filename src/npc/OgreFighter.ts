import AttributeType from '../Character/Attributes/AttributeType';
import { startingAbility } from '../Character/Classes/classLoadouts';
import { ClassName } from '../Character/Classes/classes';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const OgreFighter: NPC = {
    name: 'Ogre Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: 15, perLvl: 2 },
        [AttributeType.Dexterity]: { perLvl: 0.5 },
        [AttributeType.Perception]: { perLvl: 0.5 },
        [AttributeType.Constitution]: { base: 15, perLvl: 2 },
    },
    stats: {
        [StatType.MaxHealth]: { base: 25, perLvl: 5 },
        [StatType.Armour]: { base: 0, perLvl: 0.8 },
        [StatType.Deflection]: { base: 0, perLvl: 0.2 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 20 },

        [StatType.Accuracy]: { base: -10, perLvl: 1 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: {
        [EquipSlot.MainHand]: weapons.greatsword0,
        [EquipSlot.Armour]: armour.leatherArmour0
    },
    ability: startingAbility[ClassName.Fighter]
};

export default OgreFighter;