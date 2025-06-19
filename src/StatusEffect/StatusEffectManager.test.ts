import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import BuffId from './types/BuffId';
import Blessed from './Buffs/Blessed';
import Invisible from './Buffs/Invisible';
import DebuffId from './types/DebuffId';
import Bleeding from './Debuffs/Bleeding';
import Burning from './Debuffs/Burning';
import Frozen from './Debuffs/Frozen';
import Poisoned from './Debuffs/Poisoned';
import StatusEffectManager from './StatusEffectManager';
import StatType from '../Character/Stats/StatType';

let source1: Character;
let source2: Character;
let source3: Character;
let statusEffectManager: StatusEffectManager;

beforeEach(() => {
    source1 = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Initiative]: { base: 100 }
        }
    });
    source2 = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Initiative]: { base: 0 }
        }
    });
    source3 = createTestCharacter({
        statTemplate: {
            [StatType.MaxHealth]: { base: 100 },
            [StatType.Initiative]: { base: -100 }
        }
    });

    statusEffectManager = source1.statusEffectManager;
    new Battle([source1, source2], [source3]);
});

// TODO: update tests to include checks for outgoing(de)buffs
describe('add buff', () => {
    describe('stacks', () => {
        test('0 stacks', () => {
            statusEffectManager.add(new Blessed({
                char: source1,
                source: source1,
                stacks: 0
            }));
            expect(statusEffectManager.buffs[BuffId.Blessed]).toBeUndefined();
            statusEffectManager.add(new Invisible({
                char: source1,
                source: source1,
                stacks: 0
            }));
            expect(statusEffectManager.buffs[BuffId.Invisible]).toBeUndefined();
        });
        test('1 source, 1 stack', () => {
            statusEffectManager.add(new Blessed({
                char: source1,
                source: source1,
                stacks: 1
            }));
            expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
        });
        test('1 source, 2 stacks', () => {
            statusEffectManager.add(new Blessed({
                char: source1,
                source: source1,
                stacks: 1
            }));
            statusEffectManager.add(new Blessed({
                char: source1,
                source: source1,
                stacks: 1
            }));
            expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(2);
        });
        test('2 sources, 1 stack', () => {
            statusEffectManager.add(new Blessed({
                char: source1,
                source: source1,
                stacks: 1
            }));
            statusEffectManager.add(new Blessed({
                char: source1,
                source: source2,
                stacks: 1
            }));
            expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
            expect(statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source2)].stacks).toBe(1);
        });
    });
});

describe('add debuff', () => {
    describe('stacks', () => {
        test('0 stacks', () => {
            statusEffectManager.add(new Bleeding({
                char: source1,
                source: source1,
                stacks: 0,
                remainingDamage: 0
            }));
            expect(statusEffectManager.debuffs[DebuffId.Bleeding]).toBeUndefined();
            statusEffectManager.add(new Burning({
                char: source1,
                source: source1,
                stacks: 0
            }));
            expect(statusEffectManager.debuffs[DebuffId.Burning]).toBeUndefined();
            statusEffectManager.add(new Frozen({
                char: source1,
                source: source1,
                stacks: 0
            }));
            expect(statusEffectManager.debuffs[DebuffId.Frozen]).toBeUndefined();
            statusEffectManager.add(new Poisoned({
                char: source1,
                source: source1,
                stacks: 0
            }));
            expect(statusEffectManager.debuffs[DebuffId.Poisoned]).toBeUndefined();
        });
        test('1 source, 1 stack', () => {
            statusEffectManager.add(new Burning({
                char: source1,
                source: source1,
                stacks: 1
            }));
            expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(1);
        });
        test('1 source, 2 stacks', () => {
            statusEffectManager.add(new Burning({
                char: source1,
                source: source1,
                stacks: 1
            }));
            statusEffectManager.add(new Burning({
                char: source1,
                source: source1,
                stacks: 1
            }));
            expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(2);
        });
        test('2 sources, 1 stack each', () => {
            statusEffectManager.add(new Burning({
                char: source1,
                source: source1,
                stacks: 1
            }));
            statusEffectManager.add(new Burning({
                char: source1,
                source: source2,
                stacks: 1
            }));
            expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source1)].stacks).toBe(1);
            expect(statusEffectManager.debuffs[DebuffId.Burning]![getCharBattleId(source2)].stacks).toBe(1);
        });
    });
});

describe('getBuffStacks', () => {
    test('0 stacks', () => {
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(0);
        expect(statusEffectManager.getBuffStacks(BuffId.Invisible)).toBe(0);
    });
    test('Blessed - 1 source, 1 stack', () => {
        statusEffectManager.add(new Blessed({
            char: source1,
            source: source1,
            stacks: 1
        }));
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(1);
    });
    test('Blessed - 1 source, 3 stacks', () => {
        statusEffectManager.add(new Blessed({
            char: source1,
            source: source1,
            stacks: 3
        }));
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(3);
    });
    test('Blessed - 2 sources, 1 stack each', () => {
        statusEffectManager.add(new Blessed({
            char: source1,
            source: source1,
            stacks: 1
        }));
        statusEffectManager.add(new Blessed({
            char: source1,
            source: source2,
            stacks: 1
        }));
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(2);
    });
    test('Blessed - 2 sources, 3 stacks each', () => {
        statusEffectManager.add(new Blessed({
            char: source1,
            source: source1,
            stacks: 3
        }));
        statusEffectManager.add(new Blessed({
            char: source1,
            source: source2,
            stacks: 3
        }));
        expect(statusEffectManager.getBuffStacks(BuffId.Blessed)).toBe(6);
    });
});

test('Character status effects should stop after death', () => {
    expect(1).toBe(1);
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