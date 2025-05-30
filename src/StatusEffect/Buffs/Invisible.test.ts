import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import BuffId from '../types/BuffId';
import Invisible from './Invisible';

let char: Character;
let source1: Character;
let source2: Character;

beforeEach(() => {
    char = createTestCharacter({});
    source1 = createTestCharacter({});
    source2 = createTestCharacter({});
    new Battle([char, source1, source2], []);
});

describe('Invisible - 1 source', () => {
    test('0 stacks', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 0
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toBeUndefined();
    });

    test('1 stack', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 1
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('10 stack', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 10
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('100 stack', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 100
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(100);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });
});

describe('Invisible - 2 sources', () => {
    test('Invisible - 1 stack each', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 1
        }));
        char.statusEffectManager.add(new Invisible({
            char,
            source: source1,
            stacks: 1
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('Invisible - 10 stacks each', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 10
        }));
        char.statusEffectManager.add(new Invisible({
            char,
            source: source1,
            stacks: 10
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });
});

describe('Invisible - 3 sources', () => {
    test('Invisible - 1 stack each', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 1
        }));
        char.statusEffectManager.add(new Invisible({
            char,
            source: source1,
            stacks: 1
        }));
        char.statusEffectManager.add(new Invisible({
            char,
            source: source2,
            stacks: 1
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source2)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('Invisible - 10 stacks each', () => {
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks: 10
        }));
        char.statusEffectManager.add(new Invisible({
            char,
            source: source1,
            stacks: 10
        }));
        char.statusEffectManager.add(new Invisible({
            char,
            source: source2,
            stacks: 10
        }));
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source2)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });
});