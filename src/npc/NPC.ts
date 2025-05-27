import Ability from '../Ability/Ability';
import AttributeTemplate from '../Character/Attributes/AttributeTemplate';
import { ClassName } from '../Character/Classes/classes';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import { EquipmentImport } from '../Equipment/Equipment';

type NpcId = 'fighter' | 'rogue' | 'wizard' |
    'goblinFighter' | 'goblinRogue' | 'orcFighter' | 'ogreFighter' | 'rat' | 'zombie' | 'wolf';

interface NPC {
    id: NpcId;
    name: string;
    className?: ClassName;
    attributes: AttributeTemplate;
    stats: StatTemplate;
    equipment: EquipmentImport;
    ability?: Ability;
}

export { NpcId };
export default NPC;