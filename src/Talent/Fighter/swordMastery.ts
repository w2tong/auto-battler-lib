import Talent, { Chance } from '../Talent';

// TODO: add conditions for longsword vs greatsword e.g. greatsword applies more stacks
const swordMastery: Talent & Chance = {
    id: 'swordMastery',
    name: 'Sword Mastery',
    description: '25% chance to apply 1 Bleed to enemies on attack.',

    chance: 0.25
} as const;

export default swordMastery;