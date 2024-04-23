import Vanish from '../../Ability/Vanish';
import { AttributeType } from '../Attributes';
import { StatType, Stats } from '../Stats';
import Class from './Class';

const Rogue: Class =  {
    name: 'Rogue',
    description: 'Rogue Class description here.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Dexterity]: 10
    },
    stats: {
        [StatType.MaxMana]: Stats.DEFAULT_MAX_MANA
    },
    ability: Vanish
} as const;

export default Rogue;