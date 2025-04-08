import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import BuffId from '../StatusEffect/BuffId';
import { getCharBattleId } from '../util';
import Bless from './Bless';

let char: Character;

beforeEach(() => {
    char = new Character({
        name: 'Test',
        level: 0,
        attributes: {},
        statTemplate: {
            [StatType.Damage]: { base: 0, perLvl: 0 },
            [StatType.HitChance]: { base: 0, perLvl: 0 },
        },
        equipment: {}
    });

    new Battle([char], []);
});

test('Bless - 1 target', () => {
    Bless.func(char);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(3);
});