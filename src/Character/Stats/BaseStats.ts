import StatType from './StatType';

type BaseStats = {[stat in StatType]?: number};

export default BaseStats;