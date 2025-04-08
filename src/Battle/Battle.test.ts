import AttackType from '../AttackType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import DamageType from '../DamageType';
import { ItemType } from '../Equipment/Item';
import { type Weapon, WeaponType } from '../Equipment/Weapon/Weapon';
import Battle, { Side } from './Battle';

const zeroDamageWeapon: Weapon = {
    id: 'longsword0',
    itemType: ItemType.Weapon,
    name: 'Longsword',
    tier: 0,
    img: 'weapon-longsword.png',
    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
    damageType: DamageType.Physical,
    damageRange: { min: 0, max: 0, bonus: 0 }
};

const testSword: Weapon = {
    id: 'longsword0',
    itemType: ItemType.Weapon,
    name: 'Longsword',
    tier: 0,
    img: 'weapon-longsword.png',
    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
    damageType: DamageType.Physical,
    damageRange: { min: 4, max: 4, bonus: 0 }
};

let mathRandomSpy: jest.SpyInstance;
beforeEach(() => {
    mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
afterEach(() => {
    mathRandomSpy.mockRestore();
});

describe('startCombat/turnOrder', () => {
    const left1 = new Character({
        name: 'Left 1',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 3 }
        },
        equipment: {}
    });
    const left2 = new Character({
        name: 'Left 2',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 2 }
        },
        equipment: {}
    });
    const left3 = new Character({
        name: 'Left 3',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 1 }
        },
        equipment: {}
    });
    const right1 = new Character({
        name: 'Right 1',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 0 }
        },
        equipment: {}
    });
    const right2 = new Character({
        name: 'Right 2',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: -1 }
        },
        equipment: {}
    });
    let battle: Battle;

    test('2 chars', () => {
        battle = new Battle([left1], [right1]);
        battle.startCombat();
        expect(battle.turnOrder).toStrictEqual([{ char: left1, init: 14 }, { char: right1, init: 11 }]);
    });
    test('3 chars', () => {
        battle = new Battle([left1, left2], [right1]);
        battle.startCombat();
        expect(battle.turnOrder).toStrictEqual([{ char: left1, init: 14 }, { char: left2, init: 13 }, { char: right1, init: 11 }]);
    });
    test('4 chars', () => {
        battle = new Battle([left1, left2], [right1, right2]);
        battle.startCombat();
        expect(battle.turnOrder).toStrictEqual([{ char: left1, init: 14 }, { char: left2, init: 13 }, { char: right1, init: 11 }, { char: right2, init: 10 }]);
    });
    test('5 chars', () => {
        battle = new Battle([left1, left2, left3], [right1, right2]);
        battle.startCombat();
        expect(battle.turnOrder).toStrictEqual([{ char: left1, init: 14 }, { char: left2, init: 13 }, { char: left3, init: 12 }, { char: right1, init: 11 }, { char: right2, init: 10 }]);
    });
});

describe('turnIndex', () => {
    let left1: Character;
    let left2: Character;
    let right1: Character;
    let right2: Character;
    let battle: Battle;

    beforeEach(() => {
        left1 = new Character({
            name: 'Left 1',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.Initiative]: { base: 1 }
            },
            equipment: {
                mainHand: zeroDamageWeapon
            }
        });
        left2 = new Character({
            name: 'Left 1',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.Initiative]: { base: 2 }
            },
            equipment: {
                mainHand: zeroDamageWeapon
            }
        });
        right1 = new Character({
            name: 'Right 1',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.Initiative]: { base: 0 }
            },
            equipment: {
                mainHand: zeroDamageWeapon
            }
        });
        right2 = new Character({
            name: 'Right 1',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.Initiative]: { base: -1 }
            },
            equipment: {
                mainHand: zeroDamageWeapon
            }
        });
    });

    test('2 chars', () => {
        battle = new Battle([left1], [right1]);
        battle.startCombat();

        expect(battle.turnOrder).toStrictEqual([{ char: left1, init: 12 }, { char: right1, init: 11 }]);
        expect(battle.turnIndex).toBe(-1);

        battle.nextTurn();
        expect(battle.turnIndex).toBe(0);

        battle.setCharDead(Side.Left, 0);
        expect(battle.turnIndex).toBe(-1);

        battle.nextTurn();
        expect(battle.turnIndex).toBe(-1);
    });

    test('4 chars', () => {
        battle = new Battle([left1, left2], [right1, right2]);
        battle.startCombat();

        expect(battle.turnOrder).toStrictEqual([{ char: left2, init: 13 }, { char: left1, init: 12 }, { char: right1, init: 11 }, { char: right2, init: 10 }]);
        expect(battle.turnIndex).toBe(-1);

        battle.nextTurn();
        battle.nextTurn();
        expect(battle.turnIndex).toBe(1);

        battle.setCharDead(Side.Left, 0);
        expect(battle.turnIndex).toBe(0);

        battle.nextTurn();
        expect(battle.turnIndex).toBe(1);
        expect(battle.turnOrder[1].char).toBe(right1);

        battle.nextTurn();
        expect(battle.turnIndex).toBe(2);

        battle.setCharDead(Side.Right, 1);
        expect(battle.turnIndex).toBe(1);
        expect(battle.turnOrder[1].char).toBe(right1);
    });
});

