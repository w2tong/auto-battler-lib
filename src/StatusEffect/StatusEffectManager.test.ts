import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import BuffId from './BuffId';
import StatusEffectManager from './StatusEffectManager';

let source1: Character;
let source2: Character;
let statusEffectManager: StatusEffectManager;

beforeEach(() => {
    source1 = new Character({
        name: 'Test',
        level: 1,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });
    source2 = new Character({
        name: 'Test',
        level: 1,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });

    statusEffectManager = source1.statusEffectManager;
    new Battle([source1, source2], []);
});

describe('getBuffStacks', () => {
    test('0 stacks', () => {
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(0);
        expect(statusEffectManager.getBuffStacks(BuffId.Invisible)).toBe(0);
    });
    test('Blessed - 1 source, 1 stack', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(1);
    });
    test('Blessed - 1 source, 3 stacks', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 3);
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(3);
    });
    test('Blessed - 2 sources, 1 stack each', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
        statusEffectManager.addBuff(BuffId.Blessed, source2, 1);
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(2);
    });
    test('Blessed - 2 sources, 3 stacks each', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 3);
        statusEffectManager.addBuff(BuffId.Blessed, source2, 3);
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(6);
    });
});

describe('addBuff', () => {

});

describe('addDebuff', () => {

});

/*
addOutgoingBuff
addOutgoingDebuff
removeOutgoingBuff
removeOutgoingDebuff
turnStart
turnEnd
onAttack
*/