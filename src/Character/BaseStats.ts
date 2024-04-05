import { ClassName } from './Classes/classes';
import { BaseStats, StatType } from './Stats';

type StatTemplate = {[stat in StatType]?: {base: number, perLvl?: number}};
const PlayerStatTemplate: StatTemplate = {
    [StatType.MaxHealth]: { base: 20, perLvl: 5 },
    [StatType.Dodge]: { base: 50 },

    [StatType.HitChance]: { base: 50 },
    [StatType.CriticalChance]: { base: 5 },
    [StatType.CriticalDamage]: { base: 50 },
    
    [StatType.MaxMana]: { base: 100 },
    [StatType.ManaRegen]: { base: 5 },
    [StatType.ManaOnHit]: { base: 5 },
};

// TODO: fill out NPC stats
const NPCStatTemplate: {[name in ClassName|'Rat'|'GoblinFighter'|'GoblinRogue'|'OrcFighter'|'Zombie'|'OgreFighter']: StatTemplate} = {
    [ClassName.Fighter]: {},
    [ClassName.Rogue]: {},
    [ClassName.Wizard]: {},
    Rat: {},
    GoblinFighter: {},
    GoblinRogue: {},
    OrcFighter: {},
    Zombie: {},
    OgreFighter: {},
};

function calculateBaseStats(template: StatTemplate, level: number): BaseStats {
    const stats: BaseStats = {};
    for (const [stat, {base, perLvl}] of Object.entries(template))
        stats[stat as StatType] = base + (perLvl ? perLvl * level : 0);
    return stats;
}

export { PlayerStatTemplate, NPCStatTemplate, calculateBaseStats };