import DoubleStrike from '../../Ability/DoubleStrike';
import { AttributeType } from '../Attributes';
import { StatType, Stats } from '../Stats';
import Class from './Class';

const Fighter: Class =  {
    name: 'Fighter',
    description: 'Fighter Class description here.',
    attributes: {
        [AttributeType.Strength]: 10,
        [AttributeType.Constitution]: 5
    },
    stats: {
        [StatType.MaxMana]: Stats.DEFAULT_MAX_MANA
    },
    ability: DoubleStrike
} as const;

export default Fighter;