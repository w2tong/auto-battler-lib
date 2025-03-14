import { rollDice } from './dice';

describe('rollDice', () => {
    let mathRandomSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
    });

    test('1d6', () => {
        const result = rollDice({ num: 1, sides: 6 });
        expect(result).toBeCloseTo(4);
    });
    test('2d4', () => {
        const result = rollDice({ num: 2, sides: 4 });
        expect(result).toBeCloseTo(6);
    });

    // TODO: add more tests
});