import Firebolt from '../../Ability/Firebolt';
import Frostbolt from '../../Ability/Frostbolt';
import AttributeType from '../Attributes/AttributeType';
import type Class from './Class';

const Wizard: Class = {
    name: 'Wizard',
    description: 'Wizards are masterful spellcasters who unleash powerful magic from afar, overwhelming foes with destructive spells.',
    attributes: {
        [AttributeType.Intelligence]: 5,
        [AttributeType.Wisdom]: 5
    },
    stats: {},
    abilities: [Firebolt, Frostbolt]
} as const;

export default Wizard;