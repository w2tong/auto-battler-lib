import AttackType from '../types/AttackType';
import Character from '../Character/Character';
import { PetId } from '../Character/Pet';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { ItemType } from '../Equipment/Item';
import { type Weapon, WeaponType } from '../Equipment/Weapon/Weapon';
import { createTestCharacter } from '../tests/util';
import Battle, { Side } from './Battle';

const testSword: Weapon = {
    id: 'longsword0',
    itemType: ItemType.Weapon,
    name: 'Longsword',
    tier: 0,

    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
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
    const left1 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 3 } } });
    const left2 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 2 } } });
    const left3 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 1 } } });
    const right1 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 0 } } });
    const right2 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: -1 } } });

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
        left1 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 1 } } });
        left2 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 2 } } });
        right1 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 0 } } });
        right2 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: -1 } } });
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
        left1 = createTestCharacter({
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Dodge]: { base: 0 },
                [StatType.Initiative]: { base: 1 }
            },
            equipment: {
                [EquipSlot.MainHand]: testSword
            }
        });
        right1 = createTestCharacter({
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Dodge]: { base: 0 }
            },
            equipment: {
                [EquipSlot.MainHand]: testSword
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
    const left1 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 1 } } });
    const left2 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 2 } } });
    const right1 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: 0 } } });
    const right2 = createTestCharacter({ statTemplate: { [StatType.Initiative]: { base: -1 } } });

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

describe('pets', () => {
    test('left 1 pet', () => {
        const char = createTestCharacter({ petId: PetId.Wolf });
        const battle = new Battle([char], []);
        expect(battle.left[0]).toBe(char);
        expect(battle.left[1]).toBe(char.pet);
    });
    test('left 2 pets, right 1 pet', () => {
        const left1 = createTestCharacter({ petId: PetId.Wolf });
        const left2 = createTestCharacter({ petId: PetId.Wolf });
        const right1 = createTestCharacter({ petId: PetId.Wolf });
        const battle = new Battle([left1, left2], [right1]);
        expect(battle.left[0]).toBe(left1);
        expect(battle.left[1]).toBe(left1.pet);
        expect(battle.left[2]).toBe(left2);
        expect(battle.left[3]).toBe(left2.pet);
        expect(battle.right[0]).toBe(right1);
        expect(battle.right[1]).toBe(right1.pet);
    });
});