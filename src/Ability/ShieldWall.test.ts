import ShieldWall from './ShieldWall';
import Character from '../Character/Character';
import Battle from '../Battle/Battle';
import StatType from '../Character/Stats/StatType';
import { createTestCharacter } from '../tests/util';
import BuffId from '../StatusEffect/types/BuffId';
import { getCharBattleId } from '../util';

let char: Character;
beforeEach(() => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.ManaCost]: { base: 50 },
            [StatType.StartingMana]: { base: 100 },
        }
    });

    new Battle([char], []);
});

test('adds 3 stacks of ShieldWall buff, and adds to log', () => {
    expect(char.currentMana).toBe(100);
    ShieldWall.func(char);
    expect(char.currentMana).toBe(50);
    expect(char.statusEffectManager.buffs[BuffId.ShieldWall]![getCharBattleId(char)].stacks).toBe(3);
    expect(char.battle?.ref.log.last[0]).toEqual({ text: ' used Shield Wall.', type: 'Text' });
});

