import BuffId from '../StatusEffect/BuffId';
import Invisible from '../StatusEffect/Buffs/Invisible';
import Ability from './Ability';

const NAME = 'Vanish';
const DEX_RATIO = 0.1;

const Vanish: Ability = {
    name: NAME,
    description: (char) => {
        const stacks = char ? Math.max(Math.floor(char.attributes.dexterity * DEX_RATIO), 1) : null;
        return `Gain ${stacks} (${DEX_RATIO * 100}% DEX) ${BuffId.Invisible} stacks, causing your next attack to be a sneak attack, dealing ${Invisible.damage} per stack.`;
    },
    func: (char) => {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        char.statusEffectManager.addBuff(BuffId.Invisible, char, Math.max(Math.floor(char.attributes.dexterity * DEX_RATIO), 1));
    }
};

export default Vanish;