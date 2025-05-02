import DoubleStrike from '../Ability/DoubleStrike';
import AttributeType from '../Character/Attributes/AttributeType';
import StatType from '../Character/Stats/StatType';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const GoblinRogue: NPC = {
    name: 'Goblin Rogue',
    attributes: {
        [AttributeType.Strength]: { base: 10, perLvl: 1 },
        [AttributeType.Dexterity]: { base: 5, perLvl: 1 },
        [AttributeType.Perception]: { base: 0, perLvl: 0.5 },
        [AttributeType.Constitution]: { base: 0, perLvl: 0.75 },
    },
    stats: {
        [StatType.MaxHealth]: { base: 12, perLvl: 3 },
        [StatType.Armour]: { base: 0, perLvl: 0.8 },

        [StatType.Accuracy]: { base: 0, perLvl: 1 },
        [StatType.Damage]: { base: 0, perLvl: 0.2 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.2 },

        [StatType.ManaCost]: { base: 100 }
    },
    equipment: {
        [EquipSlot.MainHand]: weapons.dagger0,
        [EquipSlot.OffHand]: weapons.dagger0,
        [EquipSlot.Armour]: armour.leatherArmour0
    },
    ability: DoubleStrike
};

export default GoblinRogue;