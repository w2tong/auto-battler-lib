import type Ability from '../Ability/Ability';
import FerociousBite from '../Ability/FerociousBite';
import { EquipSlot } from '../Equipment/Equipment';
import { weapons } from '../Equipment/Weapon/weapons';
import { type NpcId } from '../npc/NPC';
import Character from './Character';
import { type StatTemplate } from './Stats/StatTemplate';
import StatType from './Stats/StatType';

const PET_STAT_RATIO = 0.5;

enum PetId {
    Wolf = 'Wolf'
}

const petTemplates: Record<PetId, { id: NpcId, statTemplate: StatTemplate, ability: Ability; }> = {
    [PetId.Wolf]: {
        id: 'wolf',
        statTemplate: {
            [StatType.MaxHealth]: { base: 12, perLvl: 3 },
            [StatType.Armour]: { base: 10 },
            [StatType.Damage]: { base: 0, perLvl: 0.25 }
        },
        ability: FerociousBite
    }
};

function createPet(char: Character, petId: PetId): Character {
    const { id, statTemplate, ability } = petTemplates[petId];
    const pet = new Character({
        name: `${char.name}'s ${petId}`,
        level: char.level,
        npcId: id,
        attributes: {},
        statTemplate: statTemplate,
        equipment: {
            [EquipSlot.MainHand]: weapons.bite0
        },
        ability,
    });

    // Pet inherits stats from char
    for (const stat of Object.values(StatType)) {
        pet.stats[stat].bonus += (char.stats[stat].attribute + char.stats[stat].bonus) * PET_STAT_RATIO;
    }

    return pet;
}

export { PetId, PET_STAT_RATIO, petTemplates, createPet };