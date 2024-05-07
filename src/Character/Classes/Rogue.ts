import Vanish from '../../Ability/Vanish';
import { AttributeType } from '../Attributes/Attributes';
import StatType from '../Stats/StatType';
import { Stats } from '../Stats/Stats';
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