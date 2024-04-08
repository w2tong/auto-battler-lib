import Character from '../Character/Character';
import { ClassName } from '../Character/Classes/classes';
import DoubleStrike from './DoubleStrike';
import Firebolt from './Firebolt';
import Vanish from './Vanish';

interface Ability {
    name: string;
    description: string;
    func: (char: Character) => undefined;
}

const ClassAbilities: {[key in ClassName]: Ability} = {
    [ClassName.Fighter]: DoubleStrike,
    [ClassName.Rogue]: Vanish,
    [ClassName.Wizard]: Firebolt,
};

export default Ability;
export { ClassAbilities };