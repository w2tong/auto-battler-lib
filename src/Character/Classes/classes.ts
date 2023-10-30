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

const ClassDescriptions: {[key in ClassName]: {description: string; specialName: string, specialDescription: string}} = {
    [ClassName.Fighter]: {
        description: Fighter.description,
        specialName: Fighter.specialName,
        specialDescription: Fighter.specialDescription
    },
    [ClassName.Rogue]: {
        description: Rogue.description,
        specialName: Rogue.specialName,
        specialDescription: Rogue.specialDescription
    },
    [ClassName.Wizard]: {
        description: Wizard.description,
        specialName: Wizard.specialName,
        specialDescription: Wizard.specialDescription
    }
};

export { Classes, ClassName, ClassDescriptions };