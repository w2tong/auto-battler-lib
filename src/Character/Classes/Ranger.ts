import WoundingShot from '../../Ability/WoundingShot';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Ranger: Class = {
    name: 'Ranger',
    description: 'Ranger Class description here.',
    attributes: {
        [AttributeType.Dexterity]: 5,
        [AttributeType.Perception]: 5,
    },
    stats: {},
    ability: WoundingShot
} as const;

export default Ranger;