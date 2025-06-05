import DoubleStrike from '../../Ability/DoubleStrike';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Fighter: Class = {
    name: 'Fighter',
    description: 'Fighters are resilient frontline warriors. They excel at both offense and defense.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Constitution]: 5
    },
    stats: {},
    ability: DoubleStrike
} as const;

export default Fighter;