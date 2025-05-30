// TODO: add tests
// 0 damage bleed
// test multiple damages and stacks
// add more dmg and stacks
// e.g. 100 dmg 1 stack = 100dmg per tick
// e.g. 100 dmg 2 stacks = 50dmg per tick

import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import Bleeding from './Bleeding';

let char: Character;
beforeEach(() => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 }
        }
    });

    new Battle([char], []);
});

test('10 remaining damage, 1 stack', () => {
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 1,
        remainingDamage: 10
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(90);
});

test('20 remaining damage, 2 stacks', () => {
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 2,
        remainingDamage: 20
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(90);
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(80);
});

test('10 + 20 remaining damage, 1 + 1 stacks', () => {
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 1,
        remainingDamage: 10
    }));
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 1,
        remainingDamage: 20
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(85);
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(70);
});

test('20 + 30 remaining damage, 2 + 1 stacks', () => {
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 2,
        remainingDamage: 20
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(90);
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 1,
        remainingDamage: 30
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(70);
});

test('0 remaining damage, 1 stack', () => {
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 1,
        remainingDamage: 0
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(100);
});

test('0 remaining damage, 3 stack', () => {
    char.statusEffectManager.addDebuff(new Bleeding({
        char,
        source: char,
        stacks: 3,
        remainingDamage: 0
    }));
    char.statusEffectManager.turnEnd();
    expect(char.currentHealth).toBe(100);
});