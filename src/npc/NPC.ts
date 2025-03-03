import Ability from '../Ability/Ability';
import AttributeTemplate from '../Character/Attributes/AttributeTemplate';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import { Equipment } from '../Equipment/Equipment';

interface NPC {
    name: string;
    attributes: AttributeTemplate;
    stats: StatTemplate;
    equipment: Equipment;
    ability?: Ability;
}

export default NPC;