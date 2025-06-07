import Battle from '../Battle/Battle';
import AttributeType from '../Character/Attributes/AttributeType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import BuffId from '../StatusEffect/types/BuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Vanish from './Vanish';

let char: Character;

test('Vanish - 0 Dexterity', () => {
    char = createTestCharacter({
        level: 10,
        attributes: {
            [AttributeType.Dexterity]: 5
        },
        statTemplate: {
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 }
        }
    });
    new Battle([char], []);

    Vanish.func(char);
    expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(4); // 1 + 4 - 1 = 4
    expect(char.isInvisible()).toBe(true);
    expect(char.currentMana).toBe(50);
});

test('Vanish - 10 Dexterity', () => {
    char = createTestCharacter({
        level: 10,
        attributes: {
            [AttributeType.Dexterity]: 10
        },
        statTemplate: {
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 }
        }
    });
    new Battle([char], []);

    Vanish.func(char);
    expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(5); // 1 + 4 + 0 = 5
    expect(char.isInvisible()).toBe(true);
    expect(char.currentMana).toBe(50);
});

test('Vanish - 20 Dexterity', () => {
    char = createTestCharacter({
        level: 10,
        attributes: {
            [AttributeType.Dexterity]: 20
        },
        statTemplate: {
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 }
        }
    });
    new Battle([char], []);

    Vanish.func(char);
    expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(7); // 1 + 4 + 2 = 7
    expect(char.isInvisible()).toBe(true);
    expect(char.currentMana).toBe(50);
});

test('Vanish - 100 Dexterity', () => {
    char = createTestCharacter({
        level: 10,
        attributes: {
            [AttributeType.Dexterity]: 100
        },
        statTemplate: {
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 }
        }
    });
    new Battle([char], []);

    Vanish.func(char);
    expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(23); // 1 + 4 + 18 = 23
    expect(char.isInvisible()).toBe(true);
    expect(char.currentMana).toBe(50);
});