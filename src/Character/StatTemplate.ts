import { ClassName } from './Classes/classes';
import { BaseStats, StatType, Stats } from './Stats';

type StatTemplate = {[stat in StatType]?: {base: number, perLvl?: number}};
const PlayerStatTemplate: StatTemplate = {
    [StatType.MaxMana]: { base: 100 }
};

// TODO: fill out NPC stats
const NPCStatTemplate: {[name in ClassName|'Rat'|'GoblinFighter'|'GoblinRogue'|'OrcFighter'|'Zombie'|'OgreFighter']: StatTemplate} = {
    [ClassName.Fighter]: {
        [StatType.HealthPercent]: { base: 0, perLvl: 1 },
        [StatType.Armour]: { base: 30, perLvl: 1 },
        [StatType.Deflection] : { base: 1, perLvl: 0.2 },
        [StatType.Dodge]: { base: 20 },
        [StatType.BlockChance]: { base: 40 },
        [StatType.BlockPower]: { base: 2, perLvl: 0.2 },

        [StatType.HitChance]: { base: Stats.DEFAULT_HIT_CHANCE, perLvl: 1 },

        [StatType.Damage]: { base: 0, perLvl: 0.2 },
        [StatType.DamagePercent]: { base: 0, perLvl: 1 },

        [StatType.ArmourPenetration]: { base: 10, perLvl: 0.5 },
        [StatType.DodgeReduction]: { base: 0, perLvl: 0.5 },

        [StatType.MaxMana]: { base: 100 }
    },
    [ClassName.Rogue]: {},
    [ClassName.Wizard]: {},
    Rat: {
        [StatType.MaxHealth]: { base: 5, perLvl: 2 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE + 10, perLvl: 1 },

        [StatType.HitChance]: { base: Stats.DEFAULT_HIT_CHANCE - 10, perLvl: 1 },

        [StatType.ArmourPenetration]: { base: 0, perLvl: 0.5 },
        [StatType.DodgeReduction]: { base: 0, perLvl: 0.5 },
    },
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

export type { StatTemplate };
export { PlayerStatTemplate, NPCStatTemplate, calculateBaseStats };