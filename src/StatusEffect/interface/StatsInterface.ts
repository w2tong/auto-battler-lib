import StatType from '../../Character/Stats/StatType';

type StatsInterfaceType = { [stat in StatType]?: number };
interface StatsInterface {
    stats: StatsInterfaceType;
}

export default StatsInterface;
export type { StatsInterfaceType };