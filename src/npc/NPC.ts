import Ability from '../Ability/Ability';
import AttributeTemplate from '../Character/Attributes/AttributeTemplate';
import { ClassName } from '../Character/Classes/classes';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import { EquipmentImport } from '../Equipment/Equipment';

interface NPC {
    name: string;
    className?: ClassName;
    attributes: AttributeTemplate;
    stats: StatTemplate;
    equipment: EquipmentImport;
    ability?: Ability;
}

export default NPC;