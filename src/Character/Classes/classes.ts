import Fighter from './Fighter';
import Priest from './Priest';
import Ranger from './Ranger';
import Rogue from './Rogue';
import Wizard from './Wizard';

enum ClassName {
    Fighter = 'Fighter',
    Priest = 'Priest',
    Ranger = 'Ranger',
    Rogue = 'Rogue',
    Wizard = 'Wizard',
}

const Classes = {
    [ClassName.Fighter]: Fighter,
    [ClassName.Priest]: Priest,
    [ClassName.Ranger]: Ranger,
    [ClassName.Rogue]: Rogue,
    [ClassName.Wizard]: Wizard,
} as const;

export { Classes, ClassName };