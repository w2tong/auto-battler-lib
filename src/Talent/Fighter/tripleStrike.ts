import Talent, { Chance } from '../Talent';

const tripleStrike: Talent & Chance = {
    id: 'tripleStrike',
    name: 'Triple Strike',
    description: '25% chance for Double Strike to trigger an additional attack.',

    chance: 0.25
} as const;

export default tripleStrike;