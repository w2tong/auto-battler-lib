import { DebuffId } from '../Buffs/buffs';
import Character from '../Character';
import { Item, ItemType } from './Item';
import DamageType from '../DamageType';
import { Dice, dice } from '../dice';

enum WeaponType {
    Unarmed = 'Unarmed',
    Longsword = 'Longsword',
    Greatsword = 'Greatsword',
    Dagger = 'Dagger',
    Quarterstaff = 'Quarterstaff',
    Wand = 'Wand'
}
enum RangeType {
    Melee = 'Melee',
    ShortRange = 'ShortRange',
    LongRange = 'LongRange'
}
enum ManaPerAtk {
    OneHanded = 10,
    TwoHanded = 20
}
enum ManaRegen {
    OneHanded = 5,
    TwoHanded = 10
}
const critRange = 20;
const critMult = 2;
interface Weapon extends Item {
    itemType: ItemType.Weapon
    type: WeaponType;
    range: RangeType;
    light: boolean;
    twoHanded: boolean;
    damageType: DamageType;
    damage: Dice;
    critRange: number;
    critMult: number;
    attackBonus: number;
    damageBonus: number;
    manaPerAtk: number;
    manaRegen?: number;
    onHit?: {
        func: (self: Character, target: Character) => void;
        description: string;
    }
}

