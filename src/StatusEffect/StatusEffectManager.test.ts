import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import BuffId from './BuffId';
import DebuffId from './DebuffId';
import StatusEffectManager from './StatusEffectManager';

let source1: Character;
let source2: Character;
let statusEffectManager: StatusEffectManager;

beforeEach(() => {
    source1 = createTestCharacter({});
    source2 = createTestCharacter({});

    statusEffectManager = source1.statusEffectManager;
    new Battle([source1, source2], []);
});

// TODO: update tests to include checks for outgoing(de)buffs
describe('addBuff', () => {
    test('0 stacks', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 0);
        expect(statusEffectManager.buffs[BuffId.Blessed]).toBeUndefined();
        statusEffectManager.addBuff(BuffId.Invisible, source1, 0);
        expect(statusEffectManager.buffs[BuffId.Invisible]).toBeUndefined();
    });

    test('1 source, 1 stack', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
        expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
    });

    test('1 source, 2 stack', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
        expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
        statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
        expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(2);
    });

    test('1 source, 2 stack', () => {
        statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
        statusEffectManager.addBuff(BuffId.Blessed, source2, 2);
        expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
        expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source2)].stacks).toBe(2);
    });
});

describe('addDebuff', () => {
    test('0 stacks', () => {
        statusEffectManager.addDebuff(DebuffId.Burning, source1, 0);
        expect(statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
        statusEffectManager.addDebuff(DebuffId.Frozen, source1, 0);
        expect(statusEffectManager.debuffs[DebuffId.Frozen]).toBeUndefined();
        statusEffectManager.addDebuff(DebuffId.Poisoned, source1, 0);
        expect(statusEffectManager.debuffs[DebuffId.Poisoned]).toBeUndefined();
    });

    test('1 source, 1 stack', () => {
        statusEffectManager.addDebuff(DebuffId.Burning, source1, 1);
        expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(1);
    });

    test('1 source, 2 stacks', () => {
        statusEffectManager.addDebuff(DebuffId.Burning, source1, 1);
        expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(1);
        statusEffectManager.addDebuff(DebuffId.Burning, source1, 1);
        expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(2);
    });

    test('2 sources, 1 stack each', () => {
        statusEffectManager.addDebuff(DebuffId.Burning, source1, 1);
        statusEffectManager.addDebuff(DebuffId.Burning, source2, 2);
        expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(1);
        expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source2)].stacks).toBe(2);
    });
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

/*
addOutgoingBuff
addOutgoingDebuff
removeOutgoingBuff
removeOutgoingDebuff
turnStart
turnEnd
onAttack
*/