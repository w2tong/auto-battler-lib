import AttributeType from '../Character/Attributes/AttributeType';
import Attributes from '../Character/Attributes/Attributes';
import ClassName from '../Character/Classes/ClassName';
import { startingAbility } from '../Character/Classes/classLoadouts';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { hands } from '../Equipment/Hands';
import { heads } from '../Equipment/Head';
import { necks } from '../Equipment/Neck';
import { potions } from '../Equipment/Potion';
import { rings } from '../Equipment/Ring';
import { waists } from '../Equipment/Waist';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const OrcFighter: NPC = {
    id: 'orcFighter',
    name: 'Orc Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 10, perLvl: 1 },
        [AttributeType.Dexterity]: { base: Attributes.MIN_VALUE + 2 },
        [AttributeType.Perception]: { base: Attributes.MIN_VALUE - 2, perLvl: 1 },
        [AttributeType.Constitution]: { base: Attributes.DEFAULT_VALUE + 5, perLvl: 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE + 1 }
    },
    stats: {
        [StatType.Accuracy]: { base: -5 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 10 }
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
            [EquipSlot.Hands]: hands.thGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.strNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.greatsword2,
            [EquipSlot.Armour]: armour.mailArmour2,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.thGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Neck]: necks.strNeck0,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.greatsword3,
            [EquipSlot.Armour]: armour.mailArmour3,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.thGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Neck]: necks.strNeck1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.greatsword4,
            [EquipSlot.Armour]: armour.mailArmour4,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.thGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Neck]: necks.strNeck1,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.greatsword5,
            [EquipSlot.Armour]: armour.mailArmour5,
            [EquipSlot.Head]: heads.helmet2,
            [EquipSlot.Hands]: hands.thGloves2,
            [EquipSlot.Ring1]: rings.accRing2,
            [EquipSlot.Ring2]: rings.accRing2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Neck]: necks.strNeck2,
            [EquipSlot.Waist]: waists.healBelt3
        }
    },
    ability: startingAbility[ClassName.Fighter]
} as const;

export default OrcFighter;