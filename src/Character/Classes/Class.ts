import Ability from '../../Ability/Ability';
import BaseAttributes from '../Attributes/BaseAttributes';
import StatType from '../Stats/StatType';
import { BaseStats, Stats } from '../Stats/Stats';

type Class = {
    name: string;
    description: string;
    attributes: BaseAttributes;
    stats: BaseStats & {[StatType.MaxMana]: typeof Stats.DEFAULT_MAX_MANA};
    ability: Ability;
}

export default Class;