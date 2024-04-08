import { BuffId } from '../Buffs/buffs';
import Ability from './Ability';

const name = 'Vanish';
const Vanish: Ability = {
    name,
    description: `Gain ${BuffId.Invisible} causing your next attack to be a sneak attack.`,
    func: (char) => {
        if (!char.battle) return;
        char.useMana();
        char.battle.ref.log.add(`${char.name} used ${name}.`);
        // TODO: make number of Invisible stacks scale with DEX
        char.buffTracker.addBuff(BuffId.Invisible, 1, char);
    }
};

export default Vanish;