type WeaponId = 
'unarmed0'
| 'longsword0' | 'longsword1' | 'longsword2' | 'longsword3' | 'longsword4' | 'longsword5'
| 'greatsword0' | 'greatsword1' | 'greatsword2' | 'greatsword3' | 'greatsword4' | 'greatsword5'
| 'dagger0' | 'dagger1' | 'dagger2' |  'dagger3' |  'dagger4' |  'dagger5'
| 'quarterstaff0' | 'quarterstaff1' | 'quarterstaff2' | 'quarterstaff3' | 'quarterstaff4' | 'quarterstaff5'
| 'wand0' | 'wand1' | 'wand2' | 'wand3' | 'wand4' | 'wand5' 
| 'poisonbite0' | 'poisonbite1'
const weapons: {[id in WeaponId]: Weapon} = {
    // Unarmed
    unarmed0: {
        id: 'unarmed0',
        itemType: ItemType.Weapon,
        name: 'Unarmed',
        type: WeaponType.Unarmed,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    // Longswords
    longsword0: {
        id: 'longsword0',
        itemType: ItemType.Weapon,
        name: 'Longsword',
        type: WeaponType.Longsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: false,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['1d6'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    longsword1: {
        id: 'longsword1',
        itemType: ItemType.Weapon,
        name: 'Longsword +1',
        type: WeaponType.Longsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: false,
        attackBonus: 1,
        damageType: DamageType.Physical,
        damage: dice['1d6'],
        damageBonus: 1,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    longsword2: {
        id: 'longsword2',
        itemType: ItemType.Weapon,
        name: 'Longsword +2',
        type: WeaponType.Longsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: false,
        attackBonus: 2,
        damageType: DamageType.Physical,
        damage: dice['1d6'],
        damageBonus: 2,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    longsword3: {
        id: 'longsword3',
        itemType: ItemType.Weapon,
        name: 'Longsword +3',
        type: WeaponType.Longsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: false,
        attackBonus: 3,
        damageType: DamageType.Physical,
        damage: dice['1d6'],
        damageBonus: 3,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    longsword4: {
        id: 'longsword4',
        itemType: ItemType.Weapon,
        name: 'Longsword +4',
        type: WeaponType.Longsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: false,
        attackBonus: 4,
        damageType: DamageType.Physical,
        damage: dice['1d6'],
        damageBonus: 4,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    longsword5: {
        id: 'longsword5',
        itemType: ItemType.Weapon,
        name: 'Longsword +5',
        type: WeaponType.Longsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: false,
        attackBonus: 5,
        damageType: DamageType.Physical,
        damage: dice['1d6'],
        damageBonus: 5,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    // Greatswords
    greatsword0: {
        id: 'greatsword0',
        itemType: ItemType.Weapon,
        name: 'Greatsword',
        type: WeaponType.Greatsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['2d6'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
    },
    greatsword1: {
        id: 'greatsword1',
        itemType: ItemType.Weapon,
        name: 'Greatsword +1',
        type: WeaponType.Greatsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 1,
        damageType: DamageType.Physical,
        damage: dice['2d6'],
        damageBonus: 1,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
    },
    greatsword2: {
        id: 'greatsword2',
        itemType: ItemType.Weapon,
        name: 'Greatsword +2',
        type: WeaponType.Greatsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 2,
        damageType: DamageType.Physical,
        damage: dice['2d6'],
        damageBonus: 2,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
    },
    greatsword3: {
        id: 'greatsword3',
        itemType: ItemType.Weapon,
        name: 'Greatsword +3',
        type: WeaponType.Greatsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 3,
        damageType: DamageType.Physical,
        damage: dice['2d6'],
        damageBonus: 3,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
    },
    greatsword4: {
        id: 'greatsword4',
        itemType: ItemType.Weapon,
        name: 'Greatsword +4',
        type: WeaponType.Greatsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 4,
        damageType: DamageType.Physical,
        damage: dice['2d6'],
        damageBonus: 4,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
    },
    greatsword5: {
        id: 'greatsword5',
        itemType: ItemType.Weapon,
        name: 'Greatsword +5',
        type: WeaponType.Greatsword,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 5,
        damageType: DamageType.Physical,
        damage: dice['2d6'],
        damageBonus: 5,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
    },
    // Daggers
    dagger0: {
        id: 'dagger0',
        itemType: ItemType.Weapon,
        name: 'Dagger',
        type: WeaponType.Dagger,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 0,
        critRange: critRange-1,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    dagger1: {
        id: 'dagger1',
        itemType: ItemType.Weapon,
        name: 'Dagger +1',
        type: WeaponType.Dagger,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 1,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 1,
        critRange: critRange-1,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    dagger2: {
        id: 'dagger2',
        itemType: ItemType.Weapon,
        name: 'Dagger +2',
        type: WeaponType.Dagger,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 2,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 2,
        critRange: critRange-1,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    dagger3: {
        id: 'dagger3',
        itemType: ItemType.Weapon,
        name: 'Dagger +3',
        type: WeaponType.Dagger,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 3,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 3,
        critRange: critRange-1,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    dagger4: {
        id: 'dagger4',
        itemType: ItemType.Weapon,
        name: 'Dagger +4',
        type: WeaponType.Dagger,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 4,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 4,
        critRange: critRange-1,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    dagger5: {
        id: 'dagger5',
        itemType: ItemType.Weapon,
        name: 'Dagger +5',
        type: WeaponType.Dagger,
        range: RangeType.Melee,
        light: true,
        twoHanded: false,
        attackBonus: 5,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 5,
        critRange: critRange-1,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
    },
    // Staves
    quarterstaff0: {
        id: 'quarterstaff0',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff',
        type: WeaponType.Quarterstaff,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['1d8'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
        manaRegen: ManaRegen.TwoHanded
    },
    quarterstaff1: {
        id: 'quarterstaff1',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +1',
        type: WeaponType.Quarterstaff,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 1,
        damageType: DamageType.Physical,
        damage: dice['1d8'],
        damageBonus: 1,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
        manaRegen: ManaRegen.TwoHanded
    },
    quarterstaff2: {
        id: 'quarterstaff2',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +2',
        type: WeaponType.Quarterstaff,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 2,
        damageType: DamageType.Physical,
        damage: dice['1d8'],
        damageBonus: 2,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
        manaRegen: ManaRegen.TwoHanded
    },
    quarterstaff3: {
        id: 'quarterstaff3',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +3',
        type: WeaponType.Quarterstaff,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 3,
        damageType: DamageType.Physical,
        damage: dice['1d8'],
        damageBonus: 3,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
        manaRegen: ManaRegen.TwoHanded
    },
    quarterstaff4: {
        id: 'quarterstaff4',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +4',
        type: WeaponType.Quarterstaff,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 4,
        damageType: DamageType.Physical,
        damage: dice['1d8'],
        damageBonus: 4,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
        manaRegen: ManaRegen.TwoHanded
    },
    quarterstaff5: {
        id: 'quarterstaff5',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +5',
        type: WeaponType.Quarterstaff,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 5,
        damageType: DamageType.Physical,
        damage: dice['1d8'],
        damageBonus: 5,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.TwoHanded,
        manaRegen: ManaRegen.TwoHanded
    },
    // Wands
    wand0: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand',
        type: WeaponType.Wand,
        range: RangeType.ShortRange,
        light: false,
        twoHanded: false,
        attackBonus: 0,
        damageType: DamageType.Magic,
        damage: dice['1d6'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
        manaRegen: ManaRegen.OneHanded
    },
    wand1: {
        id: 'wand1',
        itemType: ItemType.Weapon,
        name: 'Wand +1',
        type: WeaponType.Wand,
        range: RangeType.ShortRange,
        light: false,
        twoHanded: false,
        attackBonus: 1,
        damageType: DamageType.Magic,
        damage: dice['1d6'],
        damageBonus: 1,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
        manaRegen: ManaRegen.OneHanded
    },
    wand2: {
        id: 'wand2',
        itemType: ItemType.Weapon,
        name: 'Wand +2',
        type: WeaponType.Wand,
        range: RangeType.ShortRange,
        light: false,
        twoHanded: false,
        attackBonus: 2,
        damageType: DamageType.Magic,
        damage: dice['1d6'],
        damageBonus: 2,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
        manaRegen: ManaRegen.OneHanded
    },
    wand3: {
        id: 'wand3',
        itemType: ItemType.Weapon,
        name: 'Wand +3',
        type: WeaponType.Wand,
        range: RangeType.ShortRange,
        light: false,
        twoHanded: false,
        attackBonus: 3,
        damageType: DamageType.Magic,
        damage: dice['1d6'],
        damageBonus: 3,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
        manaRegen: ManaRegen.OneHanded
    },
    wand4: {
        id: 'wand4',
        itemType: ItemType.Weapon,
        name: 'Wand +4',
        type: WeaponType.Wand,
        range: RangeType.ShortRange,
        light: false,
        twoHanded: false,
        attackBonus: 4,
        damageType: DamageType.Magic,
        damage: dice['1d6'],
        damageBonus: 4,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
        manaRegen: ManaRegen.OneHanded
    },
    wand5: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand +5',
        type: WeaponType.Wand,
        range: RangeType.ShortRange,
        light: false,
        twoHanded: false,
        attackBonus: 5,
        damageType: DamageType.Magic,
        damage: dice['1d6'],
        damageBonus: 5,
        critRange,
        critMult,
        manaPerAtk: ManaPerAtk.OneHanded,
        manaRegen: ManaRegen.OneHanded
    },
    // NPC Weapons
    // Poison Bite
    poisonbite0: {
        id: 'poisonbite0',
        itemType: ItemType.Weapon,
        name: 'Poison Bite',
        type: WeaponType.Unarmed,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['1d3'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: 0,
        onHit: {
            func: (self: Character, target: Character) => {
                target.buffTracker.addDebuff(DebuffId.Poison, 1, self);
            },
            description: 'Inflict 1 Poison on hit.'
        }
    },
    poisonbite1: {
        id: 'poisonbite1',
        itemType: ItemType.Weapon,
        name: 'Poison Bite',
        type: WeaponType.Unarmed,
        range: RangeType.Melee,
        light: false,
        twoHanded: true,
        attackBonus: 0,
        damageType: DamageType.Physical,
        damage: dice['1d4'],
        damageBonus: 0,
        critRange,
        critMult,
        manaPerAtk: 0,
        onHit: {
            func: (self: Character, target: Character) => {
                target.buffTracker.addDebuff(DebuffId.Poison, 2, self);
            },
            description: 'Inflict 2 Poison on hit.'
        }
    }
} as const;

function getWeaponTooltip(weapon: Weapon) {
    const tooltip = [
        `${weapon.type}, ${weapon.range}`,
        `Damage: ${weapon.damage.num + weapon.damageBonus} - ${weapon.damage.num * weapon.damage.sides + weapon.damageBonus} ${weapon.damageType}`,
        `Crit: ${weapon.critRange < 20 ? `${weapon.critRange}-` : ''}20 (x${weapon.critMult})`, `Mana/Atk: ${weapon.manaPerAtk}`
    ];
    if (weapon.attackBonus) tooltip.push(`Attack Bonus: ${weapon.attackBonus}`);
    if (weapon.onHit) tooltip.push(weapon.onHit.description);
    return tooltip.join('\n');
}

function getWeaponDescription(weapon: Weapon) {
    const descriptions = [];
    if (weapon.twoHanded) {
        descriptions.push('Two-Handed');
    }
    descriptions.push(`Damage: ${weapon.damage.num + weapon.damageBonus} - ${weapon.damage.num * weapon.damage.sides + weapon.damageBonus}`);
    descriptions.push(`Crit: ${weapon.critRange < 20 ? `${weapon.critRange}-` : ''}20 (x${weapon.critMult})`);
    descriptions.push(`MP/ATK: ${weapon.manaPerAtk}`);
    if (weapon.manaRegen) descriptions.push(`MP Regen: ${weapon.manaRegen}`);
    return descriptions.join(', ');
}

export { WeaponType, RangeType, Weapon, WeaponId, weapons, getWeaponTooltip, getWeaponDescription };