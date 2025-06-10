import AttributeType from '../Character/Attributes/AttributeType';
import { startingAbility, startingEquipment } from '../Character/Classes/classLoadouts';
import ClassName from '../Character/Classes/ClassName';
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

const Wizard: NPC = {
    id: 'wizard',
    name: 'Bandit Wizard',
    className: ClassName.Wizard,
    attributes: {
        [AttributeType.Strength]: { perLvl: 0.5 },
        [AttributeType.Perception]: { perLvl: 1 },
        [AttributeType.Intelligence]: { perLvl: 1 },
        [AttributeType.Wisdom]: { perLvl: 0.5 },
    },
    stats: {},
    equipment: {
        1: startingEquipment[ClassName.Wizard],
        5: {
            [EquipSlot.MainHand]: weapons.wand1,
            [EquipSlot.OffHand]: shields.buckler1,
            [EquipSlot.Armour]: armour.robe1,
            [EquipSlot.Head]: heads.clothHood0,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.intNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.wand2,
            [EquipSlot.OffHand]: shields.buckler2,
            [EquipSlot.Armour]: armour.robe2,
            [EquipSlot.Head]: heads.clothHood0,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.accRing0,
            [EquipSlot.Ring2]: rings.accRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Neck]: necks.intNeck0,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.wand3,
            [EquipSlot.OffHand]: shields.buckler3,
            [EquipSlot.Armour]: armour.robe3,
            [EquipSlot.Head]: heads.clothHood1,
            [EquipSlot.Hands]: hands.ohGloves0,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Neck]: necks.intNeck1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.wand4,
            [EquipSlot.OffHand]: shields.buckler4,
            [EquipSlot.Armour]: armour.robe4,
            [EquipSlot.Head]: heads.clothHood1,
            [EquipSlot.Hands]: hands.ohGloves1,
            [EquipSlot.Ring1]: rings.accRing1,
            [EquipSlot.Ring2]: rings.accRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Neck]: necks.intNeck1,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.wand5,
            [EquipSlot.OffHand]: shields.buckler5,
            [EquipSlot.Armour]: armour.robe5,
            [EquipSlot.Head]: heads.clothHood2,
            [EquipSlot.Hands]: hands.ohGloves2,
            [EquipSlot.Ring1]: rings.accRing2,
            [EquipSlot.Ring2]: rings.accRing2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Neck]: necks.intNeck2,
            [EquipSlot.Waist]: waists.healBelt3
        },
    },
    ability: startingAbility[ClassName.Wizard]
} as const;

export default Wizard;

