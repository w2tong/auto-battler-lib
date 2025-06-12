import StatType from './StatType';

type StatTemplate = { [stat in StatType]?: { base?: number, perLvl?: number; } };

export type { StatTemplate };