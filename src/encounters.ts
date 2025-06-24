import { getRandomRange } from './util';
import Character from './Character/Character';
import NPC, { NpcEquipmentLevel } from './npc/NPC';
import LevelRange from './types/LevelRange';
import BaseAttributes from './Character/Attributes/BaseAttributes';
import { calculateBaseAttributes } from './npc/util';
import { EquipmentImport } from './Equipment/Equipment';

import BanditFighter from './npc/bandit/BanditFighter';
import BanditPriest from './npc/bandit/BanditPriest';
import BanditRanger from './npc/bandit/BanditRanger';
import BanditRogue from './npc/bandit/BanditRogue';
import BanditWizard from './npc/bandit/BanditWizard';

import Rat from './npc/Rat';
import GoblinFighter from './npc/GoblinFighter';
import GoblinRogue from './npc/GoblinRogue';
import OrcFighter from './npc/OrcFighter';
import Zombie from './npc/Zombie';
import OgreFighter from './npc/OgreFighter';


import GoblinPriest from './npc/GoblinPriest';

type EncounterGroup = NPC[];
type GroupKey =
    | 'fighter'
    | 'priest'
    | 'ranger'
    | 'rogue'
    | 'wizard'
    | 'rat'
    | 'goblinFighterPriest'
    | 'goblinFighterRogue'
    | 'goblinPriestRogue'
    | 'orcFighter'
    | 'zombie'
    | 'ogreFighter';

const groups: Record<GroupKey, NPC[]> = {
    // Bandits
    fighter: [BanditFighter],
    priest: [BanditPriest],
    ranger: [BanditRanger],
    rogue: [BanditRogue],
    wizard: [BanditWizard],
    rat: [Rat],
    // Goblins
    goblinFighterPriest: [GoblinFighter, GoblinPriest],
    goblinFighterRogue: [GoblinFighter, GoblinRogue],
    goblinPriestRogue: [GoblinPriest, GoblinRogue],

    orcFighter: [OrcFighter],
    zombie: [Zombie],
    ogreFighter: [OgreFighter]
};

const banditGroup: { group: EncounterGroup; }[] = [
    { group: groups.fighter },
    { group: groups.priest },
    { group: groups.ranger },
    { group: groups.rogue },
    { group: groups.wizard },
];

const goblinGroups: { group: EncounterGroup; }[] = [
    { group: groups.goblinFighterPriest },
    { group: groups.goblinFighterRogue },
    { group: groups.goblinPriestRogue },
];

const leveledEncounters: Record<LevelRange, { group: EncounterGroup, level?: number, count?: number; }[]> = {
    1: [
        ...banditGroup,
        { group: groups.rat, count: 3 },
        { group: groups.zombie, count: 2 },
    ],
    2: [
        ...banditGroup,
        { group: groups.rat, count: 3 },
        { group: groups.zombie, count: 2 },
    ],
    3: [
        ...banditGroup,
        { group: groups.rat, count: 3 },
        { group: groups.zombie, count: 2 },
    ],
    4: [
        ...banditGroup,
        { group: groups.rat, count: 3 },
        { group: groups.zombie, count: 2 },

    ],
    5: [
        ...banditGroup,
        { group: groups.rat, count: 3 },
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    6: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    7: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    8: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    9: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    10: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    11: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    12: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    13: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    14: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    15: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    16: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    17: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    18: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    19: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    20: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        ...goblinGroups,
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
};

function createNpcChar(npc: NPC, level: number, num?: number): Character {
    const attributes: BaseAttributes = calculateBaseAttributes(npc.attributes, level);

    let equipment: EquipmentImport = npc.equipment[1];
    for (const lvl of Object.keys(npc.equipment).reverse()) {
        const equipLvl = Number(lvl) as NpcEquipmentLevel;
        const leveledEquipment = npc.equipment[equipLvl];
        if (level >= equipLvl && leveledEquipment !== undefined) {
            equipment = leveledEquipment;
            break;
        }
    }

    return new Character({
        name: num ? `${npc.name} ${num}` : npc.name,
        level,
        className: npc.className,
        npcId: npc.id,
        attributes,
        statTemplate: npc.stats,
        equipment: equipment,
        ability: npc.ability,
        petId: npc.petId
    });
}

function createNpcChars(npcs: NPC[], level: number, count: number = 1): Character[] {
    const chars: Character[] = [];

    if (count === 1) {
        for (const npc of npcs) {
            chars.push(createNpcChar(npc, level));
        }
    }
    else {
        for (let i = 1; i <= count; i++) {
            for (const npc of npcs) {
                chars.push(createNpcChar(npc, level, i));
            }
        }
    }

    return chars;
}

function getRandomEncounter(level: LevelRange): Character[] {
    const encounters = leveledEncounters[level];
    const encounter = encounters[getRandomRange(encounters.length)];
    return createNpcChars(encounter.group, encounter.level ? encounter.level : level, encounter.count);
}

export { getRandomEncounter, createNpcChars };