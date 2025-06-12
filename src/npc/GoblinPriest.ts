import AttributeType from '../Character/Attributes/AttributeType';
import NPC from './NPC';
import ClassName from '../Character/Classes/ClassName';
import { armour } from '../Equipment/Armour';
import { EquipSlot } from '../Equipment/Equipment';
import { shields } from '../Equipment/Shield';
import { weapons } from '../Equipment/Weapon/weapons';
import { heads } from '../Equipment/Head';
import { rings } from '../Equipment/Ring';
import { hands } from '../Equipment/Hands';
import { potions } from '../Equipment/Potion';
import { necks } from '../Equipment/Neck';
import { waists } from '../Equipment/Waist';
import StatType from '../Character/Stats/StatType';
import Smite from '../Ability/Smite';
import Attributes from '../Character/Attributes/Attributes';

const GoblinPriest: NPC = {
    id: 'goblinPriest',
    name: 'Goblin Priest',
    className: ClassName.Priest,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 2, perLvl: 0.5 },
        [AttributeType.Dexterity]: { base: Attributes.MIN_VALUE + 2, perLvl: 0.25 },
        [AttributeType.Perception]: { base: Attributes.MIN_VALUE + 1, perLvl: 0.5 },
        [AttributeType.Constitution]: { base: Attributes.MIN_VALUE + 2, perLvl: 0.25 },
        [AttributeType.Intelligence]: { base: Attributes.MIN_VALUE + 1 },
        [AttributeType.Wisdom]: { base: Attributes.DEFAULT_VALUE + 5, perLvl: 0.5 },
    },
    stats: {
        [StatType.HealthPercent]: { base: -0.5 },
        [StatType.DamagePercent]: { base: -0.5 },
        [StatType.Accuracy]: { base: -10 },
    },
    equipment: {
        1: {
            [EquipSlot.MainHand]: weapons.mace1,
            [EquipSlot.OffHand]: shields.buckler1,
            [EquipSlot.Armour]: armour.robe0,
        },
        5: {
            [EquipSlot.MainHand]: weapons.mace1,
            [EquipSlot.OffHand]: shields.buckler1,
            [EquipSlot.Armour]: armour.robe1,
            [EquipSlot.Head]: heads.clothHood0,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.mpCostRing0,
            [EquipSlot.Ring2]: rings.mpRegenRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.wisNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.mace2,
            [EquipSlot.OffHand]: shields.buckler2,
            [EquipSlot.Armour]: armour.robe2,
            [EquipSlot.Head]: heads.clothHood0,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.mpCostRing0,
            [EquipSlot.Ring2]: rings.mpRegenRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        13: {
            [EquipSlot.MainHand]: weapons.mace3,
            [EquipSlot.OffHand]: shields.buckler3,
            [EquipSlot.Armour]: armour.robe3,
            [EquipSlot.Head]: heads.clothHood1,
            [EquipSlot.Hands]: hands.ohGloves1,
            [EquipSlot.Ring1]: rings.mpCostRing1,
            [EquipSlot.Ring2]: rings.mpRegenRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.mace4,
            [EquipSlot.OffHand]: shields.buckler4,
            [EquipSlot.Armour]: armour.robe4,
            [EquipSlot.Head]: heads.clothHood1,
            [EquipSlot.Hands]: hands.ohGloves1,
            [EquipSlot.Ring1]: rings.mpCostRing1,
            [EquipSlot.Ring2]: rings.mpRegenRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.mace5,
            [EquipSlot.OffHand]: shields.buckler5,
            [EquipSlot.Armour]: armour.robe5,
            [EquipSlot.Head]: heads.clothHood2,
            [EquipSlot.Hands]: hands.ohGloves2,
            [EquipSlot.Ring1]: rings.mpCostRing2,
            [EquipSlot.Ring2]: rings.mpRegenRing2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Waist]: waists.healBelt3
        }
    },
    ability: Smite
} as const;

export default GoblinPriest;