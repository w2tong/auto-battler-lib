import { StatType } from './Stats';

type StatTemplate = {[stat in StatType]?: {base: number, perLvl?: number}};

export type { StatTemplate };