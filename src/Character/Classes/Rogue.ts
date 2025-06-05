import Vanish from '../../Ability/Vanish';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Rogue: Class = {
    name: 'Rogue',
    description: 'Rogues are agile dual-wielders who excel at striking from the shadows and delivering powerful sneak attacks.',
    attributes: {
        [AttributeType.Strength]: 5,
        [AttributeType.Dexterity]: 5
    },
    stats: {},
    ability: Vanish
} as const;

export default Rogue;