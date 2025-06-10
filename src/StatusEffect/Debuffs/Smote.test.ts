import Battle from '../../Battle/Battle';
import Attributes from '../../Character/Attributes/Attributes';
import AttributeType from '../../Character/Attributes/AttributeType';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import DebuffId from '../types/DebuffId';
import Smote from './Smote';

let char: Character;
let source1: Character;
let source2: Character;

const charLevel = 5;
const charWisdom = 20;
const charAccuracy = -(Smote.baseAccuracy + Smote.accuracyPerLvl * (charLevel - 1) + Smote.accuracyPerWisdom * (charWisdom - Attributes.DEFAULT_VALUE));
const charDamage = -(Smote.baseDamage + Smote.damagePerLvl * (charLevel - 1) + Smote.damagePerWisdom * (charWisdom - Attributes.DEFAULT_VALUE));

const source1Level = 1;
const source1Wisdom = 5;
const source1Accuracy = -(Smote.baseAccuracy + Smote.accuracyPerLvl * (source1Level - 1) + Smote.accuracyPerWisdom * (source1Wisdom - Attributes.DEFAULT_VALUE));
const source1Damage = -(Smote.baseDamage + Smote.damagePerLvl * (source1Level - 1) + Smote.damagePerWisdom * (source1Wisdom - Attributes.DEFAULT_VALUE));

const source2Level = 10;
const source2Wisdom = 15;
const source2Accuracy = -(Smote.baseAccuracy + Smote.accuracyPerLvl * (source2Level - 1) + Smote.accuracyPerWisdom * (source2Wisdom - Attributes.DEFAULT_VALUE));
const source2Damage = -(Smote.baseDamage + Smote.damagePerLvl * (source2Level - 1) + Smote.damagePerWisdom * (source2Wisdom - Attributes.DEFAULT_VALUE));


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

test('Smote - 1 source, 1 stack', () => {
    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.turnEnd();
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Smote - 1 source, 3 stacks', () => {
    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 3
    }));
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(3);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    // 2 stacks
    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    // 0 stacks
    char.statusEffectManager.turnEnd();
    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Smote - 1 source, 2 casts, 1 stack each', () => {
    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);

    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy);
});

test('Smote - 2 sources, 1 and 2 stacks', () => {
    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 1
    }));
    char.statusEffectManager.add(new Smote({
        char,
        source: source1,
        stacks: 2
    }));

    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)]).toBeUndefined();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(source1Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Smote - 2 sources, 2 stack each', () => {
    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 2
    }));
    char.statusEffectManager.add(new Smote({
        char,
        source: source1,
        stacks: 2
    }));

    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});

test('Smote - 3 sources, 1 stack each', () => {
    char.statusEffectManager.add(new Smote({
        char,
        source: char,
        stacks: 1
    }));
    char.statusEffectManager.add(new Smote({
        char,
        source: source1,
        stacks: 2
    }));
    char.statusEffectManager.add(new Smote({
        char,
        source: source2,
        stacks: 3
    }));

    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)].stacks).toBe(2);
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source2)].stacks).toBe(3);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(charDamage + source1Damage + source2Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(charAccuracy + source1Accuracy + source2Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)]).toBeUndefined();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)].stacks).toBe(1);
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source2)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(source1Damage + source2Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(source1Accuracy + source2Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(char)]).toBeUndefined();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source1)]).toBeUndefined();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]![getCharBattleId(source2)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(source2Damage);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(source2Accuracy);

    char.statusEffectManager.turnEnd();
    expect(char.statusEffectManager.debuffs[DebuffId.Smote]!).toStrictEqual({});
    expect(char.stats.getStat(StatType.Damage)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Accuracy)).toBeCloseTo(0);
});