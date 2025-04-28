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
        test('dagger0 = true', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.MainHand)).toBe(true);
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

    describe('EquipSlot OffHand', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('dagger0 = true', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.OffHand)).toBe(true);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('buckler0 = true', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.OffHand)).toBe(true);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.OffHand)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.OffHand)).toBe(false);
        });
    });

    describe('EquipSlot Head', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Head)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Head)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Head)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Head)).toBe(false);
        });
        test('clothHood0 = true', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Head)).toBe(true);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Head)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Head)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Head)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Head)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Head)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Head)).toBe(false);
        });
    });

    describe('EquipSlot Armour', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Armour)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Armour)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Armour)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Armour)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Armour)).toBe(false);
        });
        test('robe0 = true', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Armour)).toBe(true);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Armour)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Armour)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Armour)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Armour)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Armour)).toBe(false);
        });
    });

    describe('EquipSlot Hands', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Hands)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Hands)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Hands)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Hands)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Hands)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Hands)).toBe(false);
        });
        test('dwGloves0 = true', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Hands)).toBe(true);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Hands)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Hands)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Hands)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Hands)).toBe(false);
        });
    });

    describe('EquipSlot Belt', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Belt)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Belt)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Belt)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Belt)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Belt)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Belt)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Belt)).toBe(false);
        });
        test('chargesBelt0 = true', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Belt)).toBe(true);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Belt)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Belt)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Belt)).toBe(false);
        });
    });

    describe('EquipSlot Ring1', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('accRing0 = true', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Ring1)).toBe(true);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Ring1)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Ring1)).toBe(false);
        });
    });

    describe('EquipSlot Ring2', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('accRing0 = true', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Ring2)).toBe(true);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Ring2)).toBe(false);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Ring2)).toBe(false);
        });
    });

    describe('EquipSlot Potion', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Potion)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Potion)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Potion)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Potion)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Potion)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Potion)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Potion)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Potion)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Potion)).toBe(false);
        });
        test('healingPotion0 = true', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Potion)).toBe(true);
        });
        test('amulet = false', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Potion)).toBe(false);
        });
    });

    describe('EquipSlot Amulet', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Amulet)).toBe(false);
        });
        test('amulet = true', () => {
            expect(isValidEquip(equips.amulet.id, EquipSlot.Amulet)).toBe(true);
        });
    });
});

describe('createEquipmentImport', () => {
    // TODO: create following tests
    // All valid items
    // Some invalid items
    // No valid items 
});