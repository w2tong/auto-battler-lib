import { createTestCharacter, createTestStats } from '../tests/util';
import Attributes from './Attributes/Attributes';
import AttributeStatScaling from './Attributes/AttributeStatScaling';
import AttributeType from './Attributes/AttributeType';
import { createPet, PET_STAT_RATIO, PetId, petTemplates } from './Pet';
import Stats from './Stats/Stats';
import StatType from './Stats/StatType';

describe('createPet', () => {
    test('no stats', () => {
        const char = createTestCharacter({});
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: 0 },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 }
        }, char.level));
    });

    // Attributes
    test('100 Dexterity', () => {
        const num = 100;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Dexterity]: num
            }
        });
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: 0 },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 },
            [StatType.Dodge]: { base: Stats.DEFAULT_DODGE, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.Dodge] * (num - Attributes.DEFAULT_VALUE) * PET_STAT_RATIO },
            [StatType.DamagePercent]: { base: 0, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.DamagePercent] * (num - Attributes.DEFAULT_VALUE) * PET_STAT_RATIO },
            [StatType.Initiative]: { base: 0, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.Initiative] * (num - Attributes.DEFAULT_VALUE) * PET_STAT_RATIO }
        }, char.level));
    });

    test('100 Perception', () => {
        const num = 100;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Perception]: num
            }
        });
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: 0 },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 },
            [StatType.Accuracy]: { base: 0, attribute: 0, bonus: AttributeStatScaling.Perception[StatType.Accuracy] * (num - Attributes.DEFAULT_VALUE) * PET_STAT_RATIO }
        }, char.level));
    });

    // Bonus (from equipment)
    test('100 Damage', () => {
        const num = 100;
        const char = createTestCharacter({});
        char.stats.addItemStats({
            [StatType.Damage]: 100
        });
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: num * PET_STAT_RATIO },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 }
        }));
    });
});