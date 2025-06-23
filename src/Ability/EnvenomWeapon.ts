import Poisoned from '../StatusEffect/Debuffs/Poisoned';
import Ability from './Ability';
import AbilityId from './AbilityId';
import EnvenomWeaponBuff from '../StatusEffect/Buffs/EnvenomWeapon';

const STACKS = 3;

const EnvenomWeapon: Ability = {
    id: AbilityId.EnvenomWeapon,
    name: 'Envenom Weapon',
    description: () => `Your next ${STACKS} hits applies ${EnvenomWeaponBuff.POISONED_STACKS} ${Poisoned.name}.`,
    func: function (char) {
        if (char.battle) char.battle.ref.log.addAbility(char.name, this.name);

        char.useAbilityMana();
        char.statusEffectManager.add(new EnvenomWeaponBuff({
            char,
            source: char,
            stacks: STACKS
        }));
    }
} as const;

export default EnvenomWeapon;