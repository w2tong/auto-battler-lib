import Fighter from './Fighter';
import Rogue from './Rogue';
import Wizard from './Wizard';

enum ClassName {
    Fighter = 'Fighter',
    Rogue = 'Rogue',
    Wizard = 'Wizard'
}

const Classes = {
    [ClassName.Fighter]: Fighter,
    [ClassName.Rogue]: Rogue,
    [ClassName.Wizard]: Wizard
} as const;

export { Classes, ClassName };