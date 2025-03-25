import { damageRoll } from './DamageRange';

let mathRandomSpy: jest.SpyInstance;
afterEach(() => {
    mathRandomSpy.mockRestore();
});

describe('damageRoll', () => {
    test('Math.random 0', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(2);
    });
    test('Math.random 0.49', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.49);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(6);
    });
    test('Math.random 0.5', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(7);
    });
    test('Math.random 0.9999', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(11);
    });
});