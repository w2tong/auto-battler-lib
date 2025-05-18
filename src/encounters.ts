import { getRandomRange } from './util';
import Character from './Character/Character';
import NPC from './npc/NPC';
import Fighter from './npc/Fighter';
import Rogue from './npc/Rogue';
import Wizard from './npc/Wizard';
import Rat from './npc/Rat';
import GoblinFighter from './npc/GoblinFighter';
import GoblinRogue from './npc/GoblinRogue';
import OrcFighter from './npc/OrcFighter';
import Zombie from './npc/Zombie';
import OgreFighter from './npc/OgreFighter';
import LevelRange from './types/LevelRange';
import BaseAttributes from './Character/Attributes/BaseAttributes';
import { calculateBaseAttributes } from './npc/util';

type EncounterGroup = NPC[];
const groups: { [name: string]: NPC[]; } = {
    fighter: [Fighter],
    rogue: [Rogue],
    wizard: [Wizard],
    rat: [Rat],
    goblinDuo: [GoblinFighter, GoblinRogue],
    orcFighter: [OrcFighter],
    zombie: [Zombie],
    ogreFighter: [OgreFighter]
};

const leveledEncounters: Record<LevelRange, { group: EncounterGroup, level?: number, count?: number; }[]> = {
    1: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.rat, count: 2 },
        { group: groups.zombie },
    ],
    2: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.rat, count: 2 },
        { group: groups.zombie },
    ],
    3: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.rat, count: 2 },
        { group: groups.zombie },
    ],
    4: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 3 },
    ],
    5: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 4 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    6: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 5 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    7: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 6 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    8: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 7 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    9: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 8 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    10: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo, level: 9 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    11: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 10 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    12: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 11 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    13: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 12 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    14: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 13 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    15: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 14 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    16: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 15 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    17: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 16 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    18: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 17 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    19: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 18 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
    20: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo, level: 19 },
        { group: groups.orcFighter },
        { group: groups.ogreEncounter },
    ],
};

function createNPCChar(npc: NPC, level: number, num?: number): Character {
    const attributes: BaseAttributes = calculateBaseAttributes(npc.attributes, level);

    return new Character({
        name: num ? `${npc.name} ${num}` : npc.name,
        level,
        attributes,
        statTemplate: npc.stats,
        equipment: npc.equipment,
        ability: npc.ability
    });
}

function createNPCChars(npcs: NPC[], level: number, count: number = 1): Character[] {
    const chars: Character[] = [];

    if (count === 1) {
        for (const npc of npcs) {
            chars.push(createNPCChar(npc, level));
        }
    }
    else {
        for (let i = 1; i <= count; i++) {
            for (const npc of npcs) {
                chars.push(createNPCChar(npc, level, i));
            }
        }
    }

    return chars;
}


function getRandomEncounter(level: LevelRange): Character[] {
    const encounters = leveledEncounters[level];
    const encounter = encounters[getRandomRange(encounters.length)];

    return createNPCChars(encounter.group, encounter.level ?? level, encounter.count);
}

export { getRandomEncounter, createNPCChars };