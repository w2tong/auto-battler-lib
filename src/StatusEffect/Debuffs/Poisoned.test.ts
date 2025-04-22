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

// Poison damage is (1 + 1% current health) * stacks
test('Poison - 0 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Poisoned, char, 0);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(100);
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]).toBeUndefined();
});


test('Poison - 1 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Poisoned, char, 1);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(98); // 100 - (1 + 1% * 100 = 2) = 98
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]!.instances[getCharBattleId(char)]).toBeUndefined();
});

test('Poison - 2 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Poisoned, char, 2);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(96); // 100 - (2 + 2% * 100 = 4) = 96
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]!.instances[getCharBattleId(char)].stacks).toBe(1);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(94.04); // 96 - (1 + 1% * 96 = 1.96) = 94.04
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]!.instances[getCharBattleId(char)]).toBeUndefined();
});

test('Poison - 10 stacks', () => {
    target.statusEffectManager.addDebuff(DebuffId.Poisoned, char, 10);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(80); // 100 - (10 + 10% * 100 = 20) = 80
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]!.instances[getCharBattleId(char)].stacks).toBe(9);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(63.8); // 80 - (9 + 9% * 80 = 16.2) = 63.8
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]!.instances[getCharBattleId(char)].stacks).toBe(8);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(50.696); // 63.8 - (8 + 8% * 63.8 = 13.104) = 50.696
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]!.instances[getCharBattleId(char)].stacks).toBe(7);
});