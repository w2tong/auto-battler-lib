import Firebolt from '../../Ability/Firebolt';
import AttributeType from '../Attributes/AttributeType';
import StatType from '../Stats/StatType';
import Stats from '../Stats/Stats';
import Class from './Class';

const Wizard: Class =  {
    name: 'Wizard',
    description: 'Wizard Class description here.',
    attributes: {
        [AttributeType.Intelligence]: 10,
        [AttributeType.Wisdom]: 5
    },
    stats: {
        [StatType.ManaCost]: Stats.DEFAULT_MANA_COST
    },
    ability: Firebolt
} as const;

export default Wizard;