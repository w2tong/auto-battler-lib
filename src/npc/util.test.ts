import { calculateBaseAttributes } from './util';
import Attributes from '../Character/Attributes/Attributes';
import AttributeType from '../Character/Attributes/AttributeType';

describe('calculateBaseAttributes', () => {
    it('rounds down non-integer base values', () => {
        const template = {
            [AttributeType.Strength]: { base: 5.9, perLvl: 0 },
        };
        const result = calculateBaseAttributes(template, 1);
        expect(result[AttributeType.Strength]).toBe(5); // Math.floor(5.9)
    });

    it('rounds down non-integer perLvl values', () => {
        const template = {
            [AttributeType.Dexterity]: { base: 2, perLvl: 1.7 },
        };
        // Math.floor(2) + (1.7 - 1) * 3 = 2 + 0.7 * 3 = 2 + 2.1 = 4.1
        const result = calculateBaseAttributes(template, 3);
        expect(result[AttributeType.Dexterity]).toBeCloseTo(4.1);
    });

    it('uses Attributes.DEFAULT_VALUE if base is missing', () => {
        const template = {
            [AttributeType.Intelligence]: { perLvl: 2 },
        };
        const result = calculateBaseAttributes(template, 2);
        expect(result[AttributeType.Intelligence]).toBe(Math.floor(Attributes.DEFAULT_VALUE) + (2 - 1) * 2);
    });

    it('does not add level scaling if perLvl is missing', () => {
        const template = {
            [AttributeType.Wisdom]: { base: 7.8 },
        };
        const result = calculateBaseAttributes(template, 5);
        expect(result[AttributeType.Wisdom]).toBe(7); // Math.floor(7.8)
    });

    it('works with integer base and perLvl', () => {
        const template = {
            [AttributeType.Perception]: { base: 3, perLvl: 2 },
        };
        const result = calculateBaseAttributes(template, 4);
        // Math.floor(3) + (2 - 1) * 4 = 3 + 1 * 4 = 7
        expect(result[AttributeType.Perception]).toBe(7);
    });
});
