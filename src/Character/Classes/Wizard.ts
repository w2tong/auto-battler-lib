import Firebolt from '../../Ability/Firebolt';
import AttributeType from '../Attributes/AttributeType';
import Class from './Class';

const Wizard: Class = {
    name: 'Wizard',
    description: 'Wizards are masterful spellcasters who unleash powerful magic from afar, overwhelming foes with destructive spells.',
    attributes: {
        [AttributeType.Intelligence]: 5,
        [AttributeType.Wisdom]: 5
    },
    stats: {},
    abilities: [Firebolt]
} as const;

export default Wizard;