import { ClassName } from '../Character/Classes/classes';
import Ability from './Ability';
import DoubleStrike from './DoubleStrike';
import Firebolt from './Firebolt';
import Vanish from './Vanish';

const ClassAbilities: {[key in ClassName]: Ability} = {
    [ClassName.Fighter]: DoubleStrike,
    [ClassName.Rogue]: Vanish,
    [ClassName.Wizard]: Firebolt,
};

export default ClassAbilities;