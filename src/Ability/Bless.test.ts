import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import BuffId from '../StatusEffect/types/BuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Bless from './Bless';

let char: Character;

beforeEach(() => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.Damage]: { base: 0, perLvl: 0 },
            [StatType.Accuracy]: { base: 0, perLvl: 0 },
        }
    });

    new Battle([char], []);
});

test('Bless - 1 target', () => {
    Bless.func(char);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(3);
});

describe('Bless Description', () => {
    test('No Character', () => {
        expect(Bless.description()).toBe(
            'Increases Accuracy and Damage for 3 turns.'
        );
    });
    test('With Character', () => {
        expect(Bless.description(char)).toBe(
            'Increases Accuracy by 5 and Damage by 4 for 3 turns.'
        );
    });
});