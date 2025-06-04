import { isValidEquip, EquipSlot, equips, createEquipmentImport, EquipmentItemIds } from './Equipment';


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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.MainHand)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.OffHand)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Head)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Armour)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Hands)).toBe(false);
        });
    });

    describe('EquipSlot Waist', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Waist)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Waist)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Waist)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Waist)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Waist)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Waist)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Waist)).toBe(false);
        });
        test('chargesBelt0 = true', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Waist)).toBe(true);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Waist)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Waist)).toBe(false);
        });
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Waist)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Ring1)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Ring2)).toBe(false);
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
        test('neck = false', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Potion)).toBe(false);
        });
    });

    describe('EquipSlot Neck', () => {
        test('longsword0 = false', () => {
            expect(isValidEquip(equips.longsword0.id, EquipSlot.Neck)).toBe(false);
        });
        test('dagger0 = false', () => {
            expect(isValidEquip(equips.dagger0.id, EquipSlot.Neck)).toBe(false);
        });
        test('greatsword0 = false', () => {
            expect(isValidEquip(equips.greatsword0.id, EquipSlot.Neck)).toBe(false);
        });
        test('buckler0 = false', () => {
            expect(isValidEquip(equips.buckler0.id, EquipSlot.Neck)).toBe(false);
        });
        test('clothHood0 = false', () => {
            expect(isValidEquip(equips.clothHood0.id, EquipSlot.Neck)).toBe(false);
        });
        test('robe0 = false', () => {
            expect(isValidEquip(equips.robe0.id, EquipSlot.Neck)).toBe(false);
        });
        test('dwGloves0 = false', () => {
            expect(isValidEquip(equips.dwGloves0.id, EquipSlot.Neck)).toBe(false);
        });
        test('chargesBelt0 = false', () => {
            expect(isValidEquip(equips.chargesBelt0.id, EquipSlot.Neck)).toBe(false);
        });
        test('accRing0 = false', () => {
            expect(isValidEquip(equips.accRing0.id, EquipSlot.Neck)).toBe(false);
        });
        test('healingPotion0 = false', () => {
            expect(isValidEquip(equips.healingPotion0.id, EquipSlot.Neck)).toBe(false);
        });
        test('neck = true', () => {
            expect(isValidEquip(equips.strNeck0.id, EquipSlot.Neck)).toBe(true);
        });
    });
});

