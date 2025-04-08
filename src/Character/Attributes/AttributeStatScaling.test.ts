import Character from '../Character';
import StatType from '../Stats/StatType';
import AttributeStatScaling from './AttributeStatScaling';
import AttributeType from './AttributeType';
import BaseAttributes from './BaseAttributes';

function createCharacter(attributes: BaseAttributes): Character {
    return new Character({
        name: '',
        level: 1,
        attributes,
        statTemplate: {},
        equipment: {}
    });
}

describe('Single Attribute', () => {
    test('10 WEA', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.WeaponSkill]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.WeaponSkill])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 STR', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Strength]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Strength])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 DEX', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Dexterity]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Dexterity])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 Peception', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Perception]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Perception])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 PER', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Perception]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Perception])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 CON', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Constitution]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Constitution])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 INT', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Intelligence]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Intelligence])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });

    test('10 WIS', () => {
        const num = 10;
        const attributes: BaseAttributes = { [AttributeType.Wisdom]: num };
        const char = createCharacter(attributes);

        for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Wisdom])) {
            expect(char.stats[type as StatType].attribute).toBeCloseTo(num * scaling);
        }
    });
});

describe('Overlapping Attributes', () => {
    test('10 STR, 10 DEX - MeleeWeaponDamagePercent', () => {
        const num = 10;
        const attributes: BaseAttributes = {
            [AttributeType.Strength]: num,
            [AttributeType.Dexterity]: num,
        };
        const char = createCharacter(attributes);

        expect(char.stats[StatType.MeleeWeaponDamagePercent].attribute).toBeCloseTo((AttributeStatScaling.Strength[StatType.MeleeWeaponDamagePercent] ?? 0) * num + (AttributeStatScaling.Dexterity[StatType.MeleeWeaponDamagePercent] ?? 0) * num);
    });

    test('10 DEX, 10 WIS - Initiative', () => {
        const num = 10;
        const attributes: BaseAttributes = {
            [AttributeType.Dexterity]: num,
            [AttributeType.Wisdom]: num,
        };
        const char = createCharacter(attributes);

        expect(char.stats[StatType.Initiative].attribute).toBeCloseTo((AttributeStatScaling.Dexterity[StatType.Initiative] ?? 0) * num + (AttributeStatScaling.Wisdom[StatType.Initiative] ?? 0) * num);
    });

    test('10 CON, 10 INT - Armour', () => {
        const num = 10;
        const attributes: BaseAttributes = {
            [AttributeType.Constitution]: num,
            [AttributeType.Intelligence]: num,
        };
        const char = createCharacter(attributes);

        expect(char.stats[StatType.Armour].attribute).toBeCloseTo((AttributeStatScaling.Constitution[StatType.Armour] ?? 0) * num + (AttributeStatScaling.Intelligence[StatType.Armour] ?? 0) * num);
    });

    test('10 INT, 10 WIS - ManaOnHit', () => {
        const num = 10;
        const attributes: BaseAttributes = {
            [AttributeType.Intelligence]: num,
            [AttributeType.Wisdom]: num,
        };
        const char = createCharacter(attributes);

        expect(char.stats[StatType.ManaOnHit].attribute).toBeCloseTo((AttributeStatScaling.Intelligence[StatType.ManaOnHit] ?? 0) * num + (AttributeStatScaling.Wisdom[StatType.ManaOnHit] ?? 0) * num);
    });
});