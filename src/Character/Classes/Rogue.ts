import Vanish from '../../Ability/Vanish';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Rogue: Class = {
    name: 'Rogue',
    description: 'Rogue Class description here.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Dexterity]: 5
    },
    stats: {},
    ability: Vanish
} as const;

export default Rogue;