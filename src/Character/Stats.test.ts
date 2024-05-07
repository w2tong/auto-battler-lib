import { Equipment } from '../Equipment/Equipment';
import { AttributeType, BaseAttributes } from './Attributes';
import Character from './Character';
import { StatTemplate } from './StatTemplate';
import { StatType } from './Stats';

describe('Attribute Scaling', () => {
    const statTemplate: StatTemplate = {};
    const equipment: Equipment = {};

    test('10 Weapon Skill', () => {
        const num = 10;
        const attributes: BaseAttributes = {[AttributeType.WeaponSkill]: num};
        const character: Character = new Character({
            name: '',
            level: 1,
            attributes,
            statTemplate,
            equipment
        });

        // console.log(stats[StatType.HitChance]);
        expect(character.stats[StatType.HitChance].attribute).toEqual(10);

        // for (const [type, scaling] of Object.entries(AttributeStatScaling[AttributeType.WeaponSkill])) {
        //     expect(stats[type as StatType].attribute).toEqual(num * scaling);
        // }
    });
});
