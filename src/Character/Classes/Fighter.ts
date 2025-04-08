import DoubleStrike from '../../Ability/DoubleStrike';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Fighter: Class = {
    name: 'Fighter',
    description: 'Fighter Class description here.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Constitution]: 5
    },
    stats: {},
    ability: DoubleStrike
} as const;

export default Fighter;