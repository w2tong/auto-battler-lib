import type NPC from '../NPC';
import Attributes from '../../Character/Attributes/Attributes';
import AttributeType from '../../Character/Attributes/AttributeType';
import { startingAbility, startingEquipment } from '../../Character/Classes/classLoadouts';
import ClassName from '../../Character/Classes/ClassName';
import { PetId } from '../../Character/Pet';
import { armour } from '../../Equipment/Armour';
import { EquipSlot } from '../../Equipment/Equipment';
import { hands } from '../../Equipment/Hands';
import { heads } from '../../Equipment/Head';
import { necks } from '../../Equipment/Neck';
import { potions } from '../../Equipment/Potion';
import { rings } from '../../Equipment/Ring';
import { waists } from '../../Equipment/Waist';
import { weapons } from '../../Equipment/Weapon/weapons';

const Ranger: NPC = {
    id: 'ranger',
    name: 'Bandit Ranger',
    className: ClassName.Ranger,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 3, perLvl: 1 },
        [AttributeType.Dexterity]: { base: Attributes.DEFAULT_VALUE + 4, perLvl: 1 },
        [AttributeType.Perception]: { base: Attributes.DEFAULT_VALUE + 3, perLvl: 1 },
        [AttributeType.Constitution]: { perLvl: 0.5 },
    },
    stats: {},
    equipment: {
        1: startingEquipment[ClassName.Ranger],
        5: {
            [EquipSlot.MainHand]: weapons.longbow0,
            [EquipSlot.Armour]: armour.leatherArmour1,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.thGloves0,
            [EquipSlot.Ring1]: rings.dmgRing0,
            [EquipSlot.Ring2]: rings.critRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.perNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.longbow2,
            [EquipSlot.Armour]: armour.leatherArmour2,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.thGloves0,
            [EquipSlot.Ring1]: rings.dmgRing0,
            [EquipSlot.Ring2]: rings.critRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Neck]: necks.perNeck0,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.longbow3,
            [EquipSlot.Armour]: armour.leatherArmour3,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.thGloves1,
            [EquipSlot.Ring1]: rings.dmgRing1,
            [EquipSlot.Ring2]: rings.critRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Neck]: necks.perNeck1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.longbow4,
            [EquipSlot.Armour]: armour.leatherArmour4,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.thGloves1,
            [EquipSlot.Ring1]: rings.dmgRing1,
            [EquipSlot.Ring2]: rings.critRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Neck]: necks.perNeck1,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.longbow5,
            [EquipSlot.Armour]: armour.leatherArmour5,
            [EquipSlot.Head]: heads.helmet2,
            [EquipSlot.Hands]: hands.thGloves2,
            [EquipSlot.Ring1]: rings.dmgRing2,
            [EquipSlot.Ring2]: rings.critRing2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Neck]: necks.perNeck2,
            [EquipSlot.Waist]: waists.healBelt3
        },
    },
    ability: startingAbility[ClassName.Ranger],
    petId: PetId.Wolf
} as const;

export default Ranger;