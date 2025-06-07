import AttributeType from '../Character/Attributes/AttributeType';
import { startingAbility } from '../Character/Classes/classLoadouts';
import ClassName from '../Character/Classes/ClassName';
import StatType from '../Character/Stats/StatType';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { shields } from '../Equipment/Shield';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const GoblinFighter: NPC = {
    id: 'goblinFighter',
    name: 'Goblin Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { perLvl: 1.25 },
        [AttributeType.Dexterity]: { perLvl: 0.75 },
        [AttributeType.Perception]: { perLvl: 0.5 },
        [AttributeType.Constitution]: { perLvl: 1 },
    },
    stats: {
        [StatType.MaxHealth]: { base: 14, perLvl: 3 },
        [StatType.Armour]: { base: 0, perLvl: 1.2 },
        [StatType.Deflection]: { base: 0, perLvl: 0.1 },
        [StatType.BlockPower]: { base: 0, perLvl: 0.1 },

        [StatType.Accuracy]: { base: 0, perLvl: 1 },
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: {
        [EquipSlot.MainHand]: weapons.longsword0,
        [EquipSlot.OffHand]: shields.buckler0,
        [EquipSlot.Armour]: armour.mailArmour0
    },
    ability: startingAbility[ClassName.Fighter]
} as const;

export default GoblinFighter;