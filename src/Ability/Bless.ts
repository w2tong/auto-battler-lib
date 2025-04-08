import BuffId from '../StatusEffect/BuffId';
import Ability from './Ability';

const NAME = 'Bless';
const STACKS = 3;

const Bless: Ability = {
    name: NAME,
    description: `Gain ${STACKS} ${BuffId.Blessed} stacks, increasing Damage and Hit Chance.`,
    func: (char) => {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        // TODO: add targeting system for blessing allies
        char.statusEffectManager.addBuff(BuffId.Blessed, char, STACKS);
    }
};

export default Bless;