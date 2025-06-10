import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import BuffId from '../types/BuffId';
import DebuffId from '../types/DebuffId';
import EnvenomWeapon from './EnvenomWeapon';

let char: Character;
let target: Character;

beforeEach(() => {
    char = createTestCharacter({});
    target = createTestCharacter({});
    new Battle([char], [target]);
});


test('0 stacks', () => {
    char.statusEffectManager.add(new EnvenomWeapon({
        char,
        source: char,
        stacks: 0
    }));
    expect(char.statusEffectManager.buffs[BuffId.EnvenomWeapon]).toBeUndefined();
});

test('1 stack', () => {
    char.statusEffectManager.add(new EnvenomWeapon({
        char,
        source: char,
        stacks: 1
    }));
    expect(char.statusEffectManager.buffs[BuffId.EnvenomWeapon]![getCharBattleId(char)].stacks).toBe(1);

    char.statusEffectManager.onAttack(true, target);
    expect(char.statusEffectManager.buffs[BuffId.EnvenomWeapon]).toStrictEqual({});
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)].stacks).toBe(EnvenomWeapon.POISONED_STACKS);
});

test('10 stack', () => {
    char.statusEffectManager.add(new EnvenomWeapon({
        char,
        source: char,
        stacks: 10
    }));
    expect(char.statusEffectManager.buffs[BuffId.EnvenomWeapon]![getCharBattleId(char)].stacks).toBe(10);

    char.statusEffectManager.onAttack(true, target);
    expect(char.statusEffectManager.buffs[BuffId.EnvenomWeapon]![getCharBattleId(char)].stacks).toBe(9);
    expect(target.statusEffectManager.debuffs[DebuffId.Poisoned]![getCharBattleId(char)].stacks).toBe(EnvenomWeapon.POISONED_STACKS);
});