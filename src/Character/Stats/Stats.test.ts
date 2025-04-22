import { ArmourType, armour } from '../../Equipment/Armour';
import { createTestCharacter, test1HWeapon, test2HWeapon } from '../../tests/util';
import ArmourTypeDodgeMultiplier from './ArmourTypeDodgeMultiplier'; import StatType from './StatType';
import Stats from './Stats';

describe('Default Stats', () => {
    test('Level 1 Max Health is Stats.DEFAULT_MAX_HEALTH', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.MaxHealth]).toStrictEqual({ base: Stats.DEFAULT_MAX_HEALTH, attribute: 0, bonus: 0 });
    });

    test('Level 5 Max Health is DEFAULT_MAX_HEALTH + DEFAULT_MAX_HEALTH/LVL * (LVL-1)', () => {
        const level = 5;
        const char = createTestCharacter({ level });
        expect(char.stats[StatType.MaxHealth]).toStrictEqual({ base: Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * (level - 1), attribute: 0, bonus: 0 });
    });

    test('Level 1 Dodge is Stats.DEFAULT_DODGE', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.Dodge]).toStrictEqual({ base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0 });
    });

    test('Level 1 Off-hand Accuracy is Stats.OFF_HAND_ACCURACY_PENALTY', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.OffHandAccuracy]).toStrictEqual({ base: Stats.OFF_HAND_ACCURACY_PENALTY, attribute: 0, bonus: 0 });
    });

    test('Level 1 Crit Chance is Stats.DEFAULT_CRIT_CHANCE', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.CriticalChance]).toStrictEqual({ base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0 });
    });

    test('Level 1 Crit Damage is Stats.DEFAULT_CRIT_CHANCE', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.CriticalDamage]).toStrictEqual({ base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0 });
    });

    test('Level 1 Mana Cost is Stats.DEFAULT_MANA_COST', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.ManaCost]).toStrictEqual({ base: Stats.DEFAULT_MANA_COST, attribute: 0, bonus: 0 });
    });

    test('Level 1 Mana On Hit is Stats.DEFAULT_MANA_ON_HIT', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.ManaOnHit]).toStrictEqual({ base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0 });
    });

    test('Level 1 Mana Regen is Stats.DEFAULT_MANA_COST', () => {
        const char = createTestCharacter({});
        expect(char.stats[StatType.ManaRegen]).toStrictEqual({ base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0 });
    });
});

describe('Dodge with Armour Type Penalty', () => {
    test('Dodge with no armour is Stats.DEFAULT_DODGE', () => {
        const char = createTestCharacter({});
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE);
    });

    test('Dodge with Unarmoured Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Unarmoured]', () => {
        const char = createTestCharacter({ equipment: { armour: armour.robe0 } });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Unarmoured]);
    });

    test('Dodge with Light Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Light]', () => {
        const char = createTestCharacter({ equipment: { armour: armour.leatherArmour0 } });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Light]);
    });

    test('Dodge with Medium Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Medium]', () => {
        const char = createTestCharacter({ equipment: { armour: armour.mailArmour0 } });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Medium]);
    });

    test('Dodge with Heavy Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Heavy]', () => {
        const char = createTestCharacter({ equipment: { armour: armour.plateArmour0 } });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Heavy]);
    });
});

describe('Two-Handed Stat Bonuses', () => {
    const twoHandedBonus = 1 + Stats.TWO_HANDED_BONUS;

    test('no bonus, 10 is 10', () => {
        const num = 10;
        const char = createTestCharacter({
            statTemplate: {
                [StatType.Damage]: { base: num },
                [StatType.MeleeWeaponDamage]: { base: num },
                [StatType.RangedWeaponDamage]: { base: num },
                [StatType.ManaOnHit]: { base: num }
            }
        });
        expect(char.stats.damage).toBe(num);
        expect(char.stats.meleeWeaponDamage).toBe(num);
        expect(char.stats.rangedWeaponDamage).toBe(num);
        expect(char.stats.manaOnHit).toBe(num);
    });

    test('Mana On Hit is Default * twoHandedBonus', () => {
        const char = createTestCharacter({ equipment: { mainHand: test2HWeapon } });
        expect(char.stats.manaOnHit).toBeCloseTo(Stats.DEFAULT_MANA_ON_HIT * twoHandedBonus);
    });

    test('0 is 0', () => {
        const char = createTestCharacter({
            statTemplate: { [StatType.ManaOnHit]: { base: 0 } },
            equipment: { mainHand: test2HWeapon }
        });
        expect(char.stats.damage).toBe(0);
        expect(char.stats.meleeWeaponDamage).toBe(0);
        expect(char.stats.rangedWeaponDamage).toBe(0);
        expect(char.stats.manaOnHit).toBe(0);
    });

    test('twoHanded, 10 is 15', () => {
        const num = 10;
        const char = createTestCharacter({
            statTemplate: {
                [StatType.Damage]: { base: num },
                [StatType.MeleeWeaponDamage]: { base: num },
                [StatType.RangedWeaponDamage]: { base: num },
                [StatType.ManaOnHit]: { base: num },
            },
            equipment: { mainHand: test2HWeapon }
        });
        expect(char.stats.damage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.meleeWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.rangedWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.manaOnHit).toBeCloseTo(num * twoHandedBonus);
    });

    test('twoHanded, 100 is 150', () => {
        const num = 100;
        const char = createTestCharacter({
            statTemplate: {
                [StatType.Damage]: { base: num },
                [StatType.MeleeWeaponDamage]: { base: num },
                [StatType.RangedWeaponDamage]: { base: num },
                [StatType.ManaOnHit]: { base: num },
            },
            equipment: { mainHand: test2HWeapon }
        });
        expect(char.stats.damage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.meleeWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.rangedWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.manaOnHit).toBeCloseTo(num * twoHandedBonus);
    });

    test('-10 is -10', () => {
        const num = -10;
        const char = createTestCharacter({
            statTemplate: {
                [StatType.Damage]: { base: num },
                [StatType.MeleeWeaponDamage]: { base: num },
                [StatType.RangedWeaponDamage]: { base: num },
                [StatType.ManaOnHit]: { base: num },
            },
            equipment: { mainHand: test2HWeapon }
        });
        expect(char.stats.damage).toBe(num);
        expect(char.stats.meleeWeaponDamage).toBe(num);
        expect(char.stats.rangedWeaponDamage).toBe(num);
        expect(char.stats.manaOnHit).toBe(num);
    });

    test('-100 is -100', () => {
        const num = -100;
        const char = createTestCharacter({
            statTemplate: {
                [StatType.Damage]: { base: num },
                [StatType.MeleeWeaponDamage]: { base: num },
                [StatType.RangedWeaponDamage]: { base: num },
                [StatType.ManaOnHit]: { base: num },
            },
            equipment: { mainHand: test2HWeapon }
        });
        expect(char.stats.damage).toBe(num);
        expect(char.stats.meleeWeaponDamage).toBe(num);
        expect(char.stats.rangedWeaponDamage).toBe(num);
        expect(char.stats.manaOnHit).toBe(num);
    });
});

