import type AttackType from '../../types/AttackType';
import type Character from '../../Character/Character';
import type NumberRange from '../../NumberRange';
import type { Item, ItemType, ItemAttributes, ItemStats } from '../Item';
import type { BiteId } from './weapons/bites';
import type { BowId } from './weapons/bows';
import type { DaggerId } from './weapons/daggers';
import type { GreatswordId } from './weapons/greatswords';
import type { LongswordId } from './weapons/longswords';
import type { MaceId } from './weapons/maces';
import type { QuarterstaffId } from './weapons/quarterstaffs';
import type { UnarmedId } from './weapons/unarmed';
import type { WandId } from './weapons/wands';

type WeaponId = UnarmedId | LongswordId | GreatswordId | DaggerId | QuarterstaffId | WandId | BiteId | MaceId | BowId;

interface Weapon extends Item {
    id: WeaponId,
    itemType: ItemType.Weapon;
    type: WeaponType;
    attackType: AttackType;
    damageRange: NumberRange;
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
    Mace = 'Mace',
    Bow = 'Bow',
    Bite = 'Bite',
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
    },
    Bow: {
        twoHanded: true,
        light: false
    },
    Bite: {
        twoHanded: true,
        light: false
    }
} as const;

export { WeaponId, Weapon, WeaponType, WeaponTypeProperties };