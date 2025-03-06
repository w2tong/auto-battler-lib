// TODO: add tests for following methods:
/*
calcDamageAfterDeflection
calcDamageAfterArmour
calcDamageAfterBlock
*/

import Character from './Character';

describe('calcCritDamage', () => {
    test('10 dmg * 100% crit dmg = 10 dmg', () => {
        expect(Character.calcCritDamage(10, 1.00)).toEqual(10);
    });
    test('10 dmg * 110% crit dmg = 11 dmg', () => {
        expect(Character.calcCritDamage(10, 1.10)).toEqual(11);
    });
    test('10 dmg * 150% crit dmg = 15 dmg', () => {
        expect(Character.calcCritDamage(10, 1.50)).toEqual(15);
    });
    test('10 dmg * 200% crit dmg = 20 dmg', () => {
        expect(Character.calcCritDamage(10, 2.00)).toEqual(20);
    });

    test('10 dmg * 90% crit dmg = 9 dmg', () => {
        expect(Character.calcCritDamage(10, 0.90)).toEqual(9);
    });
    test('10 dmg * 50% crit dmg = 5 dmg', () => {
        expect(Character.calcCritDamage(10, 0.50)).toEqual(5);
    });
    test('10 dmg * 10% crit dmg = 1 dmg', () => {
        expect(Character.calcCritDamage(10, 0.10)).toEqual(1);
    });
    test('10 dmg * 0% crit dmg = 0 dmg', () => {
        expect(Character.calcCritDamage(10, 0.00)).toEqual(0);
    });
    test('10 dmg * -100% crit dmg = 0 dmg', () => {
        expect(Character.calcCritDamage(10, -1.00)).toEqual(0);
    });
});