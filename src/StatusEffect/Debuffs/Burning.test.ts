import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import DebuffId from '../types/DebuffId';
import Burning from './Burning';

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

// Burning damage: (2 + 100 * 0.12) * (60 - 10 armour = 0.5) = 7
test('Burning - 0 stacks', () => {
    target.statusEffectManager.add(new Burning({
        char: target,
        source: char,
        stacks: 0
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(100);
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
});

test('Burning - 1 stacks', () => {
    target.statusEffectManager.add(new Burning({
        char: target,
        source: char,
        stacks: 1
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(93); // 100 - 7 = 93
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)]).toBeUndefined();
});

test('Burning - 2 stacks', () => {
    target.statusEffectManager.add(new Burning({
        char: target,
        source: char,
        stacks: 2
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(93); // 100 - 7 = 93
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)].stacks).toBe(1);

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(86); // 93 - 7 = 86
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)]).toBeUndefined();
});

test('Burning - damagePercent increases burning damage', () => {
    // Give the source a 100% damagePercent bonus
    char = createTestCharacter({
        statTemplate: {
            [StatType.SpellPower]: { base: 100 },
            [StatType.ArmourPenetration]: { base: 10 },
            [StatType.DamagePercent]: { base: 1 }, // 100% more damage
        }
    });
    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Armour]: { base: 60 }
        }
    });
    new Battle([char], [target]);

    // Burning damage: (2 + 100 * 0.12) * 2 * (60 - 10 armour = 0.5) = 14
    target.statusEffectManager.add(new Burning({
        char: target,
        source: char,
        stacks: 1
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(86); // 100 - 14 = 86
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)]).toBeUndefined();
});

test('Burning - damagePercent negative reduces burning damage', () => {
    // Give the source a -50% damagePercent penalty
    char = createTestCharacter({
        statTemplate: {
            [StatType.SpellPower]: { base: 100 },
            [StatType.ArmourPenetration]: { base: 10 },
            [StatType.DamagePercent]: { base: -0.5 }, // -50% damage
        }
    });
    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Armour]: { base: 60 }
        }
    });
    new Battle([char], [target]);

    // Burning damage: (2 + 100 * 0.12) * 14 * 0.5 * (60 - 10 armour = 0.5) = 3.5
    target.statusEffectManager.add(new Burning({
        char: target,
        source: char,
        stacks: 1
    }));

    target.statusEffectManager.turnEnd();
    expect(target.currentHealth).toBe(96.5); // 100 - 3.5 = 96.5
    expect(target.statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(char)]).toBeUndefined();
});