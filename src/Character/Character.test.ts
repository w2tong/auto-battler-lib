// TODO: add tests for following methods:
/*
calcDamageAfterArmour
calcDamageAfterBlock
*/

import Character from './Character';

describe('calcCritDamage', () => {
    // 10 DMG
    test('10 * 100% crit dmg = 10', () => {
        expect(Character.calcCritDamage(10, 1.00)).toEqual(10);
    });
    test('10 * 110% crit dmg = 11', () => {
        expect(Character.calcCritDamage(10, 1.10)).toEqual(11);
    });
    test('10 * 150% crit dmg = 15', () => {
        expect(Character.calcCritDamage(10, 1.50)).toEqual(15);
    });
    test('10 * 200% crit dmg = 20', () => {
        expect(Character.calcCritDamage(10, 2.00)).toEqual(20);
    });

    test('10 * 90% crit dmg = 9', () => {
        expect(Character.calcCritDamage(10, 0.90)).toEqual(9);
    });
    test('10 * 50% crit dmg = 5', () => {
        expect(Character.calcCritDamage(10, 0.50)).toEqual(5);
    });
    test('10 * 10% crit dmg = 1', () => {
        expect(Character.calcCritDamage(10, 0.10)).toEqual(1);
    });
    test('10 * 0% crit dmg = 0', () => {
        expect(Character.calcCritDamage(10, 0.00)).toEqual(0);
    });
    test('10 * -100% crit dmg = 0', () => {
        expect(Character.calcCritDamage(10, -1.00)).toEqual(0);
    });

    // 0 DMG
    test('0 * 100% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 1.00)).toEqual(0);
    });
    test('0 * 200% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 2.00)).toEqual(0);
    });
    test('0 * 50% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 0.50)).toEqual(0);
    });
    test('0 * 0% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 0.00)).toEqual(0);
    });
    test('0 * -100% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, -1.00)).toEqual(0);
    });
});

describe('calcDamageAfterDeflection', () => {
    // 10 DMG
    test('10 - 0 deflection = 10', () => {
        expect(Character.calcDamageAfterDeflection(10, 0)).toEqual(10);
    });
    test('10 - 1 deflection = 9', () => {
        expect(Character.calcDamageAfterDeflection(10, 1)).toEqual(9);
    });
    test('10 - 5 deflection = 5', () => {
        expect(Character.calcDamageAfterDeflection(10, 5)).toEqual(5);
    });
    test('10 - 10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, 10)).toEqual(0);
    });
    test('10 - 100 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, 100)).toEqual(0);
    });

    test('10 - -1 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, -1)).toEqual(11);
    });
    test('10 - -10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, -10)).toEqual(20);
    });
    test('10 - -100 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, -100)).toEqual(110);
    });

    // 0 DMG
    test('0 - 0 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, 0)).toEqual(0);
    });
    test('0 - 1 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, 1)).toEqual(0);
    });
    test('0 - 10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, 10)).toEqual(0);
    });
    test('0 - -1 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, -1)).toEqual(0);
    });
    test('0 - -10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, -10)).toEqual(0);
    });
});