// TODO: add test cases for dual wielding           

describe('Health %', () => {
    describe('100 health', () => {
        test('100 + 0% is 100', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 }
                }
            });
            expect(char.stats.maxHealth).toEqual(100);
        });

        test('100 + 10% is 110', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: 0.10 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(110);
        });

        test('100 + 50% is 150', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: 0.50 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(150);
        });

        test('100 + 100% is 200', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: 1.00 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(200);
        });

        test('100 + 1000% is 1100', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: 10.00 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(1100);
        });

        test('100 - 10% is 90', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: -0.10 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(90);
        });

        test('100 - 50% is 50', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: -0.50 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(50);
        });

        test('100 - 100% is 10', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: -1.00 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(10);
        });

        test('100 - 1000% is 10', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.MaxHealth]: { base: 100 },
                    [StatType.HealthPercent]: { base: -10.00 }
                }
            });
            expect(char.stats.maxHealth).toBeCloseTo(10);
        });
    });
});

// TODO: fill out tests
// describe('MeleeWeaponDamagePercent', () => {
// });

// describe('RangedWeaponDamagePercent', () => {
// });

describe('Spell Power %', () => {
    describe('100 SP', () => {
        test('100 + 0% is 100', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 }
                }
            });
            expect(char.stats.spellPower).toEqual(100);
        });

        test('100 + 10% is 110', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: 0.10 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(110);
        });

        test('100 + 50% is 150', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: 0.50 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(150);
        });

        test('100 + 100% is 200', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: 1.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(200);
        });

        test('100 + 1000% is 1100', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: 10.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(1100);
        });

        test('100 - 10% is 90', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: -0.10 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(90);
        });

        test('100 - 50% is 50', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: -0.50 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(50);
        });

        test('100 - 100% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: -1.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('100 - 1000% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 100 },
                    [StatType.SpellPowerPercent]: { base: -10.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });
    });

    describe('-100 SP', () => {
        test('-100 + 0% is -100', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 }
                }
            });
            expect(char.stats.spellPower).toBe(-100);
        });

        test('-100 + 10% is -90', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: 0.10 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(-90);
        });

        test('-100 + 50% is -50', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: 0.50 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(-50);
        });

        test('-100 + -100% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: 1.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('-100 + 1000% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: 10.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('-100 - 10% is 110', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: -0.10 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(-110);
        });

        test('-100 - 50% is -150', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: -0.50 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(-150);
        });

        test('-100 - 100% is -200', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: -1.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(-200);
        });

        test('-100 - 1000% is -1100', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: -100 },
                    [StatType.SpellPowerPercent]: { base: -10.00 }
                }
            });
            expect(char.stats.spellPower).toBeCloseTo(-1100);
        });
    });

    describe('0 SP', () => {
        test('0 + 0% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });

        test('0 + 10% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 },
                    [StatType.SpellPowerPercent]: { base: 0.10 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });

        test('0 + 50% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 },
                    [StatType.SpellPowerPercent]: { base: 0.50 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });

        test('0 + 100% is 200', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 },
                    [StatType.SpellPowerPercent]: { base: 1.00 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });

        test('0 - 10% is 90', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 },
                    [StatType.SpellPowerPercent]: { base: -0.10 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });

        test('0 - 50% is 50', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 },
                    [StatType.SpellPowerPercent]: { base: -0.50 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });

        test('0 - 100% is 0', () => {
            const char = createTestCharacter({
                statTemplate: {
                    [StatType.SpellPower]: { base: 0 },
                    [StatType.SpellPowerPercent]: { base: -1.00 }
                }
            });
            expect(char.stats.spellPower).toBe(0);
        });
    });
});

describe('accuracy', () => {
    test('One-hand Weapon', () => {
        const char = createTestCharacter({
            equipment: {
                mainHand: test1HWeapon
            }
        });
        expect(char.stats.accuracy).toBe(0);
    });
    test('Two-hand Weapon', () => {
        const char = createTestCharacter({
            equipment: {
                mainHand: test2HWeapon
            }
        });
        expect(char.stats.accuracy).toBe(0);
    });
    test('Dual Wield Weapons', () => {
        const char = createTestCharacter({
            equipment: {
                mainHand: test1HWeapon,
                offHandWeapon: test1HWeapon
            }
        });
        expect(char.stats.accuracy).toBe(Stats.DUAL_WIELD_ACCURACY_PENALTY);
    });
});