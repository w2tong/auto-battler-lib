import AttackType from '../AttackType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import DamageType from '../DamageType';
import { ItemType } from '../Equipment/Item';
import { Weapon, WeaponType } from '../Equipment/Weapon';
import Battle, { Side } from './Battle';

let left1: Character;
let right1: Character;
let battle: Battle;

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

});

let mathRandomSpy: jest.SpyInstance;
beforeEach(() => {
    mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
afterEach(() => {
    mathRandomSpy.mockRestore();
});

test('startCombat', () => {
    battle.startCombat();
    expect(battle.turnOrder[0].char).toBe(left1);
    expect(battle.turnOrder[0].init).toBe(12);
    expect(battle.turnOrder[1].char).toBe(right1);
    expect(battle.turnOrder[1].init).toBe(11);
});

// TODO: add tests for turnIndex, and when chars die
// test('turnIndex', () => {

// });
describe('nextTurn', () => {
    test('1v1 full fight', () => {
        let res;
        battle.startCombat();

        // left1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(16);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(16);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(12);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(12);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(8);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(8);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(4);

        // right1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(left1.currentHealth).toBeCloseTo(4);

        // left1 attack
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: false });
        expect(right1.currentHealth).toBeCloseTo(0);

        // Battle over
        res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: true, winner: Side.Left });
    });

    test('Result: Tie', () => {
        battle.startCombat();
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
        expect(res).toEqual({ combatEnded: true, winner: Side.Tie });
    });

    test('Result: Left Win', () => {
        battle.startCombat();
        right1.takeDamage({
            source: '',
            damage: right1.currentHealth,
            armourPenetration: 0,
        });
        const res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: true, winner: Side.Left });
    });

    test('Result: Right Win', () => {
        battle.startCombat();
        left1.takeDamage({
            source: '',
            damage: left1.currentHealth,
            armourPenetration: 0,
        });
        const res = battle.nextTurn();
        expect(res).toEqual({ combatEnded: true, winner: Side.Right });
    });
});
