import Battle from '../../Battle/Battle';
import AttributeType from '../../Character/Attributes/AttributeType';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { getCharBattleId } from '../../util';
import BuffId from '../BuffId';
import Blessed from './Blessed';

let char: Character;
let source1: Character;
let source2: Character;

const charLevel = 5;
const charWisdom = 10;
const charDamage = Blessed.baseDamage + Blessed.damagePerLvl * charLevel + Blessed.damagePerWisdom * charWisdom;
const charHitChance = Blessed.baseHitChance + Blessed.hitChancePerLvl * charLevel + Blessed.hitChancePerWisdom * charWisdom;

const source1Level = 1;
const source1Wisdom = 0;
const source1Damage = Blessed.baseDamage + Blessed.damagePerLvl * source1Level + Blessed.damagePerWisdom * source1Wisdom;
const source1HitChance = Blessed.baseHitChance + Blessed.hitChancePerLvl * source1Level + Blessed.hitChancePerWisdom * source1Wisdom;

const source2Level = 10;
const source2Wisdom = 5;
const source2Damage = Blessed.baseDamage + Blessed.damagePerLvl * source2Level + Blessed.damagePerWisdom * source2Wisdom;
const source2HitChance = Blessed.baseHitChance + Blessed.hitChancePerLvl * source2Level + Blessed.hitChancePerWisdom * source2Wisdom;

beforeEach(() => {
    char = new Character({
        name: 'Test',
        level: charLevel,
        attributes: {
            [AttributeType.Wisdom]: charWisdom
        },
        statTemplate: {
            [StatType.Damage]: { base: 0, perLvl: 0 },
            [StatType.HitChance]: { base: 0, perLvl: 0 },
        },
        equipment: {}
    });

    source1 = new Character({
        name: 'Source 1',
        level: source1Level,
        attributes: {
            [AttributeType.Wisdom]: source1Wisdom
        },
        statTemplate: {},
        equipment: {}
    });

    source2 = new Character({
        name: 'Source 2',
        level: source2Level,
        attributes: {
            [AttributeType.Wisdom]: source2Wisdom
        },
        statTemplate: {},
        equipment: {}
    });

    new Battle([char, source1, source2], []);
});

test('Blessing - 1 source, 1 stack', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    char.statusEffectManager.turnStart();
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

test('Blessing - 1 source, 3 stacks', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 3);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(3);
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    // 2 stacks
    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    // 0 stacks
    char.statusEffectManager.turnStart();
    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances).toEqual({});
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

test('Blessing - 2 sources, 1 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    char.statusEffectManager.addBuff(BuffId.Blessed, source1, 1);

    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(2);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance + source1HitChance);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(source1Damage);
    expect(char.stats.hitChance).toBeCloseTo(source1HitChance);

    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances).toEqual({});
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

test('Blessing - 2 sources, 2 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 2);
    char.statusEffectManager.addBuff(BuffId.Blessed, source1, 2);

    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(4);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(2);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)].stacks).toBe(2);
    expect(char.stats.damage).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance + source1HitChance);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(3);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)].stacks).toBe(2);
    expect(char.stats.damage).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance + source1HitChance);

    char.statusEffectManager.turnStart();
    source1.statusEffectManager.turnStart();
    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances).toEqual({});
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

test('Blessing - 3 sources, 1 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    char.statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
    char.statusEffectManager.addBuff(BuffId.Blessed, source2, 1);

    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(3);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source2)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(charDamage + source1Damage + source2Damage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance + source1HitChance + source2HitChance);

    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(2);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source2)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(charDamage + source2Damage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance + source2HitChance);

    source2.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source1)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances[getCharBattleId(source2)]).toBeUndefined();
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!.instances).toEqual({});
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});