describe('createEquipmentImport', () => {
    // Helper: returns a blank EquipmentItemIds (all null)
    function blankIds(): EquipmentItemIds {
        return {
            [EquipSlot.MainHand]: null,
            [EquipSlot.OffHand]: null,
            [EquipSlot.Head]: null,
            [EquipSlot.Armour]: null,
            [EquipSlot.Hands]: null,
            [EquipSlot.Waist]: null,
            [EquipSlot.Ring1]: null,
            [EquipSlot.Ring2]: null,
            [EquipSlot.Potion]: null,
            [EquipSlot.Neck]: null,
        };
    }

    it('returns correct EquipmentImport for all valid items', () => {
        const ids: EquipmentItemIds = {
            [EquipSlot.MainHand]: 'longsword0',
            [EquipSlot.OffHand]: 'buckler0',
            [EquipSlot.Head]: 'clothHood0',
            [EquipSlot.Armour]: 'robe0',
            [EquipSlot.Hands]: 'dwGloves0',
            [EquipSlot.Waist]: 'chargesBelt0',
            [EquipSlot.Ring1]: 'accRing0',
            [EquipSlot.Ring2]: 'accRing0',
            [EquipSlot.Potion]: 'healingPotion0',
            [EquipSlot.Neck]: 'strNeck0',
        };
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.MainHand]).toBe(equips.longsword0);
        expect(result[EquipSlot.OffHand]).toBe(equips.buckler0);
        expect(result[EquipSlot.Head]).toBe(equips.clothHood0);
        expect(result[EquipSlot.Armour]).toBe(equips.robe0);
        expect(result[EquipSlot.Hands]).toBe(equips.dwGloves0);
        expect(result[EquipSlot.Waist]).toBe(equips.chargesBelt0);
        expect(result[EquipSlot.Ring1]).toBe(equips.accRing0);
        expect(result[EquipSlot.Ring2]).toBe(equips.accRing0);
        expect(result[EquipSlot.Potion]).toEqual(equips.healingPotion0);
        expect(result[EquipSlot.Neck]).toBe(equips.strNeck0);
    });

    it('returns only valid slots when some ids are invalid', () => {
        const ids: EquipmentItemIds = {
            [EquipSlot.MainHand]: 'longsword0',
            [EquipSlot.OffHand]: 'notAWeapon', // invalid
            [EquipSlot.Head]: 'clothHood0',
            [EquipSlot.Armour]: 'notArmour', // invalid
            [EquipSlot.Hands]: 'dwGloves0',
            [EquipSlot.Waist]: null,
            [EquipSlot.Ring1]: 'accRing0',
            [EquipSlot.Ring2]: 'notARing', // invalid
            [EquipSlot.Potion]: 'healingPotion0',
            [EquipSlot.Neck]: null,
        };
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.MainHand]).toBe(equips.longsword0);
        expect(result[EquipSlot.OffHand]).toBeUndefined();
        expect(result[EquipSlot.Head]).toBe(equips.clothHood0);
        expect(result[EquipSlot.Armour]).toBeUndefined();
        expect(result[EquipSlot.Hands]).toBe(equips.dwGloves0);
        expect(result[EquipSlot.Waist]).toBeUndefined();
        expect(result[EquipSlot.Ring1]).toBe(equips.accRing0);
        expect(result[EquipSlot.Ring2]).toBeUndefined();
        expect(result[EquipSlot.Potion]).toEqual(equips.healingPotion0);
        expect(result[EquipSlot.Neck]).toBeUndefined();
    });

    it('returns empty object when all ids are invalid', () => {
        const ids: EquipmentItemIds = {
            [EquipSlot.MainHand]: 'bad',
            [EquipSlot.OffHand]: 'bad',
            [EquipSlot.Head]: 'bad',
            [EquipSlot.Armour]: 'bad',
            [EquipSlot.Hands]: 'bad',
            [EquipSlot.Waist]: 'bad',
            [EquipSlot.Ring1]: 'bad',
            [EquipSlot.Ring2]: 'bad',
            [EquipSlot.Potion]: 'bad',
            [EquipSlot.Neck]: 'bad',
        };
        const result = createEquipmentImport(ids);
        expect(result).toEqual({});
    });

    it('returns only provided slots when others are null', () => {
        const ids = blankIds();
        ids[EquipSlot.MainHand] = 'longsword0';
        ids[EquipSlot.Ring1] = 'accRing0';
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.MainHand]).toBe(equips.longsword0);
        expect(result[EquipSlot.Ring1]).toBe(equips.accRing0);
        expect(result[EquipSlot.OffHand]).toBeUndefined();
        expect(result[EquipSlot.Head]).toBeUndefined();
        expect(result[EquipSlot.Armour]).toBeUndefined();
        expect(result[EquipSlot.Hands]).toBeUndefined();
        expect(result[EquipSlot.Waist]).toBeUndefined();
        expect(result[EquipSlot.Ring2]).toBeUndefined();
        expect(result[EquipSlot.Potion]).toBeUndefined();
        expect(result[EquipSlot.Neck]).toBeUndefined();
    });

    it('treats null and missing as not present', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.MainHand] = null;
        ids[EquipSlot.OffHand] = null;
        const result = createEquipmentImport(ids);
        expect(result).toEqual({});
    });

    it('does not mutate the input object', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.MainHand] = 'longsword0';
        const copy = { ...ids };
        createEquipmentImport(ids);
        expect(ids).toEqual(copy);
    });

    it('OffHand: returns Weapon if id is a valid offhand weapon', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.OffHand] = 'dagger0'; // valid offhand weapon
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.OffHand]).toBe(equips.dagger0);
    });

    it('OffHand: returns Shield if id is a valid shield', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.OffHand] = 'buckler0';
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.OffHand]).toBe(equips.buckler0);
    });

    it('OffHand: does not return anything if id is not a weapon or shield', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.OffHand] = 'robe0'; // not a weapon or shield
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.OffHand]).toBeUndefined();
    });

    it('Potion: returns the correct object from the potions map', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.Potion] = 'healingPotion0';
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.Potion]).toBe(equips.healingPotion0); // should be the same reference
        expect(result[EquipSlot.Potion]).toEqual(equips.healingPotion0);
    });

    it('returns undefined for slots not present in input', () => {
        const ids: EquipmentItemIds = blankIds();
        ids[EquipSlot.MainHand] = 'longsword0';
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.OffHand]).toBeUndefined();
        expect(result[EquipSlot.Head]).toBeUndefined();
        expect(result[EquipSlot.Armour]).toBeUndefined();
        expect(result[EquipSlot.Hands]).toBeUndefined();
        expect(result[EquipSlot.Waist]).toBeUndefined();
        expect(result[EquipSlot.Ring1]).toBeUndefined();
        expect(result[EquipSlot.Ring2]).toBeUndefined();
        expect(result[EquipSlot.Potion]).toBeUndefined();
        expect(result[EquipSlot.Neck]).toBeUndefined();
    });

    it('handles all slots as null', () => {
        const ids: EquipmentItemIds = blankIds();
        const result = createEquipmentImport(ids);
        expect(result).toEqual({});
    });

    it('handles all slots as valid, but some are null', () => {
        const ids: EquipmentItemIds = {
            [EquipSlot.MainHand]: 'longsword0',
            [EquipSlot.OffHand]: null,
            [EquipSlot.Head]: 'clothHood0',
            [EquipSlot.Armour]: null,
            [EquipSlot.Hands]: 'dwGloves0',
            [EquipSlot.Waist]: null,
            [EquipSlot.Ring1]: 'accRing0',
            [EquipSlot.Ring2]: null,
            [EquipSlot.Potion]: 'healingPotion0',
            [EquipSlot.Neck]: null,
        };
        const result = createEquipmentImport(ids);
        expect(result[EquipSlot.MainHand]).toBe(equips.longsword0);
        expect(result[EquipSlot.Head]).toBe(equips.clothHood0);
        expect(result[EquipSlot.Hands]).toBe(equips.dwGloves0);
        expect(result[EquipSlot.Ring1]).toBe(equips.accRing0);
        expect(result[EquipSlot.Potion]).toEqual(equips.healingPotion0);
        expect(result[EquipSlot.OffHand]).toBeUndefined();
        expect(result[EquipSlot.Armour]).toBeUndefined();
        expect(result[EquipSlot.Waist]).toBeUndefined();
        expect(result[EquipSlot.Ring2]).toBeUndefined();
        expect(result[EquipSlot.Neck]).toBeUndefined();
    });
});