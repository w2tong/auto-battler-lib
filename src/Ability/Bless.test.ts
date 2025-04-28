import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import BuffId from '../StatusEffect/BuffId';
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