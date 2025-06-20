import Battle from '../Battle/Battle';
import AttributeType from '../Character/Attributes/AttributeType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import Invisible from '../StatusEffect/Buffs/Invisible';
import BuffId from '../StatusEffect/types/BuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import Vanish from './Vanish';

let char: Character;

describe('Vanish Invisible Stacks', () => {
    test('Vanish - 5 Dexterity', () => {
        char = createTestCharacter({
            level: 11,
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
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(4); // 1 + 5 - 2 = 4
        expect(char.isInvisible()).toBe(true);
        expect(char.currentMana).toBe(50);
    });

    test('Vanish - 10 Dexterity', () => {
        char = createTestCharacter({
            level: 11,
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
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(6); // 1 + 5 + 0 = 6
        expect(char.isInvisible()).toBe(true);
        expect(char.currentMana).toBe(50);
    });

    test('Vanish - 20 Dexterity', () => {
        char = createTestCharacter({
            level: 11,
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
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10); // 1 + 5 + 4 = 10
        expect(char.isInvisible()).toBe(true);
        expect(char.currentMana).toBe(50);
    });

    test('Vanish - 100 Dexterity', () => {
        char = createTestCharacter({
            level: 11,
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
        // 1 + 5 + 36 = 42
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(42);
        expect(char.isInvisible()).toBe(true);
        expect(char.currentMana).toBe(50);
    });
});

describe('Vanish Description', () => {
    char = createTestCharacter({
        level: 11,
        attributes: {
            [AttributeType.Dexterity]: 20
        }
    });
    test('No Character', () => {
        expect(Vanish.description()).toBe(
            `Gain ${Invisible.name}, causing your next attack to be a sneak attack, dealing ${Invisible.damage} damage per stack, or ${Invisible.damage * 1.5} if using a two-handed weapon.`
        );
    });
    test('With Character', () => {
        expect(Vanish.description(char)).toBe(
            `Gain 42 ${Invisible.name}, causing your next attack to be a sneak attack, dealing ${Invisible.damage} damage per stack, or ${Invisible.damage * 1.5} if using a two-handed weapon.`
        );
    });
});