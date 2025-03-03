import BuffId from '../StatusEffect/BuffId';
import Ability from './Ability';

const NAME = 'Vanish';
const DEX_RATIO = 0.1;

const Vanish: Ability = {
    name: NAME,
    description: `Gain ${DEX_RATIO * 100}% DEX (rounded down, min 1) ${BuffId.Invisible} stacks, causing your next attack to be a sneak attack.`,
    func: (char) => {
        if (!char.battle) return;
        char.useMana();
        char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        char.statusEffectManager.addBuff(BuffId.Invisible, char, Math.max(Math.floor(char.attributes.dexterity * DEX_RATIO), 1));
    }
};

export default Vanish;