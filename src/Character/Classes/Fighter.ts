import DoubleStrike from '../../Ability/DoubleStrike';
import AttributeType from '../Attributes/AttributeType';
import StatType from '../Stats/StatType';
import Stats from '../Stats/Stats';
import Class from './Class';

const Fighter: Class =  {
    name: 'Fighter',
    description: 'Fighter Class description here.',
    attributes: {
        [AttributeType.Strength]: 10,
        [AttributeType.Constitution]: 5
    },
    stats: {
        [StatType.ManaCost]: Stats.DEFAULT_MANA_COST
    },
    ability: DoubleStrike
} as const;

export default Fighter;