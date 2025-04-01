import Firebolt from '../../Ability/Firebolt';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Wizard: Class = {
    name: 'Wizard',
    description: 'Wizard Class description here.',
    attributes: {
        [AttributeType.Intelligence]: 5,
        [AttributeType.Wisdom]: 5
    },
    stats: {},
    ability: Firebolt
} as const;

export default Wizard;