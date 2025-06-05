import Bless from '../../Ability/Bless';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Priest: Class = {
    name: 'Priest',
    description: 'Priests empower their allies in battle, enhancing their stats with divine blessings.',
    attributes: {
        [AttributeType.Constitution]: 5,
        [AttributeType.Wisdom]: 5
    },
    stats: {},
    ability: Bless
} as const;

export default Priest;