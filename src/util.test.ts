import { getRandomRange } from './util';

describe('getRandomRange', () => {
    let mathRandomSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random');
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
    });

    test('0, Math.random = 0', () => {
        mathRandomSpy.mockReturnValue(0);
        expect(getRandomRange(0)).toBe(0);
    });
    test('0, Math.random = 0.5', () => {
        mathRandomSpy.mockReturnValue(0.5);
        expect(getRandomRange(0)).toBe(0);
    });
    test('0, Math.random = 0.99', () => {
        mathRandomSpy.mockReturnValue(0.99);
        expect(getRandomRange(0)).toBe(0);
    });

    test('1, Math.random = 0', () => {
        mathRandomSpy.mockReturnValue(0);
        expect(getRandomRange(1)).toBe(0);
    });
    test('1, Math.random = 0.5', () => {
        mathRandomSpy.mockReturnValue(0.5);
        expect(getRandomRange(1)).toBe(0);
    });
    test('1, Math.random = 0.99', () => {
        mathRandomSpy.mockReturnValue(0.99);
        expect(getRandomRange(1)).toBe(0);
    });

    test('2, Math.random = 0', () => {
        mathRandomSpy.mockReturnValue(0);
        expect(getRandomRange(2)).toBe(0);
    });
    test('2, Math.random = 0.5', () => {
        mathRandomSpy.mockReturnValue(0.5);
        expect(getRandomRange(2)).toBe(1);
    });
    test('2, Math.random = 0.99', () => {
        mathRandomSpy.mockReturnValue(0.99);
        expect(getRandomRange(2)).toBe(1);
    });

    test('5, Math.random = 0', () => {
        mathRandomSpy.mockReturnValue(0);
        expect(getRandomRange(5)).toBe(0);
    });
    test('5, Math.random = 0.5', () => {
        mathRandomSpy.mockReturnValue(0.5);
        expect(getRandomRange(5)).toBe(2);
    });
    test('5, Math.random = 0.99', () => {
        mathRandomSpy.mockReturnValue(0.99);
        expect(getRandomRange(5)).toBe(4);
    });


});