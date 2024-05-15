import { ArmourType, armour } from '../../Equipment/Armour';
import { weapons } from '../../Equipment/Weapon';
import { createCharacter, createCharacterWithEquipment, createCharacterWithTemplate } from '../../tests/util';
import Character from '../Character';
import ArmourTypeDodgeMultiplier from './ArmourTypeDodgeMultiplier';
import { StatTemplate } from './StatTemplate';
import StatType from './StatType';
import Stats from './Stats';

describe('Default Stats', () => {
    test('Level 1 Max Health is Stats.DEFAULT_MAX_HEALTH', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.MaxHealth]).toEqual({base: Stats.DEFAULT_MAX_HEALTH, attribute: 0, bonus: 0});
    });

    test('Level 5 Max Health is DEFAULT_MAX_HEALTH + DEFAULT_MAX_HEALTH/LVL * (LVL-1)', () => {
        const level = 5;
        const char = createCharacter(level);
        expect(char.stats[StatType.MaxHealth]).toEqual({base: Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * (level - 1), attribute: 0, bonus: 0});
    });

    test('Level 1 Dodge is Stats.DEFAULT_DODGE', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.Dodge]).toEqual({base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0});
    });

    test('Level 1 Crit Chance is Stats.DEFAULT_CRIT_CHANCE', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.CriticalChance]).toEqual({base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0});
    });

    test('Level 1 Crit Damage is Stats.DEFAULT_CRIT_CHANCE', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.CriticalDamage]).toEqual({base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0});
    });

    test('Level 1 Mana Cost is Stats.DEFAULT_MANA_COST', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.ManaCost]).toEqual({base: Stats.DEFAULT_MANA_COST, attribute: 0, bonus: 0});
    });

    test('Level 1 Mana On Hit is Stats.DEFAULT_MANA_ON_HIT', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.ManaOnHit]).toEqual({base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0});
    });

    test('Level 1 Mana Regen is Stats.DEFAULT_MANA_COST', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.ManaRegen]).toEqual({base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0});
    });
});

describe('Dodge with Armour Type Penalty', () => {
    test('Dodge with no armour is Stats.DEFAULT_DODGE', () => {
        const char = createCharacterWithEquipment(1, {});
        expect(char.stats.dodge).toEqual(Stats.DEFAULT_DODGE);
    });

    test('Dodge with Unarmoured Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Unarmoured]', () => {
        const char = createCharacterWithEquipment(1, {armour: armour.robe0});
        expect(char.stats.dodge).toEqual(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Unarmoured]);
    });

    test('Dodge with Light Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Light]', () => {
        const char = createCharacterWithEquipment(1, {armour: armour.leatherArmour0});
        expect(char.stats.dodge).toEqual(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Light]);
    });

    test('Dodge with Medium Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Medium]', () => {
        const char = createCharacterWithEquipment(1, {armour: armour.mailArmour0});
        expect(char.stats.dodge).toEqual(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Medium]);
    });

    test('Dodge with Heavy Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Heavy]', () => {
        const char = createCharacterWithEquipment(1, {armour: armour.plateArmour0});
        expect(char.stats.dodge).toEqual(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Heavy]);
    });
});

function create2HCharacter(statTemplate: StatTemplate) {
    return new Character({
        name: '',
        level: 1,
        attributes: {},
        statTemplate,
        equipment: { mainHand: weapons.greatsword0 }
    });
}

describe('Two-Handed Stat Bonuses', () => {
    // TODO: complete this test case
    test('0 is 0', () => {
        const char = create2HCharacter({});
        expect(char.stats.damage).toEqual(0);
        expect(char.stats.meleeWeaponDamage).toEqual(0);
        expect(char.stats.rangedWeaponDamage).toEqual(0);
        expect(char.stats.manaOnHit).toEqual(Stats.DEFAULT_MANA_ON_HIT * (1 + Stats.TWO_HANDED_BONUS));
    });
    test('10 is 15', () => {
        const char = create2HCharacter({
            [StatType.Damage]: { base: 10 },
            [StatType.MeleeWeaponDamage]: { base: 10 },
            [StatType.RangedWeaponDamage]: { base: 10 },
            [StatType.ManaOnHit]: { base: 10 },
        });
        expect(char.stats.damage).toEqual(15);
        expect(char.stats.meleeWeaponDamage).toEqual(15);
        expect(char.stats.rangedWeaponDamage).toEqual(15);
        expect(char.stats.manaOnHit).toEqual(15);
    });
    // TODO: add more test cases
});

describe('Spell Power %', () => {
    test('100 + 0% is 100', () => {
        const char = createCharacterWithTemplate(1, {[StatType.SpellPower]: { base: 100 }});
        expect(char.stats.spellPower).toEqual(100);
    });

    test('100 + 10% is 110', () => {
        const char = createCharacterWithTemplate(1, {[StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: 0.1 }});
        expect(char.stats.spellPower).toEqual(110);
    });

    // TODO: add more test cases
});