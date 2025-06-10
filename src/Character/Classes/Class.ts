import Ability from '../../Ability/Ability';
import BaseAttributes from '../Attributes/BaseAttributes';
import BaseStats from '../Stats/BaseStats';

type Class = {
    name: string;
    description: string;
    attributes: BaseAttributes;
    stats: BaseStats;
    abilities: readonly Ability[];
};

export default Class;