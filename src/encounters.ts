import { getRandomRange } from './util';
import Character from './Character/Character';
import Fighter from './Character/Classes/Fighter';
import Rogue from './Character/Classes/Rogue';
import Wizard from './Character/Classes/Wizard';
import { Equipment, defaultEquipment } from './Equipment/Equipment';
import { weapons } from './Equipment/Weapon';
import { CharacterStatTemplate, NPCStats } from './statTemplates';

function createCharsFunc(chars: {class: typeof Character, stats: CharacterStatTemplate, equipment: Equipment, name: string}[], level: number, count: number) {
    return () => {
        const charsArr: Character[] = [];
        if (count === 1) {
            for (const char of chars) {
                charsArr.push(new char.class(level, char.stats, char.equipment, `${char.name}`));
            }
        }
        else {
            for (let i = 0; i < count; i++) {
                for (const char of chars) {
                    charsArr.push(new char.class(level, char.stats, char.equipment, `${char.name} ${i+1}`));
                }
            }
        }
        
        return charsArr;
    };
}

type EncounterParams = {level: number, count: number}
function fighterEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Fighter, stats: NPCStats.Fighter, equipment: defaultEquipment.Fighter, name: NPCStats.Fighter.className}
    ], level, count);
}
function rogueEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Rogue, stats: NPCStats.Rogue, equipment: defaultEquipment.Rogue, name: NPCStats.Rogue.className}
    ], level, count);
}
function wizardEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Wizard, stats: NPCStats.Wizard, equipment: defaultEquipment.Wizard, name: NPCStats.Wizard.className}
    ], level, count);
}
function ratEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Character, stats: NPCStats.Rat, equipment: {mainHand: weapons.poisonbite0}, name: NPCStats.Rat.className}
    ], level, count);
}
function goblinDuoEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Fighter, stats: NPCStats.GoblinFighter, equipment: defaultEquipment.Fighter, name: NPCStats.GoblinFighter.className},
        {class: Rogue, stats: NPCStats.GoblinRogue, equipment: defaultEquipment.Rogue, name: NPCStats.GoblinRogue.className}
    ], level, count);
}
function orcEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Fighter, stats: NPCStats.OrcFighter, equipment: defaultEquipment.Fighter, name: NPCStats.OrcFighter.className},
    ], level, count);
}
function zombieEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Fighter, stats: NPCStats.Zombie, equipment: {mainHand: weapons.poisonbite1}, name: NPCStats.Zombie.className},
    ], level, count);
}
function ogreEncounter({level, count}: EncounterParams) {
    return createCharsFunc([
        {class: Fighter, stats: NPCStats.OgreFighter, equipment: defaultEquipment.Fighter, name: NPCStats.OgreFighter.className},
    ], level, count);
}

