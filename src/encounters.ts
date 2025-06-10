import { getRandomRange } from './util';
import Character from './Character/Character';
import NPC, { NpcEquipmentLevel } from './npc/NPC';
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
import { EquipmentImport } from './Equipment/Equipment';

type EncounterGroup = NPC[];
type GroupKey =
    | 'fighter'
    | 'rogue'
    | 'wizard'
    | 'rat'
    | 'goblinDuo'
    | 'orcFighter'
    | 'zombie'
    | 'ogreFighter';

const groups: Record<GroupKey, NPC[]> = {
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
        { group: groups.goblinDuo },
    ],
    5: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    6: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    7: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    8: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    9: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    10: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    11: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    12: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    13: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    14: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    15: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    16: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    17: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    18: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    19: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    20: [
        { group: groups.fighter },
        { group: groups.rogue },
        { group: groups.wizard },
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
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
        if (level > equipLvl && leveledEquipment !== undefined) {
            equipment = leveledEquipment;
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
        ability: npc.ability
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