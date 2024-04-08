import ClassAbilities from '../../Ability/ClassAbilities';
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

const ClassDescriptions: {[key in ClassName]: {description: string; abilityName: string, abilityDescription: string}} = {
    [ClassName.Fighter]: {
        description: Fighter.description,
        abilityName: ClassAbilities[ClassName.Fighter].name,
        abilityDescription: ClassAbilities[ClassName.Fighter].description
    },
    [ClassName.Rogue]: {
        description: Rogue.description,
        abilityName: ClassAbilities[ClassName.Rogue].name,
        abilityDescription: ClassAbilities[ClassName.Rogue].description
    },
    [ClassName.Wizard]: {
        description: Wizard.description,
        abilityName: ClassAbilities[ClassName.Wizard].name,
        abilityDescription: ClassAbilities[ClassName.Wizard].description
    }
};

export { Classes, ClassName, ClassDescriptions };