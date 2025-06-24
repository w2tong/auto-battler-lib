import Bless from '../../Ability/Bless';
import Smite from '../../Ability/Smite';
import AttributeType from '../Attributes/AttributeType';
import type Class from './Class';

const Priest: Class = {
    name: 'Priest',
    description: 'Priests empower their allies in battle, enhancing their stats with divine blessings.',
    attributes: {
        [AttributeType.Constitution]: 5,
        [AttributeType.Wisdom]: 5
    },
    stats: {},
    abilities: [Bless, Smite]
} as const;

export default Priest;