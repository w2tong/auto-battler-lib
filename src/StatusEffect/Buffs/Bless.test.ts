import Battle from '../../Battle';
import AttributeType from '../../Character/Attributes/AttributeType';
import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { getCharBattleId } from '../../util';
import BuffId from '../BuffId';
import Bless from './Bless';

let char: Character;
let source1: Character;
let source2: Character;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let battle: Battle;

const charLevel = 5;
const charWisdom = 10;
const charDamage = Bless.baseDamage + Bless.damagePerLvl * charLevel + Bless.damagePerWisdom * charWisdom;
const charHitChance = Bless.baseHitChance + Bless.hitChancePerLvl * charLevel + Bless.hitChancePerWisdom * charWisdom;

const source1Level = 1;
const source1Wisdom = 0;
const source1Damage = Bless.baseDamage + Bless.damagePerLvl * source1Level + Bless.damagePerWisdom * source1Wisdom;
const source1HitChance = Bless.baseHitChance + Bless.hitChancePerLvl * source1Level + Bless.hitChancePerWisdom * source1Wisdom;

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
        level: 1,
        attributes: {},
        statTemplate: {},
        equipment: {}
    });

    battle = new Battle([char, source1, source2], []);
});

test('Blessing - 1 source, 1 stack', () => {
    char.statusEffectManager.addBuff(BuffId.Bless, char, 1);
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    char.statusEffectManager.turnStart();
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

test('Blessing - 1 source, 3 stacks', () => {
    char.statusEffectManager.addBuff(BuffId.Bless, char, 3);
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(char)].stacks).toBe(3);
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    // 2 stacks
    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.damage).toBeCloseTo(charDamage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance);

    // 0 stacks
    char.statusEffectManager.turnStart();
    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances).toEqual({});
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

test('Blessing - 2 sources, 1 stack each', () => {
    char.statusEffectManager.addBuff(BuffId.Bless, char, 1);
    char.statusEffectManager.addBuff(BuffId.Bless, source1, 1);

    expect(char.statusEffectManager.buffs[BuffId.Bless]!.stacks).toBe(2);
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(char)].stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(charDamage + source1Damage);
    expect(char.stats.hitChance).toBeCloseTo(charHitChance + source1HitChance);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.stacks).toBe(1);
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(char)]).toBeUndefined();
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances[getCharBattleId(source1)].stacks).toBe(1);
    expect(char.stats.damage).toBeCloseTo(source1Damage);
    expect(char.stats.hitChance).toBeCloseTo(source1HitChance);

    source1.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.Bless]!.instances).toEqual({});
    expect(char.stats.damage).toBeCloseTo(0);
    expect(char.stats.hitChance).toBeCloseTo(0);
});

// TODO: add 2 sources, mutiple stacks
// 3 sources, 1 stack
// 3 sources, multiple stacks