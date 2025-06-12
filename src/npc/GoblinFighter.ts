import Attributes from '../Character/Attributes/Attributes';
import AttributeType from '../Character/Attributes/AttributeType';
import { startingAbility } from '../Character/Classes/classLoadouts';
import ClassName from '../Character/Classes/ClassName';
import Stats from '../Character/Stats/Stats';
import StatType from '../Character/Stats/StatType';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { hands } from '../Equipment/Hands';
import { heads } from '../Equipment/Head';
import { necks } from '../Equipment/Neck';
import { potions } from '../Equipment/Potion';
import { rings } from '../Equipment/Ring';
import { shields } from '../Equipment/Shield';
import { waists } from '../Equipment/Waist';
import { weapons } from '../Equipment/Weapon/weapons';
import NPC from './NPC';

const GoblinFighter: NPC = {
    id: 'goblinFighter',
    name: 'Goblin Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 3, perLvl: 1 },
        [AttributeType.Dexterity]: { base: Attributes.MIN_VALUE + 3, perLvl: 1 },
        [AttributeType.Perception]: { perLvl: 1 },
        [AttributeType.Constitution]: { base: Attributes.DEFAULT_VALUE + 2, perLvl: 1 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE },
        [AttributeType.Wisdom]: { base: Attributes.MIN_VALUE }
    },
    stats: {
        [StatType.HealthPercent]: { base: -0.4 },
        [StatType.DamagePercent]: { base: -0.5 },
        [StatType.Accuracy]: { base: Stats.DEFAULT_ACCURACY - 5 }
    },
    equipment: {
        1: {
            [EquipSlot.MainHand]: weapons.longsword0,
            [EquipSlot.OffHand]: shields.buckler0,
            [EquipSlot.Armour]: armour.mailArmour0
        },
        5: {
            [EquipSlot.MainHand]: weapons.longsword1,
            [EquipSlot.OffHand]: shields.buckler1,
            [EquipSlot.Armour]: armour.mailArmour0,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.conNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.longsword2,
            [EquipSlot.OffHand]: shields.buckler2,
            [EquipSlot.Armour]: armour.plateArmour2,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Neck]: necks.conNeck0,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.longsword3,
            [EquipSlot.OffHand]: shields.buckler3,
            [EquipSlot.Armour]: armour.plateArmour3,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.ohGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Neck]: necks.conNeck1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.longsword4,
            [EquipSlot.OffHand]: shields.buckler4,
            [EquipSlot.Armour]: armour.plateArmour4,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.ohGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Neck]: necks.conNeck1,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.longsword5,
            [EquipSlot.OffHand]: shields.buckler5,
            [EquipSlot.Armour]: armour.plateArmour5,
            [EquipSlot.Head]: heads.helmet2,
            [EquipSlot.Hands]: hands.ohGloves2,
            [EquipSlot.Ring1]: rings.accRing2,
            [EquipSlot.Ring2]: rings.accRing2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Neck]: necks.conNeck2,
            [EquipSlot.Waist]: waists.healBelt3
        }
    },
    ability: startingAbility[ClassName.Fighter]
} as const;

export default GoblinFighter;