import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { ItemType } from '../Equipment/Item';
import { Weapon, WeaponType } from '../Equipment/Weapon/Weapon';
import DebuffId from '../StatusEffect/types/DebuffId';
import Bleeding from '../StatusEffect/Debuffs/Bleeding';
import { createTestCharacter } from '../tests/util';
import AttackType from '../types/AttackType';
import { getCharBattleId } from '../util';
import WoundingShot from './WoundingShot';

let char: Character;
let target: Character;
const testWeapon: Weapon = {
    id: 'bite0',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,

    type: WeaponType.Bow,
    attackType: AttackType.RangedWeapon,
    damageRange: { min: 5, max: 5, bonus: 0 },
};

beforeEach(() => {
    char = createTestCharacter({
        level: 10,
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.SpellPower]: { base: 100 },
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 }
        },
        equipment: {
            [EquipSlot.MainHand]: testWeapon
        }
    });

    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Dodge]: { base: 0 }
        }
    });

    char.target = target;
    new Battle([char], [target]);
});


describe('WoundingShot Damage and Debuff', () => {
    let hitRollSpy: jest.SpyInstance;
    let critRollSpy: jest.SpyInstance;
    beforeEach(() => {
        hitRollSpy = jest.spyOn(Character.prototype, 'hitRoll').mockReturnValue(true);
        critRollSpy = jest.spyOn(Character, 'critRoll').mockReturnValue(true);
    });
    afterEach(() => {
        hitRollSpy.mockRestore();
        critRollSpy.mockRestore();
    });

    test('WoundingShot.func', () => {
        WoundingShot.func(char);
        expect(target.currentHealth).toBeCloseTo(88.75); // 100 - (5 * 1.5 * 1.5 = 11.25) = 88.75
        expect(char.currentMana).toBe(50);

        const bleedingDebuff = target.statusEffectManager.debuffs[DebuffId.Bleeding]![getCharBattleId(char)] as Bleeding;
        expect(bleedingDebuff.stacks).toBe(3);
        expect(bleedingDebuff.remainingDamage).toBeCloseTo(6.75); // 11.25 * 0.2 * 3
    });
});


describe('WoundingShot Description', () => {
    test('No Character', () => {
        expect(WoundingShot.description()).toBe(
            'Deals damage and applies Bleed dealing 60% of the initial damage dealt over 3 turns.'
        );
    });
    test('With Character', () => {
        expect(WoundingShot.description(char)).toBe(
            'Deals 7.5-7.5 damage and applies Bleed dealing 60% of the initial damage dealt over 3 turns.'
        );
    });
});