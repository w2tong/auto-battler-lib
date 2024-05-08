import Character from '../Character';
import { StatTemplate } from './StatTemplate';

function createCharacter(statTemplate: StatTemplate): Character  {
    return new Character({
        name: '',
        level: 1,
        attributes: {},
        statTemplate,
        equipment: {}
    });
}

describe('setStatsAttribute()', () => {

});

describe('stats', () => {

});