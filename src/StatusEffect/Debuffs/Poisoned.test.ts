import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import DebuffId from '../DebuffId';
import Poisoned from './Poisoned';

let char: Character;
let target: Character;

beforeEach(() => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.ArmourPenetration]: { base: 10 },
            [StatType.DamagePercent]: { base: 1 }
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

// Poisoned damage is (1 + 1% current health) * stacks
test('Poisoned - 0 stacks', () => {
    target.statusEffectManager.addDebuff(new Poisoned({
        char: target,
        source: char,
        stacks: 0
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(100);
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]).toBeUndefined();
});


test('Poisoned - 1 stacks', () => {
    target.statusEffectManager.addDebuff(new Poisoned({
        char: target,
        source: char,
        stacks: 1
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBeCloseTo(96); // 100 - ((1 + 1% * 100) * 2 = 4) = 96
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)]).toBeUndefined();
});

test('Poisoned - 2 stacks', () => {
    target.statusEffectManager.addDebuff(new Poisoned({
        char: target,
        source: char,
        stacks: 2
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBeCloseTo(92); // 100 - ((2 + 2% * 100) * 2 = 8) = 92
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)].stacks).toBe(1);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBeCloseTo(88.16); // 92 - ((1 + 1% * 92) * 2 = 3.84) = 88.16
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)]).toBeUndefined();
});

test('Poisoned - 10 stacks', () => {
    target.statusEffectManager.addDebuff(new Poisoned({
        char: target,
        source: char,
        stacks: 10
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBeCloseTo(60); // 100 - ((10 + 10% * 100) * 2 = 40) = 60
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)].stacks).toBe(9);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBeCloseTo(31.2); // 60 - ((9 + 9% * 60) * 2= 28.8) = 31.2
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)].stacks).toBe(8);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBeCloseTo(10.208); // 31.2 - ((8 + 8% * 31.2) * 2 = 20.992) = 10.208
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)].stacks).toBe(7);
});