import DoubleStrike from '../../Ability/DoubleStrike';
import ShieldWall from '../../Ability/ShieldWall';
import AttributeType from '../Attributes/AttributeType';
import type Class from './Class';

const Fighter: Class = {
    name: 'Fighter',
    description: 'Fighters are resilient frontline warriors. They excel at both offense and defense.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Constitution]: 5
    },
    stats: {},
    abilities: [DoubleStrike, ShieldWall]
} as const;

export default Fighter;