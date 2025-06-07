import Poisoned from '../StatusEffect/Debuffs/Poisoned';
import Ability from './Ability';
import AbilityId from './AbilityId';
import EnvenomWeaponBuff from '../StatusEffect/Buffs/EnvenomWeapon';

const NAME = 'Envenom Weapon';
const STACKS = 3;

const EnvenomWeapon: Ability = {
    id: AbilityId.EnvenomWeapon,
    name: NAME,
    description: () => `Your next ${STACKS} hits apply 2 ${EnvenomWeaponBuff.POISONED_STACKS} ${Poisoned.name} stacks.`,
    func: (char) => {
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        char.useAbilityMana();
        char.statusEffectManager.add(new EnvenomWeaponBuff({
            char,
            source: char,
            stacks: STACKS
        }));
    }
} as const;

export default EnvenomWeapon;