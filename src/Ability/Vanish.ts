import { BuffId } from '../StatusEffect/statusEffects';
import Ability from './Ability';

const name = 'Vanish';
const Vanish: Ability = {
    name,
    description: `Gain 10% DEX (rounded down, min 1) ${BuffId.Invisible} stacks, causing your next attack to be a sneak attack.`,
    func: (char) => {
        if (!char.battle) return;
        char.useMana();
        char.battle.ref.log.add(`${char.name} used ${name}.`);
        char.statusEffectManager.addBuff(BuffId.Invisible, {source: char, stacks: Math.max(Math.floor(char.attributes.dexterity/10), 1)});
    }
};

export default Vanish;