import AttributeType from '../Character/Attributes/AttributeType';
import { startingAbility } from '../Character/Classes/classLoadouts';
import { ClassName } from '../Character/Classes/classes';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const OrcFighter: NPC = {
    id: 'orcFighter',
    name: 'Orc Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: 13, perLvl: 1.75 },
        [AttributeType.Dexterity]: { perLvl: 0.5 },
        [AttributeType.Perception]: { perLvl: 0.5 },
        [AttributeType.Constitution]: { base: 13, perLvl: 1.75 },
    },
    stats: {
        [StatType.MaxHealth]: { base: 24, perLvl: 4 },
        [StatType.Armour]: { base: 0, perLvl: 1 },
        [StatType.Deflection]: { base: 0, perLvl: 0.2 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 10 },

        [StatType.Accuracy]: { base: 0, perLvl: 1 },
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: {
        [EquipSlot.MainHand]: weapons.greatsword0,
        [EquipSlot.Armour]: armour.mailArmour0
    },
    ability: startingAbility[ClassName.Fighter]
} as const;

export default OrcFighter;