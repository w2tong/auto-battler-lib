import { createTestCharacter } from '../../tests/util';
import Character from '../Character';
import AttributeType from './AttributeType';

let char: Character;
beforeEach(() => {
    char = createTestCharacter({
        attributes: {
            [AttributeType.WeaponSkill]: 5,
            [AttributeType.Strength]: 6,
            [AttributeType.Dexterity]: 7,
            [AttributeType.Perception]: 8,
            [AttributeType.Constitution]: 9,
            [AttributeType.Intelligence]: 10,
            [AttributeType.Wisdom]: 11,
        }
    });
});

describe('Attribute getters/addBonus', () => {
    test('weaponSkill', () => {
        expect(char.attributes.weaponSkill).toBe(5); // 5 + 0
    });
    test('strength', () => {
        expect(char.attributes.strength).toBe(6);
        char.attributes.addBonus(AttributeType.Strength, 1);
        expect(char.attributes.strength).toBe(7); // 6 + 1
    });
    test('dexterity', () => {
        expect(char.attributes.dexterity).toBe(7);
        char.attributes.addBonus(AttributeType.Dexterity, 2);
        expect(char.attributes.dexterity).toBe(9); // 7 + 2
    });
    test('perception', () => {
        expect(char.attributes.perception).toBe(8);
        char.attributes.addBonus(AttributeType.Perception, 3);
        expect(char.attributes.perception).toBe(11); // 8 + 3
    });
    test('constitution', () => {
        expect(char.attributes.constitution).toBe(9);
        char.attributes.addBonus(AttributeType.Constitution, 4);
        expect(char.attributes.constitution).toBe(13); // 9 + 4
    });
    test('intelligence', () => {
        expect(char.attributes.intelligence).toBe(10);
        char.attributes.addBonus(AttributeType.Intelligence, 5);
        expect(char.attributes.intelligence).toBe(15); // 10 + 5
    });
    test('wisdom', () => {
        expect(char.attributes.wisdom).toBe(11);
        char.attributes.addBonus(AttributeType.Wisdom, 6);
        expect(char.attributes.wisdom).toBe(17); // 11 + 6
    });
});

test('addItemAttributes', () => {
    char.attributes.addItemAttributes({
        [AttributeType.WeaponSkill]: 5,
        [AttributeType.Strength]: 10,
        [AttributeType.Dexterity]: 15,
        [AttributeType.Perception]: 20,
        [AttributeType.Constitution]: 25,
        [AttributeType.Intelligence]: 30,
        [AttributeType.Wisdom]: 35,
    });

    expect(char.attributes.weaponSkill).toBe(10); // 5 + 5
    expect(char.attributes.strength).toBe(16); // 6 + 10
    expect(char.attributes.dexterity).toBe(22); // 7 + 15
    expect(char.attributes.perception).toBe(28); // 8 + 20
    expect(char.attributes.constitution).toBe(34); // 9 + 25
    expect(char.attributes.intelligence).toBe(40); // 10 + 30
    expect(char.attributes.wisdom).toBe(46); // 11 + 35
});