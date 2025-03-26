import { damageRoll } from './DamageRange';

let mathRandomSpy: jest.SpyInstance;
afterEach(() => {
    mathRandomSpy.mockRestore();
});

describe('damageRoll', () => {
    test('Math.random 0, 1-10 + 1 = 2', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(2);
    });
    test('Math.random 0.49, 1-10 + 1 = 6', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.49);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(6);
    });
    test('Math.random 0.5, 1-10 + 1 = 7', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(7);
    });
    test('Math.random 0.9999, 1-10 + 1 = 11', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        const damageRange = { min: 1, max: 10, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(11);
    });

    test('Math.random 0, 5-5 + 1 = 6', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0);
        const damageRange = { min: 5, max: 5, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(6);
    });
    test('Math.random 0.49, 5-5 + 1 = 6', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.49);
        const damageRange = { min: 5, max: 5, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(6);
    });
    test('Math.random 0.5, 5-5 + 1 = 6', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        const damageRange = { min: 5, max: 5, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(6);
    });
    test('Math.random 0.9999, 5-5 + 1 = 6', () => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        const damageRange = { min: 5, max: 5, bonus: 1 };
        expect(damageRoll(damageRange)).toBe(6);
    });
});