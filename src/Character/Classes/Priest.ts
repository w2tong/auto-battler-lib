import Bless from '../../Ability/Bless';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Priest: Class = {
    name: 'Priest',
    description: 'Priest Class description here.',
    attributes: {
        [AttributeType.Constitution]: 5,
        [AttributeType.Wisdom]: 5
    },
    stats: {},
    ability: Bless
} as const;

export default Priest;