import AttackType from '../../AttackType';
import Character from '../../Character/Character';
import DamageRange from '../../DamageRange';
import DamageType from '../../DamageType';
import { Item, ItemType, ItemAttributes, ItemStats } from '../Item';

interface Weapon extends Item {
    itemType: ItemType.Weapon;
    type: WeaponType;
    attackType: AttackType;
    damageType: DamageType;
    damageRange: DamageRange;
    spellPowerRatio?: number;
    attributes?: ItemAttributes;
    stats?: ItemStats;
    onHit?: {
        func: (self: Character, target: Character) => void;
        description: string;
    };
}

enum WeaponType {
    Unarmed = 'Unarmed',
    Longsword = 'Longsword',
    Greatsword = 'Greatsword',
    Dagger = 'Dagger',
    Quarterstaff = 'Quarterstaff',
    Wand = 'Wand',
    Mace = 'Mace'
}

const WeaponTypeProperties: { [type in WeaponType]: {
    twoHanded: boolean,
    light: boolean;
} } = {
    Unarmed: {
        twoHanded: false,
        light: true
    },
    Longsword: {
        twoHanded: false,
        light: false
    },
    Greatsword: {
        twoHanded: true,
        light: false
    },
    Dagger: {
        twoHanded: false,
        light: true
    },
    Quarterstaff: {
        twoHanded: true,
        light: false
    },
    Wand: {
        twoHanded: false,
        light: true
    },
    Mace: {
        twoHanded: false,
        light: false
    }
} as const;

export { Weapon, WeaponType, WeaponTypeProperties };