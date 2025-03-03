import Vanish from '../../Ability/Vanish';
import AttributeType from '../Attributes/AttributeType';
import StatType from '../Stats/StatType';
import Stats from '../Stats/Stats';
import Class from './Class';

const Rogue: Class =  {
    name: 'Rogue',
    description: 'Rogue Class description here.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Dexterity]: 10
    },
    stats: {
        [StatType.ManaCost]: Stats.DEFAULT_MANA_COST
    },
    ability: Vanish
} as const;

export default Rogue;