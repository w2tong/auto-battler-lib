import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import * as diceModule from '../dice';
import DebuffId from '../StatusEffect/types/DebuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Frostbolt from './Frostbolt';

let char: Character;
let target: Character;

beforeEach(() => {
    char = createTestCharacter({
        level: 11,
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

describe('Frostbolt Damage and Debuff', () => {
    let mathRandomSpy: jest.SpyInstance;
    let rollDiceSpy: jest.SpyInstance;
    let hitRollSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        rollDiceSpy = jest.spyOn(diceModule, 'rollDice');
        hitRollSpy = jest.spyOn(Character.prototype, 'hitRoll');
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
        hitRollSpy.mockRestore();
    });

    test('Frostbolt Miss', () => {
        hitRollSpy.mockReturnValue(false);

        Frostbolt.func(char);
        expect(target.currentHealth).toBe(100);
        expect(char.currentMana).toBe(50);
        expect(target.statusEffectManager.debuffs[DebuffId.Frozen]).toBeUndefined();
    });

    test('Frostbolt Hit, No Freeze', () => {
        hitRollSpy.mockReturnValue(true);
        rollDiceSpy.mockReturnValue(51);

        Frostbolt.func(char);
        expect(target.currentHealth).toBe(47); // 100 - (2 to 4 + 100 * 0.5 = 53) = 47
        expect(char.currentMana).toBe(50);
        expect(target.statusEffectManager.debuffs[DebuffId.Frozen]).toBeUndefined();
    });

    test('Frostbolt Hit, Freeze', () => {
        hitRollSpy.mockReturnValue(true);
        rollDiceSpy.mockReturnValue(50);

        Frostbolt.func(char);
        expect(target.currentHealth).toBe(47); // 100 - (2 to 4 + 100 * 0.5 = 53) = 47
        expect(char.currentMana).toBe(50);
        expect(target.statusEffectManager.debuffs[DebuffId.Frozen]![getCharBattleId(char)].stacks).toBe(1);
    });

    test('Frostbolt No Target', () => {
        char.target = null;

        Frostbolt.func(char);
        expect(target.currentHealth).toBe(100);
        expect(char.currentMana).toBe(100);
        expect(target.statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
    });
});

describe('Frostbolt Damage and Debuff', () => {
    test('No Character', () => {
        expect(Frostbolt.description()).toBe(
            'Deals damage to your target, with a 50% chance of applying 1 Frozen, preventing them from acting for 1 turn.'
        );
    });
    test('With Character', () => {
        expect(Frostbolt.description(char)).toBe(
            'Deals 52-54 damage to your target, with a 50% chance of applying 1 Frozen, preventing them from acting for 1 turn.'
        );
    });
});