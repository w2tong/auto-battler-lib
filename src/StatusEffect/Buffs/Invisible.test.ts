// TODO: test if all instances are removed on attack

import Battle from '../../Battle';
import Character from '../../Character/Character';
import { getCharBattleId } from '../../util';
import BuffId from '../BuffId';

let char: Character;
let source1: Character;
let source2: Character;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let battle: Battle;

beforeEach(() => {
    char = new Character({
        name: 'Test',
        level: 1,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });

    source1 = new Character({
        name: 'Source 1',
        level: 1,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });

    source2 = new Character({
        name: 'Source 2',
        level: 1,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });

    battle = new Battle([char, source1, source2], []);
});

describe('Invisible - 1 source', () => {
    test('0 stacks', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 0);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toBeUndefined();
    });

    test('1 stack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });

    test('10 stack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });

    test('100 stack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 100);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(100);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });
});

describe('Invisible - 2 sources', () => {
    test('Invisible - 1 stack each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(source1)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.stacks).toBe(2);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });

    test('Invisible - 10 stacks each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 10);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(source1)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.stacks).toBe(20);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });
});

describe('Invisible - 3 sources', () => {
    test('Invisible - 1 stack each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 1);
        char.statusEffectManager.addBuff(BuffId.Invisible, source2, 1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(source1)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(source2)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.stacks).toBe(3);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });

    test('Invisible - 10 stacks each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 10);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 10);
        char.statusEffectManager.addBuff(BuffId.Invisible, source2, 10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(char)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(source1)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.instances[getCharBattleId(source2)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]!.stacks).toBe(30);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });
});