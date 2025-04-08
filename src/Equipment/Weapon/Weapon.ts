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
    Wand = 'Wand'
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
        light: true
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
    }
} as const;

export { Weapon, WeaponType, WeaponTypeProperties };