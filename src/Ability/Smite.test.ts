import Battle from '../Battle/Battle';
import AttributeType from '../Character/Attributes/AttributeType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import DebuffId from '../StatusEffect/types/DebuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Smite from './Smite';

let char: Character;
let target: Character;

beforeEach(() => {
    char = createTestCharacter({
        level: 11,
        attributes: {
            [AttributeType.Wisdom]: 20
        },
        statTemplate: {
            [StatType.SpellPower]: { base: 100, perLvl: 0 },
        }
    });
    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100, perLvl: 0 },
        }
    });

    char.target = target;
    new Battle([char], [target]);
});

describe('Smite Damage and Debuff', () => {
    let mathRandomSpy: jest.SpyInstance;
    let hitRollSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        hitRollSpy = jest.spyOn(Character.prototype, 'hitRoll');
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
        hitRollSpy.mockRestore();
    });

    test('Miss', () => {
        hitRollSpy.mockReturnValue(false);
        Smite.func(char);
        expect(target.currentHealth).toBe(100);
        expect(target.statusEffectManager.debuffs[DebuffId.Smote]).toBeUndefined();

    });
    test('Hit', () => {
        hitRollSpy.mockReturnValue(true);
        Smite.func(char);
        expect(target.currentHealth).toBe(47); // 100 - (2 to 4 + 100 * 0.5 = 53) = 47
        expect(target.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(2);
    });
});

describe('Smite Description', () => {
    test('No Character', () => {
        expect(Smite.description()).toBe(
            'Deals damage to the target and reduces their Accuracy and Damage for 2 turns.'
        );
    });
    test('With Character', () => {
        expect(Smite.description(char)).toBe(
            'Deals 52-54 damage to the target and reduces their Accuracy by 11 and Damage by 9 for 2 turns.'
        );
    });
});