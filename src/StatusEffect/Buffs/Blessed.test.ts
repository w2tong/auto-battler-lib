import Battle from '../../Battle/Battle';
import Attributes from '../../Character/Attributes/Attributes';
import AttributeType from '../../Character/Attributes/AttributeType';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import BuffId from '../types/BuffId';
import Blessed from './Blessed';

let char: Character;
let source1: Character;
let source2: Character;

const charLevel = 5;
const charWisdom = 20;
const charAccuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * (charLevel - 1) + Blessed.accuracyPerWisdom * (charWisdom - Attributes.DEFAULT_VALUE);
const charDamage = Blessed.baseDamage + Blessed.damagePerLvl * (charLevel - 1) + Blessed.damagePerWisdom * (charWisdom - Attributes.DEFAULT_VALUE);

const source1Level = 1;
const source1Wisdom = 5;
const source1Accuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * (source1Level - 1) + Blessed.accuracyPerWisdom * (source1Wisdom - Attributes.DEFAULT_VALUE);
const source1Damage = Blessed.baseDamage + Blessed.damagePerLvl * (source1Level - 1) + Blessed.damagePerWisdom * (source1Wisdom - Attributes.DEFAULT_VALUE);

const source2Level = 10;
const source2Wisdom = 15;
const source2Accuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * (source2Level - 1) + Blessed.accuracyPerWisdom * (source2Wisdom - Attributes.DEFAULT_VALUE);
const source2Damage = Blessed.baseDamage + Blessed.damagePerLvl * (source2Level - 1) + Blessed.damagePerWisdom * (source2Wisdom - Attributes.DEFAULT_VALUE);


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
    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.turnStart();
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Blessing - 1 source, 3 stacks', () => {
    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 3
    }));
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
    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.buffs[BuffId.Blessed]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);
});

test('Blessing - 2 sources, 1 stack each', () => {
    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 1
    }));
    char.statusEffectManager.add(new Blessed({
        char,
        source: source1,
        stacks: 1
    }));

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
    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 2
    }));
    char.statusEffectManager.add(new Blessed({
        char,
        source: source1,
        stacks: 2
    }));

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
    char.statusEffectManager.add(new Blessed({
        char,
        source: char,
        stacks: 1
    }));
    char.statusEffectManager.add(new Blessed({
        char,
        source: source1,
        stacks: 1
    }));
    char.statusEffectManager.add(new Blessed({
        char,
        source: source2,
        stacks: 1
    }));

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