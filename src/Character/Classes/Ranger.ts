import SerpentSting from '../../Ability/SerpentSting';
import WoundingShot from '../../Ability/WoundingShot';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Ranger: Class = {
    name: 'Ranger',
    description: 'Rangers fight alongside a loyal companion and strike from afar.',
    attributes: {
        [AttributeType.Dexterity]: 5,
        [AttributeType.Perception]: 5,
    },
    stats: {},
    abilities: [SerpentSting, WoundingShot]
} as const;

export default Ranger;