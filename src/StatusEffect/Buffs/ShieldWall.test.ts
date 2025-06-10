import ShieldWall from './ShieldWall';
import BuffId from '../types/BuffId';
import StatType from '../../Character/Stats/StatType';
import Character from '../../Character/Character';
import AttributeType from '../../Character/Attributes/AttributeType';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import Attributes from '../../Character/Attributes/Attributes';
import Battle from '../../Battle/Battle';

let char: Character;

const level = 5;
const strength = 20;
const blockChance = ShieldWall.blockChanceBase + ShieldWall.blockChancePerLvl * (level - 1) + ShieldWall.blockChancePerStrength * (strength - Attributes.DEFAULT_VALUE);
const thorns = ShieldWall.thornsBase + ShieldWall.thornsPerLvl * (level - 1) + ShieldWall.thornsPerStrength * (strength - Attributes.DEFAULT_VALUE);

beforeEach(() => {
    char = createTestCharacter({
        level: level,
        attributes: {
            [AttributeType.Strength]: strength
        },
        statTemplate: {
            [StatType.BlockChance]: { base: 0, perLvl: 0 },
            [StatType.Thorns]: { base: 0, perLvl: 0 },
        }
    });
    new Battle([char], []);
});

test('calcBlockChance', () => {
    expect(ShieldWall.calcBlockChance(level, strength)).toBeCloseTo(blockChance);
});

test('calcThorns', () => {
    expect(ShieldWall.calcThorns(level, strength)).toBeCloseTo(thorns);
});

test('Shield Wall - 1 source, 1 stack', () => {
    char.statusEffectManager.add(new ShieldWall({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.buffs[BuffId.ShieldWall]![getCharBattleId(char)].stacks).toBe(1);
    expect(char.stats.getStat(StatType.BlockChance)).toBeCloseTo(blockChance);
    expect(char.stats.getStat(StatType.Thorns)).toBeCloseTo(thorns);

    char.statusEffectManager.turnStart();
    expect(char.stats.getStat(StatType.BlockChance)).toBeCloseTo(0);
    expect(char.stats.getStat(StatType.Thorns)).toBeCloseTo(0);
});

test('Shield Wall - 1 source, 3 stacks', () => {
    char.statusEffectManager.add(new ShieldWall({
        char,
        source: char,
        stacks: 3
    }));
    expect(char.statusEffectManager.buffs[BuffId.ShieldWall]![getCharBattleId(char)].stacks).toBe(3);
    expect(char.stats.getStat(StatType.BlockChance)).toBeCloseTo(blockChance);
    expect(char.stats.getStat(StatType.Thorns)).toBeCloseTo(thorns);

    char.statusEffectManager.turnStart();
    expect(char.statusEffectManager.buffs[BuffId.ShieldWall]![getCharBattleId(char)].stacks).toBe(2);
    expect(char.stats.getStat(StatType.BlockChance)).toBeCloseTo(blockChance);
    expect(char.stats.getStat(StatType.Thorns)).toBeCloseTo(thorns);
});
