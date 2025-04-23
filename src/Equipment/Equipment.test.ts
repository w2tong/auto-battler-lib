// Test unarmed when no weapons
// isValidEquip (for each slot)
// createEquipmentImport

import { isValidEquip, EquipSlot, equips } from './Equipment';

// MainHand = 'Main Hand',
//     OffHand = 'Off Hand',
//     Head = 'Head',
//     Armour = 'Armour',
//     Hands = 'Hands',
//     Belt = 'Belt',
//     Ring1 = 'Ring 1',
//     Ring2 = 'Ring 2',
//     Potion = 'Potion',
//     Amulet = 'Amulet'

describe('isValidEquip', () => {
    describe('EquipSlot MainHand', () => {
        test('longsword0 = true', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.MainHand)).toBe(true);
        });
        test('greatsword0 = true', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.MainHand)).toBe(true);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.MainHand)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.MainHand)).toBe(false);
        });
    });
});

describe('createEquipmentImport', () => {

});