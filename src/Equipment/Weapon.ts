import Character from '../Character/Character';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';
import DamageType from '../DamageType';
import { StatType } from '../Character/Stats';
import DamageRange from '../DamageRange';
import { AttributeType } from '../Character/Attributes';
import AttackType from '../AttackType';
import DebuffId from '../StatusEffect/DebuffId';

enum WeaponType {
    Unarmed = 'Unarmed',
    Longsword = 'Longsword',
    Greatsword = 'Greatsword',
    Dagger = 'Dagger',
    Quarterstaff = 'Quarterstaff',
    Wand = 'Wand'
}

interface Weapon extends Item {
    itemType: ItemType.Weapon
    type: WeaponType;
    attackType: AttackType;
    light: boolean;
    twoHanded: boolean;
    damageType: DamageType;
    damageRange: DamageRange;
    spellPowerRatio?: number;
    attributes?: ItemAttributes;
    stats?: ItemStats;
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
        tier: 0,
        img: '',

        type: WeaponType.Unarmed,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 4, bonus: 0 },
    },

    // Longswords
    longsword0: {
        id: 'longsword0',
        itemType: ItemType.Weapon,
        name: 'Longsword',
        tier: 0,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 10
        }
    },
    longsword1: {
        id: 'longsword1',
        itemType: ItemType.Weapon,
        name: 'Longsword +1',
        tier: 1,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 1 },
        stats: {
            [StatType.ArmourPenetration]: 13
        }
    },
    longsword2: {
        id: 'longsword2',
        itemType: ItemType.Weapon,
        name: 'Longsword +2',
        tier: 2,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 2 },
        stats: {
            [StatType.ArmourPenetration]: 16
        }
    },
    longsword3: {
        id: 'longsword3',
        itemType: ItemType.Weapon,
        name: 'Longsword +3',
        tier: 3,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 3 },
        stats: {
            [StatType.ArmourPenetration]: 19
        }
    },
    longsword4: {
        id: 'longsword4',
        itemType: ItemType.Weapon,
        name: 'Longsword +4',
        tier: 4,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 4 },
        stats: {
            [StatType.ArmourPenetration]: 22
        }
    },
    longsword5: {
        id: 'longsword5',
        itemType: ItemType.Weapon,
        name: 'Longsword +5',
        tier: 5,
        img: 'weapon-longsword.png',

        type: WeaponType.Longsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 3, max: 6, bonus: 5 },
        stats: {
            [StatType.ArmourPenetration]: 25
        }
    },

    // Greatswords
    greatsword0: {
        id: 'greatsword0',
        itemType: ItemType.Weapon,
        name: 'Greatsword',
        tier: 0,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 15
        }
    },
    greatsword1: {
        id: 'greatsword1',
        itemType: ItemType.Weapon,
        name: 'Greatsword +1',
        tier: 1,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 2 },
        stats: {
            [StatType.ArmourPenetration]: 19
        }
    },
    greatsword2: {
        id: 'greatsword2',
        itemType: ItemType.Weapon,
        name: 'Greatsword +2',
        tier: 2,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 4 },
        stats: {
            [StatType.ArmourPenetration]: 23
        }
    },
    greatsword3: {
        id: 'greatsword3',
        itemType: ItemType.Weapon,
        name: 'Greatsword +3',
        tier: 3,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 6 },
        stats: {
            [StatType.ArmourPenetration]: 27
        }
    },
    greatsword4: {
        id: 'greatsword4',
        itemType: ItemType.Weapon,
        name: 'Greatsword +4',
        tier: 4,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 5, max: 9, bonus: 8 },
        stats: {
            [StatType.ArmourPenetration]: 31
        }
    },
    greatsword5: {
        id: 'greatsword5',
        itemType: ItemType.Weapon,
        name: 'Greatsword +5',
        tier: 5,
        img: 'weapon-greatsword.png',

        type: WeaponType.Greatsword,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 9, bonus: 10 },
        stats: {
            [StatType.ArmourPenetration]: 35
        }
    },

    // Daggers
    dagger0: {
        id: 'dagger0',
        itemType: ItemType.Weapon,
        name: 'Dagger',
        tier: 0,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 0 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger1: {
        id: 'dagger1',
        itemType: ItemType.Weapon,
        name: 'Dagger +1',
        tier: 1,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 1 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger2: {
        id: 'dagger2',
        itemType: ItemType.Weapon,
        name: 'Dagger +2',
        tier: 2,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 2 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger3: {
        id: 'dagger3',
        itemType: ItemType.Weapon,
        name: 'Dagger +3',
        tier: 3,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 3 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger4: {
        id: 'dagger4',
        itemType: ItemType.Weapon,
        name: 'Dagger +4',
        tier: 4,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 4 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    dagger5: {
        id: 'dagger5',
        itemType: ItemType.Weapon,
        name: 'Dagger +5',
        tier: 5,
        img: 'weapon-dagger.png',

        type: WeaponType.Dagger,
        attackType: AttackType.Melee,
        light: true,
        twoHanded: false,
        damageType: DamageType.Physical,
        damageRange: { min: 2, max: 5, bonus: 5 },
        stats: {
            [StatType.CriticalChance]: 5
        }
    },
    // Staves
    quarterstaff0: {
        id: 'quarterstaff0',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff',
        tier: 0,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 0 },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff1: {
        id: 'quarterstaff1',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +1',
        tier: 1,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 2 },
        attributes: {
            [AttributeType.Wisdom]: 1
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff2: {
        id: 'quarterstaff2',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +2',
        tier: 2,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 4 },
        attributes: {
            [AttributeType.Wisdom]: 2
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff3: {
        id: 'quarterstaff3',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +3',
        tier: 3,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 6 },
        attributes: {
            [AttributeType.Wisdom]: 3
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff4: {
        id: 'quarterstaff4',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +4',
        tier: 4,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 8 },
        attributes: {
            [AttributeType.Wisdom]: 4
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    quarterstaff5: {
        id: 'quarterstaff5',
        itemType: ItemType.Weapon,
        name: 'Quarterstaff +5',
        tier: 5,
        img: 'weapon-quarterstaff.png',

        type: WeaponType.Quarterstaff,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 4, max: 8, bonus: 10 },
        attributes: {
            [AttributeType.Wisdom]: 5
        },
        stats: {
            [StatType.ManaRegen]: 2
        }
    },
    // Wands
    wand0: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand',
        tier: 0,
        img: 'weapon-wand.png',

        type: WeaponType.Wand,
        attackType: AttackType.Spell,
        light: false,
        twoHanded: false,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 0 },
        spellPowerRatio: 0.1,
        stats: {
            [StatType.SpellPower]: 5 
        }
    },
    wand1: {
        id: 'wand1',
        itemType: ItemType.Weapon,
        name: 'Wand +1',
        tier: 1,
        img: 'weapon-wand.png',
        
        type: WeaponType.Wand,
        attackType: AttackType.Spell,
        light: false,
        twoHanded: false,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 1 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 1
        },
        stats: {
            [StatType.SpellPower]: 5 
        }
    },
    wand2: {
        id: 'wand2',
        itemType: ItemType.Weapon,
        name: 'Wand +2',
        tier: 2,
        img: 'weapon-wand.png',
        
        type: WeaponType.Wand,
        attackType: AttackType.Spell,
        light: false,
        twoHanded: false,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 2 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 2
        },
        stats: {
            [StatType.SpellPower]: 5 
        }
    },
    wand3: {
        id: 'wand3',
        itemType: ItemType.Weapon,
        name: 'Wand +3',
        tier: 3,
        img: 'weapon-wand.png',
        
        type: WeaponType.Wand,
        attackType: AttackType.Spell,
        light: false,
        twoHanded: false,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 3 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 3
        },
        stats: {
            [StatType.SpellPower]: 5 
        }
    },
    wand4: {
        id: 'wand4',
        itemType: ItemType.Weapon,
        name: 'Wand +4',
        tier: 4,
        img: 'weapon-wand.png',
        
        type: WeaponType.Wand,
        attackType: AttackType.Spell,
        light: false,
        twoHanded: false,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 4 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 4
        },
        stats: {
            [StatType.SpellPower]: 5 
        }
    },
    wand5: {
        id: 'wand0',
        itemType: ItemType.Weapon,
        name: 'Wand +5',
        tier: 5,
        img: 'weapon-wand.png',
        
        type: WeaponType.Wand,
        attackType: AttackType.Spell,
        light: false,
        twoHanded: false,
        damageType: DamageType.Magic,
        damageRange: { min: 1, max: 3, bonus: 5 },
        spellPowerRatio: 0.1,
        attributes: {
            [AttributeType.Intelligence]: 5
        },
        stats: {
            [StatType.SpellPower]: 5 
        }
    },
    // NPC Weapons
    // Poison Bite
    poisonbite0: {
        id: 'poisonbite0',
        itemType: ItemType.Weapon,
        name: 'Poison Bite',
        tier: 0,
        img: '',

        type: WeaponType.Unarmed,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 1, max: 3, bonus: 0 },
        onHit: {
            func: (self: Character, target: Character) => {
                target.statusEffectManager.addDebuff(DebuffId.Poison, self, 2);
            },
            description: 'Inflict 1 Poison on hit.'
        }
    },
    poisonbite1: {
        id: 'poisonbite1',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +1',
        tier: 1,
        img: '',
        
        type: WeaponType.Unarmed,
        attackType: AttackType.Melee,
        light: false,
        twoHanded: true,
        damageType: DamageType.Physical,
        damageRange: { min: 1, max: 3, bonus: 1 },
        onHit: {
            func: (self: Character, target: Character) => {
                target.statusEffectManager.addDebuff(DebuffId.Poison, self, 2);
            },
            description: 'Inflict 2 Poison on hit.'
        }
    }
} as const;

export { WeaponType, AttackType, Weapon, WeaponId, weapons };