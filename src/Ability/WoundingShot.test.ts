import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import { EquipSlot } from '../Equipment/Equipment';
import { ItemType } from '../Equipment/Item';
import { Weapon, WeaponType } from '../Equipment/Weapon/Weapon';
import DebuffId from '../StatusEffect/DebuffId';
import { createTestCharacter } from '../tests/util';
import AttackType from '../types/AttackType';
import { getCharBattleId } from '../util';
import WoundingShot from './WoundingShot';

let char: Character;
let target: Character;
const testWeapon: Weapon = {
    id: '',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    img: '',

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

test('WoundingShot.func', () => {
    WoundingShot.func(char);
    expect(target.currentHealth).toBeCloseTo(92.5); // 100 - (5 * 1.5 = 7.5) = 92.5
    expect(char.currentMana).toBe(50);

    const bleedingDebuff = target.statusEffectManager.debuffs[DebuffId.Bleeding]![getCharBattleId(char)];
    expect(bleedingDebuff.stacks).toBe(3);
    expect(bleedingDebuff.remainingDamage).toBeCloseTo(4.5); // 7.5 * 0.2 * 3
});