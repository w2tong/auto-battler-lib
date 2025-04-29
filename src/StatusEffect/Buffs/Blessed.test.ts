import Battle from '../../Battle/Battle';
import AttributeType from '../../Character/Attributes/AttributeType';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import BuffId from '../BuffId';
import Blessed from './Blessed';

let char: Character;
let source1: Character;
let source2: Character;

const charLevel = 5;
const charWisdom = 10;
const charDamage = Blessed.baseDamage + Blessed.damagePerLvl * charLevel + Blessed.damagePerWisdom * charWisdom;
const charAccuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * charLevel + Blessed.accuracyPerWisdom * charWisdom;

const source1Level = 1;
const source1Wisdom = 0;
const source1Damage = Blessed.baseDamage + Blessed.damagePerLvl * source1Level + Blessed.damagePerWisdom * source1Wisdom;
const source1Accuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * source1Level + Blessed.accuracyPerWisdom * source1Wisdom;

const source2Level = 10;
const source2Wisdom = 5;
const source2Damage = Blessed.baseDamage + Blessed.damagePerLvl * source2Level + Blessed.damagePerWisdom * source2Wisdom;
const source2Accuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * source2Level + Blessed.accuracyPerWisdom * source2Wisdom;

beforeEach(() => {
    char = createTestCharacter({
        level: charLevel,
        attributes: {
            [AttributeType.Wisdom]: charWisdom
        },
        statTemplate: {
            [StatType.Damage]: { base: 0, perLvl: 0 },
            [StatType.Accuracy]: { base: 0, perLvl: 0 },
        }
    });

    source1 = createTestCharacter({
        level: source1Level,
        attributes: {
            [AttributeType.Wisdom]: source1Wisdom
        }
    });

    source2 = createTestCharacter({
        level: source2Level,
        attributes: {
            [AttributeType.Wisdom]: source2Wisdom
        }
    });

    new Battle([char, source1, source2], []);
});

test('Blessing - 1 source, 1 stack', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.turnStart();
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Blessing - 1 source, 3 stacks', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 3);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(3);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    // 2 stacks
    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    // 0 stacks
    char.statusEffectManager.turnStart();
    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Blessing - 1 source, 1 stack per cast', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);
});

test('Blessing - 2 sources, 1 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    char.statusEffectManager.addBuff(BuffId.Blessed, source1, 1);

    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(source1Accuracy);

    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Blessing - 2 sources, 2 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 2);
    char.statusEffectManager.addBuff(BuffId.Blessed, source1, 2);

    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy);

    char.statusEffectManager.turnStart();
    source1.statusEffectManager.turnStart();
    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Blessing - 3 sources, 1 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Blessed, char, 1);
    char.statusEffectManager.addBuff(BuffId.Blessed, source1, 1);
    char.statusEffectManager.addBuff(BuffId.Blessed, source2, 1);

    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source2)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage + source2Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy + source2Accuracy);

    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source2)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source2Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source2Accuracy);

    source2.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source1)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(source2)]).toBeUndefined();
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Blessed]!).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});