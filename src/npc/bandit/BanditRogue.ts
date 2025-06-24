import type NPC from '../NPC';
import Attributes from '../../Character/Attributes/Attributes';
import AttributeType from '../../Character/Attributes/AttributeType';
import { startingAbility, startingEquipment } from '../../Character/Classes/classLoadouts';
import ClassName from '../../Character/Classes/ClassName';
import { armour } from '../../Equipment/Armour';
import { EquipSlot } from '../../Equipment/Equipment';
import { hands } from '../../Equipment/Hands';
import { heads } from '../../Equipment/Head';
import { necks } from '../../Equipment/Neck';
import { potions } from '../../Equipment/Potion';
import { rings } from '../../Equipment/Ring';
import { waists } from '../../Equipment/Waist';
import { weapons } from '../../Equipment/Weapon/weapons';

const Rogue: NPC = {
    id: 'rogue',
    name: 'Bandit Rogue',
    className: ClassName.Rogue,
    attributes: {
        [AttributeType.Strength]: { base: Attributes.DEFAULT_VALUE + 3, perLvl: 1 },
        [AttributeType.Dexterity]: { base: Attributes.DEFAULT_VALUE + 4, perLvl: 1 },
        [AttributeType.Perception]: { base: Attributes.DEFAULT_VALUE + 2, perLvl: 1 },
        [AttributeType.Constitution]: { base: Attributes.DEFAULT_VALUE + 1, perLvl: 0.5 },
    },
    stats: {},
    equipment: {
        1: startingEquipment[ClassName.Rogue],
        5: {
            [EquipSlot.MainHand]: weapons.dagger1,
            [EquipSlot.OffHand]: weapons.dagger1,
            [EquipSlot.Armour]: armour.leatherArmour1,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.dwGloves0,
            [EquipSlot.Ring1]: rings.dmgRing0,
            [EquipSlot.Ring2]: rings.critRing0,
            [EquipSlot.Potion]: potions.healingPotion0,
            [EquipSlot.Neck]: necks.dexNeck0
        },
        9: {
            [EquipSlot.MainHand]: weapons.dagger2,
            [EquipSlot.OffHand]: weapons.dagger2,
            [EquipSlot.Armour]: armour.leatherArmour2,
            [EquipSlot.Head]: heads.helmet0,
            [EquipSlot.Hands]: hands.dwGloves0,
            [EquipSlot.Ring1]: rings.dmgRing0,
            [EquipSlot.Ring2]: rings.critRing0,
            [EquipSlot.Potion]: potions.healingPotion1,
            [EquipSlot.Neck]: necks.dexNeck0,
            [EquipSlot.Waist]: waists.healBelt0
        },
        13: {
            [EquipSlot.MainHand]: weapons.dagger3,
            [EquipSlot.OffHand]: weapons.dagger3,
            [EquipSlot.Armour]: armour.leatherArmour3,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.dwGloves1,
            [EquipSlot.Ring1]: rings.dmgRing1,
            [EquipSlot.Ring2]: rings.critRing1,
            [EquipSlot.Potion]: potions.healingPotion2,
            [EquipSlot.Neck]: necks.dexNeck1,
            [EquipSlot.Waist]: waists.healBelt1
        },
        17: {
            [EquipSlot.MainHand]: weapons.dagger4,
            [EquipSlot.OffHand]: weapons.dagger4,
            [EquipSlot.Armour]: armour.leatherArmour4,
            [EquipSlot.Head]: heads.helmet1,
            [EquipSlot.Hands]: hands.dwGloves1,
            [EquipSlot.Ring1]: rings.dmgRing1,
            [EquipSlot.Ring2]: rings.critRing1,
            [EquipSlot.Potion]: potions.healingPotion3,
            [EquipSlot.Neck]: necks.dexNeck1,
            [EquipSlot.Waist]: waists.healBelt2
        },
        20: {
            [EquipSlot.MainHand]: weapons.dagger5,
            [EquipSlot.OffHand]: weapons.dagger5,
            [EquipSlot.Armour]: armour.leatherArmour5,
            [EquipSlot.Head]: heads.helmet2,
            [EquipSlot.Hands]: hands.dwGloves2,
            [EquipSlot.Ring1]: rings.dmgRing2,
            [EquipSlot.Ring2]: rings.critRing2,
            [EquipSlot.Potion]: potions.healingPotion4,
            [EquipSlot.Neck]: necks.dexNeck2,
            [EquipSlot.Waist]: waists.healBelt3
        },
    },
    ability: startingAbility[ClassName.Rogue]
} as const;

export default Rogue;