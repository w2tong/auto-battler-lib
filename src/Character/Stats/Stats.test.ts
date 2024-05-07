import { calcTotalStat } from './Stats';

describe('calcTotalStat()', () => {
    test('0 base, 0 attribute, 0 bonus', () => {
        expect(calcTotalStat({base: 0, attribute: 0, bonus: 0})).toEqual(0);
    });

    test('1 base, 0 attribute, 0 bonus', () => {
        expect(calcTotalStat({base: 1, attribute: 0, bonus: 0})).toEqual(1);
    });

    test('0 base, 1 attribute, 0 bonus', () => {
        expect(calcTotalStat({base: 0, attribute: 1, bonus: 0})).toEqual(1);
    });

    test('0 base, 0 attribute, 1 bonus', () => {
        expect(calcTotalStat({base: 0, attribute: 0, bonus: 1})).toEqual(1);
    });

    test('1 base, 1 attribute, 0 bonus', () => {
        expect(calcTotalStat({base: 1, attribute: 1, bonus: 0})).toEqual(2);
    });

    test('1 base, 0 attribute, 1 bonus', () => {
        expect(calcTotalStat({base: 1, attribute: 0, bonus: 1})).toEqual(2);
    });

    test('0 base, 1 attribute, 1 bonus', () => {
        expect(calcTotalStat({base: 0, attribute: 1, bonus: 1})).toEqual(2);
    });

    test('1 base, 1 attribute, 1 bonus', () => {
        expect(calcTotalStat({base: 1, attribute: 1, bonus: 1})).toEqual(3);
    });
});

describe('setStatsAttribute', () => {

});