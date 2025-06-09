import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { ItemType } from '../Equipment/Item';
import { Weapon, WeaponType } from '../Equipment/Weapon/Weapon';
import Poisoned from '../StatusEffect/Debuffs/Poisoned';
import DebuffId from '../StatusEffect/types/DebuffId';
import { createTestCharacter } from '../tests/util';
import AttackType from '../types/AttackType';
import { getCharBattleId } from '../util';
import SerpentSting from './SerpentSting';

let char: Character;
let target: Character;
const testWeapon: Weapon = {
    id: 'longbow0',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    type: WeaponType.Bow,
    attackType: AttackType.RangedWeapon,
    damageRange: { min: 8, max: 8, bonus: 0 },
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

describe('Serpent Sting Damage and Debuff', () => {
    let hitRollSpy: jest.SpyInstance;
    let critRollSpy: jest.SpyInstance;
    beforeEach(() => {
        hitRollSpy = jest.spyOn(Character.prototype, 'hitRoll').mockReturnValue(true);
        critRollSpy = jest.spyOn(Character, 'critRoll').mockReturnValue(false);
    });
    afterEach(() => {
        hitRollSpy.mockRestore();
        critRollSpy.mockRestore();
    });

    test('SerpentSting.func', () => {
        SerpentSting.func(char);
        // 8 * 1.25 = 10 damage
        expect(target.currentHealth).toBeCloseTo(90); // 100 - 10
        expect(char.currentMana).toBe(50);

        const poisonedDebuff = target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)];
        expect(poisonedDebuff.stacks).toBe(4);
    });
});

describe('Serpent Sting Description', () => {
    test('No Character', () => {
        expect(SerpentSting.description()).toBe(
            `Deal damage and apply 4 ${Poisoned.name}.`
        );
    });
    test('With Character', () => {
        expect(SerpentSting.description(char)).toBe(
            `Deal 10-10 damage and apply 4 ${Poisoned.name}.`
        );
    });
});