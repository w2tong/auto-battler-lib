import Battle from '../Battle/Battle';
import { LineType } from '../Battle/Log';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import EnvenomWeaponBuff from '../StatusEffect/Buffs/EnvenomWeapon';
import Poisoned from '../StatusEffect/Debuffs/Poisoned';
import BuffId from '../StatusEffect/types/BuffId';
import { createTestCharacter } from '../tests/util';
import { getCharBattleId } from '../util';
import EnvenomWeapon from './EnvenomWeapon';

let char: Character;
beforeEach(() => {
    char = createTestCharacter({
        name: 'Enenomer of Weapons',
        statTemplate: {
            [StatType.ManaCost]: { base: 50 },
            [StatType.StartingMana]: { base: 100 },
        }
    });

    new Battle([char], []);
});

test('adds 3 stacks of used Envenom Weapon buff, and adds to log', () => {
    expect(char.currentMana).toBe(100);
    EnvenomWeapon.func(char);
    expect(char.currentMana).toBe(50);
    expect(char.statusEffectManager.buffs[BuffId.EnvenomWeapon]![getCharBattleId(char)].stacks).toBe(3);
    expect(char.battle?.ref.log.last[0]).toEqual({ type: LineType.Ability, name: 'Enenomer of Weapons', ability: EnvenomWeapon.name });
});

test('Description', () => {
    expect(EnvenomWeapon.description()).toBe(
        `Your next 3 hits applies ${EnvenomWeaponBuff.POISONED_STACKS} ${Poisoned.name}.`
    );
});