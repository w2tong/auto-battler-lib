import { test1HWeapon, test2HWeapon } from './tests/util';
import WeaponStyle, { getWeaponStyle } from './WeaponStyle';

describe('getWeaponStyle', () => {
    test('Main-hand 1H weapon', () => {
        expect(getWeaponStyle({ mainHand: test1HWeapon })).toBe(WeaponStyle.OneHanded);
    });
    test('Dual-wield 1H weapons', () => {
        expect(getWeaponStyle({ mainHand: test1HWeapon, offHand: test1HWeapon })).toBe(WeaponStyle.DualWield);
    });
    test('Main-hand 2H weapon', () => {
        expect(getWeaponStyle({ mainHand: test2HWeapon })).toBe(WeaponStyle.TwoHanded);
    });
});