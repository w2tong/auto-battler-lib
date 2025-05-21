import AttackType from '../types/AttackType';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { ItemType } from '../Equipment/Item';
import { type Weapon, WeaponType } from '../Equipment/Weapon/Weapon';
import { createTestCharacter } from '../tests/util';
import DoubleStrike from './DoubleStrike';

let char: Character;
let target: Character;
const testSword: Weapon = {
    id: 'longsword0',
    itemType: ItemType.Weapon,
    name: 'Longsword',
    tier: 0,
    img: 'weapon-longsword.png',
    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
    damageRange: { min: 5, max: 9, bonus: 1 }
};

beforeEach(() => {
    target = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Dodge]: { base: 0 }
        }
    });
});

let mathRandomSpy: jest.SpyInstance;
beforeEach(() => {
    mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
afterEach(() => {
    mathRandomSpy.mockRestore();
});

test('DoubleStrike with 10 ManaOnHit', () => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.SpellPower]: { base: 100 },
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 },
            [StatType.ManaOnHit]: { base: 10 }
        },
        equipment: {
            [EquipSlot.MainHand]: testSword
        }
    });
    char.target = target;

    DoubleStrike.func(char);
    expect(target.currentHealth).toBe(84);
    expect(char.currentMana).toBe(70);
});

test('DoubleStrike with 0 ManaOnHit', () => {
    char = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.SpellPower]: { base: 100 },
            [StatType.StartingMana]: { base: 100 },
            [StatType.ManaCost]: { base: 50 },
            [StatType.ManaOnHit]: { base: 0 }
        },
        equipment: {
            [EquipSlot.MainHand]: testSword
        }
    });
    char.target = target;

    DoubleStrike.func(char);
    expect(target.currentHealth).toBe(84);
    expect(char.currentMana).toBe(50);
});