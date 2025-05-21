import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import DebuffId from '../DebuffId';

let char: Character;
let target: Character;

beforeEach(() => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.SpellPower]: { base: 100 },
            [StatType.ArmourPenetration]: { base: 10 },
        }
    });
    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Armour]: { base: 60 }
        }
    });
    new Battle([char], [target]);
});

// Burning damage (1 + 100 * 0.2) / 2 = 10.5
test('Burning - 0 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Burning, char, 0);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(100);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
});

test('Burning - 1 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Burning, char, 1);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(89.5);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)]).toBeUndefined();
});

test('Burning - 2 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Burning, char, 2);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(89.5);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)].stacks).toBe(1);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(79);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)]).toBeUndefined();
});