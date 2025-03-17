import { rollDice } from './dice';

describe('rollDice', () => {
    let mathRandomSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
    });

    test('1d2', () => {
        const result = rollDice({ num: 1, sides: 2 });
        expect(result).toBeCloseTo(2);
    });
    test('1d3', () => {
        const result = rollDice({ num: 1, sides: 3 });
        expect(result).toBeCloseTo(2);
    });
    test('1d4', () => {
        const result = rollDice({ num: 1, sides: 4 });
        expect(result).toBeCloseTo(3);
    });
    test('1d6', () => {
        const result = rollDice({ num: 1, sides: 6 });
        expect(result).toBeCloseTo(4);
    });
    test('1d8', () => {
        const result = rollDice({ num: 1, sides: 8 });
        expect(result).toBeCloseTo(5);
    });
    test('1d10', () => {
        const result = rollDice({ num: 1, sides: 10 });
        expect(result).toBeCloseTo(6);
    });
    test('1d12', () => {
        const result = rollDice({ num: 1, sides: 12 });
        expect(result).toBeCloseTo(7);
    });
    test('1d20', () => {
        const result = rollDice({ num: 1, sides: 20 });
        expect(result).toBeCloseTo(11);
    });
    test('1d100', () => {
        const result = rollDice({ num: 1, sides: 100 });
        expect(result).toBeCloseTo(51);
    });

    test('2d4', () => {
        const result = rollDice({ num: 2, sides: 4 });
        expect(result).toBeCloseTo(6);
    });
    test('2d6', () => {
        const result = rollDice({ num: 2, sides: 6 });
        expect(result).toBeCloseTo(8);
    });
});