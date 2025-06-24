import type Ability from '../../Ability/Ability';
import type BaseAttributes from '../Attributes/BaseAttributes';
import type BaseStats from '../Stats/BaseStats';

type Class = {
    name: string;
    description: string;
    attributes: BaseAttributes;
    stats: BaseStats;
    abilities: readonly Ability[];
};

export default Class;