import { BaseAttributes, AttributeType } from './Attributes';
import Character from '../Character';
import StatType from '../Stats/StatType';
import AttributeStatScaling from './AttributeStatScaling';

function createCharacter(attributes: BaseAttributes): Character  {
    return new Character({
        name: '',
        level: 1,
        attributes,
        statTemplate: {},
        equipment: {}
    });
}

describe('Attribute Stat Scaling', () => {
    describe('Single Attribute', () => {
        test('10 WEA', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.WeaponSkill]: num};
            const character = createCharacter(attributes);
    
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.WeaponSkill])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
    
        test('10 STR', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Strength]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Strength])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
    
        test('10 DEX', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Dexterity]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Dexterity])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
    
        test('10 Peception', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Perception]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Perception])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
    
        test('10 PER', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Perception]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Perception])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
        
        test('10 CON', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Constitution]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Constitution])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
        
        test('10 INT', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Intelligence]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Intelligence])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
        
        test('10 WIS', () => {
            const num = 10;
            const attributes: BaseAttributes = {[AttributeType.Wisdom]: num};
            const character = createCharacter(attributes);
            
            for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.Wisdom])) {
                expect(character.stats[type as StatType].attribute).toEqual(num * scaling);
            }
        });
    });

    describe('Overlapping Attributes', () => {
        test('10 STR, 10 DEX - MeleeDamagePercent', () => {
            const num = 10;
            const attributes: BaseAttributes = {
                [AttributeType.Strength]: num,
                [AttributeType.Dexterity]: num,
            };
            const character = createCharacter(attributes);

            expect(character.stats[StatType.MeleeDamagePercent].attribute).toEqual((AttributeStatScaling.Strength[StatType.MeleeDamagePercent] ?? 0) * num + (AttributeStatScaling.Dexterity[StatType.MeleeDamagePercent] ?? 0) * num);
        });

        test('10 DEX, 10 WIS - Initiative', () => {
            const num = 10;
            const attributes: BaseAttributes = {
                [AttributeType.Dexterity]: num,
                [AttributeType.Wisdom]: num,
            };
            const character = createCharacter(attributes);

            expect(character.stats[StatType.Initiative].attribute).toEqual((AttributeStatScaling.Dexterity[StatType.Initiative] ?? 0) * num + (AttributeStatScaling.Wisdom[StatType.Initiative] ?? 0) * num);
        });

        test('10 CON, 10 INT - Armour', () => {
            const num = 10;
            const attributes: BaseAttributes = {
                [AttributeType.Constitution]: num,
                [AttributeType.Intelligence]: num,
            };
            const character = createCharacter(attributes);

            expect(character.stats[StatType.Armour].attribute).toEqual((AttributeStatScaling.Constitution[StatType.Armour] ?? 0) * num + (AttributeStatScaling.Intelligence[StatType.Armour] ?? 0) * num);
        });

        test('10 INT, 10 WIS - ManaOnHit', () => {
            const num = 10;
            const attributes: BaseAttributes = {
                [AttributeType.Intelligence]: num,
                [AttributeType.Wisdom]: num,
            };
            const character = createCharacter(attributes);

            expect(character.stats[StatType.ManaOnHit].attribute).toEqual((AttributeStatScaling.Intelligence[StatType.ManaOnHit] ?? 0) * num + (AttributeStatScaling.Wisdom[StatType.ManaOnHit] ?? 0) * num);
        });
    });
});
