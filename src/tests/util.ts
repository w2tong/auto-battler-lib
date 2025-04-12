import Ability from '../Ability/Ability';
import AttackType from '../AttackType';
import BaseAttributes from '../Character/Attributes/BaseAttributes';
import Character from '../Character/Character';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import DamageType from '../DamageType';
import { EquipmentImport } from '../Equipment/Equipment';
import { ItemType } from '../Equipment/Item';
import { Weapon, WeaponType } from '../Equipment/Weapon/Weapon';

function createTestCharacter({ level = 1, attributes = {}, statTemplate = {}, equipment = { mainHand: test1HWeapon }, ability }: { level?: number, attributes?: BaseAttributes, statTemplate?: StatTemplate, equipment?: EquipmentImport, ability?: Ability; }): Character {
    return new Character({
        name: '',
        level,
        attributes,
        statTemplate,
        equipment,
        ability
    });
}

const test1HWeapon: Weapon = {
    id: '',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    img: '',
    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
    damageType: DamageType.Physical,
    damageRange: { min: 0, max: 0, bonus: 0 },
};

const test2HWeapon: Weapon = {
    id: '',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    img: '',
    type: WeaponType.Greatsword,
    attackType: AttackType.MeleeWeapon,
    damageType: DamageType.Physical,
    damageRange: { min: 0, max: 0, bonus: 0 },
};

export { createTestCharacter, test1HWeapon, test2HWeapon };