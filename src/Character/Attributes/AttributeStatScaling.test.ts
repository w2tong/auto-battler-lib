import { createTestCharacter } from '../../tests/util';
import StatType from '../Stats/StatType';
import AttributeStatScaling from './AttributeStatScaling';
import AttributeType from './AttributeType';
import BaseAttributes from './BaseAttributes';

describe('Single Attribute', () => {
    test('10 WEA', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.WeaponSkill]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.WeaponSkill])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 STR', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Strength]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Strength])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 DEX', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Dexterity]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Dexterity])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 PER', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Perception]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Perception])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 CON', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Constitution]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Constitution])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 INT', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Intelligence]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Intelligence])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 WIS', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Wisdom]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Wisdom])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });
});

describe('Overlapping Attributes', () => {
    test('10 STR, 10 DEX - MeleeWeaponDamagePercent', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Strength]: num,
                [AttributeType.Dexterity]: num,
            }
        });

        expect(char.stats[StatType.MeleeWeaponDamagePercent].attribute).toBeCloseTo((AttributeStatScaling.Strength[StatType.MeleeWeaponDamagePercent] ?? 0) * num + (AttributeStatScaling.Dexterity[StatType.MeleeWeaponDamagePercent] ?? 0) * num);
    });

    test('10 DEX, 10 WIS - Initiative', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Dexterity]: num,
                [AttributeType.Wisdom]: num,
            }
        });

        expect(char.stats[StatType.Initiative].attribute).toBeCloseTo((AttributeStatScaling.Dexterity[StatType.Initiative] ?? 0) * num + (AttributeStatScaling.Wisdom[StatType.Initiative] ?? 0) * num);
    });

    test('10 CON, 10 INT - Armour', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Constitution]: num,
                [AttributeType.Intelligence]: num,
            }
        });

        expect(char.stats[StatType.Armour].attribute).toBeCloseTo((AttributeStatScaling.Constitution[StatType.Armour] ?? 0) * num + (AttributeStatScaling.Intelligence[StatType.Armour] ?? 0) * num);
    });

    test('10 INT, 10 WIS - ManaOnHit', () => {
        const num = 10;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Intelligence]: num,
                [AttributeType.Wisdom]: num,
            }
        });

        expect(char.stats[StatType.ManaOnHit].attribute).toBeCloseTo((AttributeStatScaling.Intelligence[StatType.ManaOnHit] ?? 0) * num + (AttributeStatScaling.Wisdom[StatType.ManaOnHit] ?? 0) * num);
    });
});