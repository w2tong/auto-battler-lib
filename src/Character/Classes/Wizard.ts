import Firebolt from '../../Ability/Firebolt';
import { AttributeType } from '../Attributes';
import { StatType, Stats } from '../Stats';
import Class from './Class';

const Wizard: Class =  {
    name: 'Wizard',
    description: 'Wizard Class description here.',
    attributes: {
        [AttributeType.Intelligence]: 10,
        [AttributeType.Wisdom]: 5
    },
    stats: {
        [StatType.MaxMana]: Stats.DEFAULT_MAX_MANA
    },
    ability: Firebolt
} as const;

export default Wizard;