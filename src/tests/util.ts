import BaseAttributes from '../Character/Attributes/BaseAttributes';
import Character from '../Character/Character';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import { Equipment } from '../Equipment/Equipment';

function createCharacter(level: number): Character  {
    return new Character({
        name: '',
        level,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });
}

function createCharacterWithAttributes(level: number, attributes: BaseAttributes): Character  {
    return new Character({
        name: '',
        level,
        attributes,
        statTemplate: {},
        equipment: {}
    });
}

function createCharacterWithTemplate(level: number, statTemplate: StatTemplate): Character  {
    return new Character({
        name: '',
        level,
        attributes: {},
        statTemplate,
        equipment: {}
    });
}

function createCharacterWithEquipment(level: number, equipment: Equipment): Character  {
    return new Character({
        name: '',
        level,
        attributes: {},
        statTemplate: {},
        equipment
    });
}

export { createCharacter, createCharacterWithAttributes, createCharacterWithTemplate, createCharacterWithEquipment };