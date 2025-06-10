import { getRandomRange } from './util';
import Character from './Character/Character';
import NPC, { NpcEquipmentLevel } from './npc/NPC';
import Fighter from './npc/bandit/Fighter';
import Rogue from './npc/bandit/Rogue';
import Wizard from './npc/bandit/Wizard';
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
import Priest from './npc/bandit/Priest';
import Ranger from './npc/bandit/Ranger';

type EncounterGroup = NPC[];
type GroupKey =
    | 'fighter'
    | 'priest'
    | 'ranger'
    | 'rogue'
    | 'wizard'
    | 'rat'
    | 'goblinDuo'
    | 'orcFighter'
    | 'zombie'
    | 'ogreFighter';

const groups: Record<GroupKey, NPC[]> = {
    fighter: [Fighter],
    priest: [Priest],
    ranger: [Ranger],
    rogue: [Rogue],
    wizard: [Wizard],
    rat: [Rat],
    goblinDuo: [GoblinFighter, GoblinRogue],
    orcFighter: [OrcFighter],
    zombie: [Zombie],
    ogreFighter: [OgreFighter]
};

const banditGroup: { group: EncounterGroup; }[] = [
    { group: groups.fighter },
    { group: groups.priest },
    { group: groups.rogue },
    { group: groups.rogue },
    { group: groups.wizard },
];

const leveledEncounters: Record<LevelRange, { group: EncounterGroup, level?: number, count?: number; }[]> = {
    1: [
        ...banditGroup,
        { group: groups.rat, count: 2 },
        { group: groups.zombie },
    ],
    2: [
        ...banditGroup,
        { group: groups.rat, count: 2 },
        { group: groups.zombie },
    ],
    3: [
        ...banditGroup,
        { group: groups.rat, count: 2 },
        { group: groups.zombie },
    ],
    4: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
    ],
    5: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    6: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    7: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    8: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    9: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    10: [
        ...banditGroup,
        { group: groups.zombie },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    11: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    12: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    13: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    14: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    15: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    16: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    17: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    18: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    19: [
        ...banditGroup,
        { group: groups.zombie, count: 2 },
        { group: groups.goblinDuo },
        { group: groups.orcFighter },
        { group: groups.ogreFighter },
    ],
    20: [
        ...banditGroup,
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