const encounters: {[key: number]: Array<() => Character[]>} = {
    1: [
        fighterEncounter({level: 1, count: 1}),
        rogueEncounter({level: 1, count: 1}),
        wizardEncounter({level: 1, count: 1}),
        ratEncounter({level: 1, count: 2}),
        zombieEncounter({level: 1, count: 1}),
    ],
    2: [
        fighterEncounter({level: 2, count: 1}),
        rogueEncounter({level: 2, count: 1}),
        wizardEncounter({level: 2, count: 1}),
        ratEncounter({level: 2, count: 2}),
        zombieEncounter({level: 2, count: 1}),
    ],
    3: [
        fighterEncounter({level: 3, count: 1}),
        rogueEncounter({level: 3, count: 1}),
        wizardEncounter({level: 3, count: 1}),
        ratEncounter({level: 3, count: 3}),
        goblinDuoEncounter({level: 2, count: 1}),
        zombieEncounter({level: 3, count: 1}),
    ],
    4: [
        fighterEncounter({level: 4, count: 1}),
        rogueEncounter({level: 4, count: 1}),
        wizardEncounter({level: 4, count: 1}),
        goblinDuoEncounter({level: 3, count: 1}),
        zombieEncounter({level: 4, count: 1}),
    ],
    5: [
        fighterEncounter({level: 5, count: 1}),
        rogueEncounter({level: 5, count: 1}),
        wizardEncounter({level: 5, count: 1}),
        goblinDuoEncounter({level: 4, count: 1}),
        orcEncounter({level: 5, count: 1}),
        zombieEncounter({level: 5, count: 2}),
        ogreEncounter({level: 5, count: 1}),
    ],
    6: [
        fighterEncounter({level: 6, count: 1}),
        rogueEncounter({level: 6, count: 1}),
        wizardEncounter({level: 6, count: 1}),
        goblinDuoEncounter({level: 5, count: 1}),
        orcEncounter({level: 6, count: 1}),
        zombieEncounter({level: 6, count: 2}),
        ogreEncounter({level: 6, count: 1}),
    ],
    7: [
        fighterEncounter({level: 7, count: 1}),
        rogueEncounter({level: 7, count: 1}),
        wizardEncounter({level: 7, count: 1}),
        goblinDuoEncounter({level: 6, count: 1}),
        orcEncounter({level: 7, count: 1}),
        zombieEncounter({level: 7, count: 2}),
        ogreEncounter({level: 7, count: 1}),
    ],
    8: [
        fighterEncounter({level: 8, count: 1}),
        rogueEncounter({level: 8, count: 1}),
        wizardEncounter({level: 8, count: 1}),
        goblinDuoEncounter({level: 7, count: 1}),
        orcEncounter({level: 8, count: 1}),
        zombieEncounter({level: 8, count: 2}),
        ogreEncounter({level: 8, count: 1}),
    ],
    9: [
        fighterEncounter({level: 9, count: 1}),
        rogueEncounter({level: 9, count: 1}),
        wizardEncounter({level: 9, count: 1}),
        goblinDuoEncounter({level: 8, count: 1}),
        orcEncounter({level: 9, count: 1}),
        zombieEncounter({level: 9, count: 3}),
        ogreEncounter({level: 9, count: 1}),
    ],
    10: [
        fighterEncounter({level: 10, count: 1}),
        rogueEncounter({level: 10, count: 1}),
        wizardEncounter({level: 10, count: 1}),
        goblinDuoEncounter({level: 9, count: 1}),
        orcEncounter({level: 10, count: 1}),
        zombieEncounter({level: 10, count: 3}),
        ogreEncounter({level: 10, count: 1}),
    ],
    11: [
        fighterEncounter({level: 11, count: 1}),
        rogueEncounter({level: 11, count: 1}),
        wizardEncounter({level: 11, count: 1}),
        goblinDuoEncounter({level: 10, count: 1}),
        orcEncounter({level: 11, count: 1}),
        zombieEncounter({level: 11, count: 3}),
        ogreEncounter({level: 11, count: 1}),
    ],
    12: [
        fighterEncounter({level: 12, count: 1}),
        rogueEncounter({level: 12, count: 1}),
        wizardEncounter({level: 12, count: 1}),
        goblinDuoEncounter({level: 11, count: 1}),
        orcEncounter({level: 12, count: 1}),
        zombieEncounter({level: 12, count: 3}),
        ogreEncounter({level: 12, count: 1}),
    ],
    13: [
        fighterEncounter({level: 13, count: 1}),
        rogueEncounter({level: 13, count: 1}),
        wizardEncounter({level: 13, count: 1}),
        goblinDuoEncounter({level: 12, count: 1}),
        orcEncounter({level: 13, count: 1}),
        zombieEncounter({level: 13, count: 4}),
        ogreEncounter({level: 13, count: 1}),
    ],
    14: [
        fighterEncounter({level: 14, count: 1}),
        rogueEncounter({level: 14, count: 1}),
        wizardEncounter({level: 14, count: 1}),
        goblinDuoEncounter({level: 13, count: 1}),
        orcEncounter({level: 14, count: 1}),
        zombieEncounter({level: 14, count: 4}),
        ogreEncounter({level: 14, count: 1}),
    ],
    15: [
        fighterEncounter({level: 15, count: 1}),
        rogueEncounter({level: 15, count: 1}),
        wizardEncounter({level: 15, count: 1}),
        goblinDuoEncounter({level: 14, count: 1}),
        orcEncounter({level: 15, count: 1}),
        zombieEncounter({level: 15, count: 4}),
        ogreEncounter({level: 15, count: 1}),
    ],
    16: [
        fighterEncounter({level: 16, count: 1}),
        rogueEncounter({level: 16, count: 1}),
        wizardEncounter({level: 16, count: 1}),
        goblinDuoEncounter({level: 15, count: 1}),
        orcEncounter({level: 16, count: 1}),
        zombieEncounter({level: 16, count: 4}),
        ogreEncounter({level: 16, count: 1}),
    ],
    17: [
        fighterEncounter({level: 17, count: 1}),
        rogueEncounter({level: 17, count: 1}),
        wizardEncounter({level: 17, count: 1}),
        goblinDuoEncounter({level: 16, count: 1}),
        orcEncounter({level: 17, count: 1}),
        zombieEncounter({level: 17, count: 5}),
        ogreEncounter({level: 18, count: 1}),
    ],
    18: [
        fighterEncounter({level: 18, count: 1}),
        rogueEncounter({level: 18, count: 1}),
        wizardEncounter({level: 18, count: 1}),
        goblinDuoEncounter({level: 17, count: 1}),
        orcEncounter({level: 18, count: 1}),
        zombieEncounter({level: 18, count: 5}),
        ogreEncounter({level: 19, count: 1}),
    ],
    19: [
        fighterEncounter({level: 19, count: 1}),
        rogueEncounter({level: 19, count: 1}),
        wizardEncounter({level: 19, count: 1}),
        goblinDuoEncounter({level: 18, count: 1}),
        orcEncounter({level: 19, count: 1}),
        zombieEncounter({level: 19, count: 5}),
        ogreEncounter({level: 20, count: 1}),
    ],
    20: [
        fighterEncounter({level: 20, count: 1}),
        rogueEncounter({level: 20, count: 1}),
        wizardEncounter({level: 20, count: 1}),
        goblinDuoEncounter({level: 19, count: 1}),
        orcEncounter({level: 20, count: 1}),
        zombieEncounter({level: 20, count: 5}),
    ],
};

function getRandomEncounter(level: number): Character[] {
    const arr = encounters[level];
    return arr[getRandomRange(arr.length)]();
}

export { getRandomEncounter };