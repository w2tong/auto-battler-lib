import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import DebuffId from '../StatusEffect/types/DebuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Firebolt from './Firebolt';

let char: Character;
let target: Character;

beforeEach(() => {
    char = createTestCharacter({
        level: 10,
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.SpellPower]: { base: 100 },
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 }
        }
    });

    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 }
        }
    });

    char.target = target;
    new Battle([char], [target]);
});

let mathRandomSpy: jest.SpyInstance;
beforeEach(() => {
    mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
afterEach(() => {
    mathRandomSpy.mockRestore();
});

let hitRollSpy: jest.SpyInstance;
beforeEach(() => {
    hitRollSpy = jest.spyOn(Character.prototype, 'hitRoll');
});
afterEach(() => {
    hitRollSpy.mockRestore();
});

test('Firebolt Hit', () => {
    hitRollSpy.mockReturnValue(true);
    Firebolt.func(char);
    expect(target.currentHealth).toBe(62);
    expect(char.currentMana).toBe(50);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)].stacks).toBe(2);
});

test('Firebolt Miss', () => {
    hitRollSpy.mockReturnValue(false);
    Firebolt.func(char);
    expect(target.currentHealth).toBe(100);
    expect(char.currentMana).toBe(50);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
});

test('Firebolt No Target', () => {
    char.target = null;
    Firebolt.func(char);
    expect(target.currentHealth).toBe(100);
    expect(char.currentMana).toBe(100);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
});