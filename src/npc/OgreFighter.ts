import AttributeType from '../Character/Attributes/AttributeType';
import Attributes from '../Character/Attributes/Attributes';
import ClassName from '../Character/Classes/ClassName';
import { startingAbility } from '../Character/Classes/classLoadouts';
import StatType from '../Character/Stats/StatType';
import Stats from '../Character/Stats/Stats';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { hands } from '../Equipment/Hands';
import { necks } from '../Equipment/Neck';
import { potions } from '../Equipment/Potion';
import { rings } from '../Equipment/Ring';
import { waists } from '../Equipment/Waist';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const OgreFighter: NPC = {
    id: 'ogreFighter',
    name: 'Ogre Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 15, perLvl: 1.5 },
        [AttributeType.Dexterity]: { base: Attributes.DEFAULT_VALUE - 5 },
        [AttributeType.Perception]: { base: Attributes.MIN_VALUE, perLvl: 0.5 },
        [AttributeType.Constitution]: { base: Attributes.DEFAULT_VALUE + 10, perLvl: 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE },
    },
    stats: {
        [StatType.Accuracy]: { base: -10 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE - 25 }
    },
    equipment: {
        1: {
            [EquipSlot.MainHand]: weapons.greatsword0,
            [EquipSlot.Armour]: armour.leatherArmour0
        },
        5: {
            [EquipSlot.MainHand]: weapons.greatsword1,
            [EquipSlot.Armour]: armour.leatherArmour1,
            [EquipSlot.Hands]: hands.thGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.strNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.greatsword2,
            [EquipSlot.Armour]: armour.leatherArmour2,
            [EquipSlot.Hands]: hands.thGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Neck]: necks.strNeck0,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.greatsword3,
            [EquipSlot.Armour]: armour.leatherArmour3,
            [EquipSlot.Hands]: hands.thGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Neck]: necks.strNeck1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.greatsword4,
            [EquipSlot.Armour]: armour.leatherArmour4,
            [EquipSlot.Hands]: hands.thGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Neck]: necks.strNeck1,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.greatsword5,
            [EquipSlot.Armour]: armour.leatherArmour5,
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

export default OgreFighter;