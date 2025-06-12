import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import BuffId from '../StatusEffect/types/BuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Bless from './Bless';

let char1: Character;
let char2: Character;

beforeEach(() => {
    char1 = createTestCharacter({ name: 'Char1' });
    char2 = createTestCharacter({ name: 'Char2' });
});

describe('Bless Description', () => {
    let mathRandomSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random');
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
    });

    test('Bless - 1 target', () => {
        new Battle([char1], []);
        Bless.func(char1);
        expect(char1.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char1)].stacks).toBe(3);
    });
    test('Bless - 2 targets, Bless char1', () => {
        new Battle([char1, char2], []);
        mathRandomSpy.mockReturnValue(0);
        Bless.func(char1);
        expect(char1.battle?.ref.log.last[0]).toStrictEqual({ text: 'Char1 casted Bless on Char1.', type: 'Text' });
        expect(char1.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char1)].stacks).toBe(3);
    });
    test('Bless - 2 targets, Bless char2', () => {
        new Battle([char1, char2], []);
        mathRandomSpy.mockReturnValue(0.99);
        Bless.func(char1);
        expect(char1.battle?.ref.log.last[0]).toStrictEqual({ text: 'Char1 casted Bless on Char2.', type: 'Text' });
        expect(char2.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char1)].stacks).toBe(3);
    });
});

describe('Bless Description', () => {
    test('No Character', () => {
        expect(Bless.description()).toBe(
            'Increases Accuracy and Damage for 3 turns.'
        );
    });
    test('With Character', () => {
        expect(Bless.description(char1)).toBe(
            'Increases Accuracy by 10 and Damage by 2 for 3 turns.'
        );
    });
});