describe('nextTurn', () => {
    let left1: Character;
    let right1: Character;
    let battle: Battle;

    beforeEach(() => {
        left1 = new Character({
            name: 'Left 1',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Dodge]: { base: 0 },
                [StatType.Initiative]: { base: 1 }
            },
            equipment: {
                mainHand: testSword
            }
        });
        right1 = new Character({
            name: 'Right 1',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Dodge]: { base: 0 }
            },
            equipment: {
                mainHand: testSword
            }
        });

        battle = new Battle([left1], [right1]);
        battle.startCombat();
    });

    test('1v1 full fight', () => {
        let res;

        // left1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(16);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(16);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(12);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(12);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(8);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(8);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(4);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(4);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(0);

        // Battle over
        res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: true, winner: Side.Left });
    });

    test('Result: Tie', () => {
        left1.takeDamage({
            source: '',
            damage: left1.currentHealth,
            armourPenetration: 0,
        });
        right1.takeDamage({
            source: '',
            damage: right1.currentHealth,
            armourPenetration: 0,
        });
        const res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: true, winner: Side.Tie });
    });

    test('Result: Left Win', () => {
        right1.takeDamage({
            source: '',
            damage: right1.currentHealth,
            armourPenetration: 0,
        });
        const res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: true, winner: Side.Left });
    });

    test('Result: Right Win', () => {
        left1.takeDamage({
            source: '',
            damage: left1.currentHealth,
            armourPenetration: 0,
        });
        const res = battle.nextTurn();
        expect(res).toStrictEqual({ combatEnded: true, winner: Side.Right });
    });
});

describe('getAliveTargets', () => {
    const left1 = new Character({
        name: 'Left 1',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 1 }
        },
        equipment: {}
    });
    const left2 = new Character({
        name: 'Left 2',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 2 }
        },
        equipment: {}
    });
    const right1 = new Character({
        name: 'Right 1',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: 0 }
        },
        equipment: {}
    });
    const right2 = new Character({
        name: 'Right 2',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Initiative]: { base: -1 }
        },
        equipment: {}
    });
    let battle: Battle;

    beforeEach(() => {
        battle = new Battle([left1, left2], [right1, right2]);
    });

    test('Left Side, 2 alive', () => {
        const targets = battle.getAliveTargets(Side.Left);
        expect(targets).toStrictEqual([left1, left2]);
    });
    test('Left Side, 1 alive', () => {
        battle.setCharDead(Side.Left, 0);
        const targets = battle.getAliveTargets(Side.Left);
        expect(targets).toStrictEqual([left2]);
    });
    test('Left Side, 0 alive', () => {
        battle.setCharDead(Side.Left, 0);
        battle.setCharDead(Side.Left, 1);
        const targets = battle.getAliveTargets(Side.Left);
        expect(targets).toStrictEqual([]);
    });

    test('Right Side, 2 alive', () => {
        const targets = battle.getAliveTargets(Side.Right);
        expect(targets).toStrictEqual([right1, right2]);
    });
    test('Right Side, 1 alive', () => {
        battle.setCharDead(Side.Right, 1);
        const targets = battle.getAliveTargets(Side.Right);
        expect(targets).toStrictEqual([right1]);
    });
    test('Right Side, 0 alive', () => {
        battle.setCharDead(Side.Right, 0);
        battle.setCharDead(Side.Right, 1);
        const targets = battle.getAliveTargets(Side.Right);
        expect(targets).toStrictEqual([]);
    });
});