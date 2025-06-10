import Ability from '../Ability/Ability';
import AttackType from '../types/AttackType';
import BaseAttributes from '../Character/Attributes/BaseAttributes';
import Character from '../Character/Character';
import { PetId } from '../Character/Pet';
import Stat from '../Character/Stats/Stat';
import Stats from '../Character/Stats/Stats';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import StatType from '../Character/Stats/StatType';
import { Neck } from '../Equipment/Neck';
import { Armour, ArmourType } from '../Equipment/Armour';
import { Waist } from '../Equipment/Waist';
import { EquipmentImport, EquipSlot } from '../Equipment/Equipment';
import { Hands } from '../Equipment/Hands';
import { Head } from '../Equipment/Head';
import { ItemType } from '../Equipment/Item';
import { Potion } from '../Equipment/Potion';
import { Ring } from '../Equipment/Ring';
import { Shield, ShieldType } from '../Equipment/Shield';
import { Weapon, WeaponType } from '../Equipment/Weapon/Weapon';

type createTestCharacterParams = {
    name?: string,
    level?: number,
    attributes?: BaseAttributes,
    statTemplate?: StatTemplate,
    equipment?: EquipmentImport,
    ability?: Ability,
    petId?: PetId,
    options?: {
        currHealthPc?: number,
        currManaPc?: number;
    };
};
function createTestCharacter({ name = '', level = 1, attributes = {}, statTemplate = {}, equipment = { [EquipSlot.MainHand]: test1HWeapon }, ability, petId, options }: createTestCharacterParams): Character {
    return new Character({
        name,
        level,
        attributes,
        statTemplate,
        equipment,
        ability,
        petId,
        options
    });
}

// function createTestStats(stats: { [key in StatType]?: Stat }) {
//     const equipment: Equipment = {
//         mainHand: test1HWeapon
//     };
//     const stats = new Stats({
//         template: {},
//         attributes: new Attributes({}, {}),
//         equipment: {},
//         level: 1
//     });
// }

function createTestStats(stats: { [key in StatType]?: Stat }, level: number = 1) {
    const res: { [key in StatType]?: Stat } = {
        [StatType.CriticalChance]: { base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0 },
        [StatType.CriticalDamage]: { base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0 },
        [StatType.ManaCost]: { base: Stats.DEFAULT_MANA_COST, attribute: 0, bonus: 0 },
        [StatType.ManaOnHit]: { base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0 },
        [StatType.ManaRegen]: { base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0 },
        [StatType.MaxHealth]: { base: Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * (level - 1), attribute: 0, bonus: 0 },
    };

    for (const [key, val] of Object.entries(stats)) {
        res[key as StatType] = val;
    }

    for (const stat of Object.values(StatType)) {
        if (!stats[stat]) stats[stat] = { base: 0, attribute: 0, bonus: 0 };
    }
    return res;
}

const test1HWeapon: Weapon = {
    id: 'longsword0',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
    damageRange: { min: 0, max: 0, bonus: 0 },
};
const test2HWeapon: Weapon = {
    id: 'greatsword0',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    type: WeaponType.Greatsword,
    attackType: AttackType.MeleeWeapon,
    damageRange: { min: 0, max: 0, bonus: 0 },
};
const testShield: Shield = {
    id: 'towerShield0',
    name: '',
    itemType: ItemType.Shield,
    tier: 0,

    type: ShieldType.Light,
    stats: {
        [StatType.BlockChance]: 45,
        [StatType.BlockPower]: 2
    }
};
const testHead: Head = {
    id: 'helmet0',
    itemType: ItemType.Head,
    name: '',
    tier: 0,
};
const testNeck: Neck = {
    id: 'strNeck0',
    itemType: ItemType.Neck,
    name: '',
    tier: 0,
};
const testArmour: Armour = {
    id: 'robe0',
    itemType: ItemType.Armour,
    name: '',
    tier: 0,
    type: ArmourType.Unarmoured,
};
const testHands: Hands = {
    id: 'dwGloves0',
    itemType: ItemType.Hands,
    name: '',
    tier: 0,
};
const testWaist: Waist = {
    id: 'chargesBelt0',
    itemType: ItemType.Waist,
    name: '',
    tier: 0,
};
const testRing: Ring = {
    id: 'accRing0',
    itemType: ItemType.Ring,
    name: '',
    tier: 0,
};
const testPotion: Potion = {
    id: 'healingPotion0',
    itemType: ItemType.Potion,
    name: '',
    tier: 0,
    healingRange: { min: 4, max: 8, bonus: 2 },
    charges: 1
};

export { createTestCharacter, createTestStats, test1HWeapon, test2HWeapon, testShield, testHead, testNeck, testArmour, testHands, testWaist, testRing, testPotion };