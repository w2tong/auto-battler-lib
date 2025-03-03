import Ability from '../../Ability/Ability';
import BaseAttributes from '../Attributes/BaseAttributes';
import BaseStats from '../Stats/BaseStats';
import StatType from '../Stats/StatType';
import Stats from '../Stats/Stats';

type Class = {
    name: string;
    description: string;
    attributes: BaseAttributes;
    stats: BaseStats & {[StatType.ManaCost]: typeof Stats.DEFAULT_MANA_COST};
    ability: Ability;
}

export default Class;