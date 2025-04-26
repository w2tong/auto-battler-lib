import Ability from '../Ability/Ability';
import FerociousBite from '../Ability/FerociousBite';
import { weapons } from '../Equipment/Weapon/weapons';
import Character from './Character';
import { StatTemplate } from './Stats/StatTemplate';
import StatType from './Stats/StatType';

const PET_STAT_RATIO = 0.25;

enum PetId {
    Wolf = 'Wolf'
}

const petTemplates: Record<PetId, { statTemplate: StatTemplate, ability: Ability; }> = {
    [PetId.Wolf]: {
        statTemplate: {
            [StatType.MaxHealth]: { base: 10, perLvl: 2 },
            [StatType.Damage]: { base: 0, perLvl: 0.2 }
        },
        ability: FerociousBite
    }
};

function createPet(char: Character, petId: PetId): Character {
    const { statTemplate, ability } = petTemplates[petId];
    const pet = new Character({
        name: `${char.name}'s ${petId}`,
        level: char.level,
        attributes: {},
        statTemplate: statTemplate,
        equipment: {
            mainHand: weapons.bite0
        },
        ability
    });

    // Pet inherits stats from char
    for (const stat of Object.values(StatType)) {
        pet.stats[stat].bonus += (char.stats[stat].attribute + char.stats[stat].bonus) * PET_STAT_RATIO;
    }

    return pet;
}

export { PET_STAT_RATIO, PetId, petTemplates, createPet };