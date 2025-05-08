import { createTestCharacter } from '../../tests/util';
import StatType from '../Stats/StatType';
import Attributes from './Attributes';
import AttributeStatScaling from './AttributeStatScaling';
import AttributeType from './AttributeType';

describe('Single Attribute', () => {
    test('20 STR', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Strength]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Strength])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo((num - Attributes.DEFAULT_VALUE) * scaling);
        }
    });

    test('20 DEX', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Dexterity]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Dexterity])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo((num - Attributes.DEFAULT_VALUE) * scaling);
        }
    });

    test('20 PER', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Perception]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Perception])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo((num - Attributes.DEFAULT_VALUE) * scaling);
        }
    });

    test('20 CON', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Constitution]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Constitution])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo((num - Attributes.DEFAULT_VALUE) * scaling);
        }
    });

    test('20 INT', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Intelligence]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Intelligence])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo((num - Attributes.DEFAULT_VALUE) * scaling);
        }
    });

    test('20 WIS', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Wisdom]: num
            }
        });

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Wisdom])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo((num - Attributes.DEFAULT_VALUE) * scaling);
        }
    });
});

describe('Overlapping Attributes', () => {
    test('20 STR, 20 DEX - DamagePercent', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Strength]: num,
                [AttributeType.Dexterity]: num,
            }
        });

        expect(char.stats[StatType.DamagePercent].attribute).toBeCloseTo(
            (AttributeStatScaling.Strength[StatType.DamagePercent] ?? 0) * (num - Attributes.DEFAULT_VALUE) +
            (AttributeStatScaling.Dexterity[StatType.DamagePercent] ?? 0) * (num - Attributes.DEFAULT_VALUE)
        );
    });

    test('20 DEX, 20 WIS - Initiative', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Dexterity]: num,
                [AttributeType.Wisdom]: num,
            }
        });

        expect(char.stats[StatType.Initiative].attribute).toBeCloseTo(
            (AttributeStatScaling.Dexterity[StatType.Initiative] ?? 0) * (num - Attributes.DEFAULT_VALUE) +
            (AttributeStatScaling.Wisdom[StatType.Initiative] ?? 0) * (num - Attributes.DEFAULT_VALUE)
        );
    });

    test('20 INT, 20 WIS - ManaOnHit', () => {
        const num = 20;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Intelligence]: num,
                [AttributeType.Wisdom]: num,
            }
        });

        expect(char.stats[StatType.ManaOnHit].attribute).toBeCloseTo(
            (AttributeStatScaling.Intelligence[StatType.ManaOnHit] ?? 0) * (num - Attributes.DEFAULT_VALUE) +
            (AttributeStatScaling.Wisdom[StatType.ManaOnHit] ?? 0) * (num - Attributes.DEFAULT_VALUE)
        );
    });
});