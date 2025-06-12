import { startingAbility, startingEquipment } from '../../Character/Classes/classLoadouts';
import AttributeType from '../../Character/Attributes/AttributeType';
import NPC from '../NPC';
import ClassName from '../../Character/Classes/ClassName';
import { armour } from '../../Equipment/Armour';
import { EquipSlot } from '../../Equipment/Equipment';
import { shields } from '../../Equipment/Shield';
import { weapons } from '../../Equipment/Weapon/weapons';
import { heads } from '../../Equipment/Head';
import { rings } from '../../Equipment/Ring';
import { hands } from '../../Equipment/Hands';
import { potions } from '../../Equipment/Potion';
import { necks } from '../../Equipment/Neck';
import { waists } from '../../Equipment/Waist';
import Attributes from '../../Character/Attributes/Attributes';

const Fighter: NPC = {
    id: 'fighter',
    name: 'Bandit Fighter',
    className: ClassName.Fighter,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 4, perLvl: 1 },
        [AttributeType.Perception]: { base: Attributes.DEFAULT_VALUE + 3, perLvl: 1 },
        [AttributeType.Constitution]: { base: Attributes.DEFAULT_VALUE + 3, perLvl: 1 },
    },
    stats: {},
    equipment: {
        1: startingEquipment[ClassName.Fighter],
        5: {
            [EquipSlot.MainHand]: weapons.longsword1,
            [EquipSlot.OffHand]: shields.buckler1,
            [EquipSlot.Armour]: armour.plateArmour1,
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

export default Fighter;