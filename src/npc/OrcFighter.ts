import type NPC from './NPC';
import AttributeType from '../Character/Attributes/AttributeType';
import Attributes from '../Character/Attributes/Attributes';
import ClassName from '../Character/Classes/ClassName';
import { startingAbility } from '../Character/Classes/classLoadouts';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { heads } from '../Equipment/Head';
import { potions } from '../Equipment/Potion';
import { waists } from '../Equipment/Waist';
import { weapons } from '../Equipment/Weapon/weapons';

const OrcFighter: NPC = {
    id: 'orcFighter',
    name: 'Orc Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 10, perLvl: 1.5 },
        [AttributeType.Dexterity]: { perLvl: 0.4 },
        [AttributeType.Perception]: { base: Attributes.MIN_VALUE + 3, perLvl: 1 },
        [AttributeType.Constitution]: { base: Attributes.DEFAULT_VALUE + 10, perLvl: 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE + 2 }
    },
    stats: {
        [StatType.HealthPercent]: { base: 0.20 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 5, perLvl: Stats.DEFAULT_DODGE_PER_LVL },
        [StatType.Armour]: { base: 5 },
        [StatType.Deflection]: { base: 1, perLvl: 0.2 },
        [StatType.Accuracy]: { base: Stats.DEFAULT_ACCURACY - 5, perLvl: 0.5 }
    },
    equipment: {
        1: {
            [EquipSlot.MainHand]: weapons.greatsword0,
            [EquipSlot.Armour]: armour.mailArmour0
        },
        5: {
            [EquipSlot.MainHand]: weapons.greatsword1,
            [EquipSlot.Armour]: armour.mailArmour1,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Potion]: potions.healingPotion0,
        },
        9: {
            [EquipSlot.MainHand]: weapons.greatsword2,
            [EquipSlot.Armour]: armour.mailArmour2,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.greatsword3,
            [EquipSlot.Armour]: armour.mailArmour3,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.greatsword4,
            [EquipSlot.Armour]: armour.mailArmour4,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.greatsword5,
            [EquipSlot.Armour]: armour.mailArmour5,
            [EquipSlot.Head]: heads.helmet2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Waist]: waists.healBelt3
        }
    },
    ability: startingAbility[ClassName.Fighter]
} as const;

export default OrcFighter;