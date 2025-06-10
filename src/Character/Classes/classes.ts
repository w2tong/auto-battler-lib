import ClassName from './ClassName';
import Fighter from './Fighter';
import Priest from './Priest';
import Ranger from './Ranger';
import Rogue from './Rogue';
import Wizard from './Wizard';

const classes = {
    [ClassName.Fighter]: Fighter,
    [ClassName.Priest]: Priest,
    [ClassName.Ranger]: Ranger,
    [ClassName.Rogue]: Rogue,
    [ClassName.Wizard]: Wizard,
} as const;

export default classes;