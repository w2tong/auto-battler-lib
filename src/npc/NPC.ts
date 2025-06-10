import type Ability from '../Ability/Ability';
import type AttributeTemplate from '../Character/Attributes/AttributeTemplate';
import type ClassName from '../Character/Classes/ClassName';
import { type StatTemplate } from '../Character/Stats/StatTemplate';
import { type EquipmentImport } from '../Equipment/Equipment';

type NpcId = 'fighter' | 'rogue' | 'wizard' |
    'goblinFighter' | 'goblinRogue' | 'orcFighter' | 'ogreFighter' | 'rat' | 'zombie' | 'wolf';

type NpcEquipmentLevel = 1 | 5 | 9 | 13 | 17 | 20;

interface NPC {
    id: NpcId;
    name: string;
    className?: ClassName;
    attributes: AttributeTemplate;
    stats: StatTemplate;
    equipment: { 1: EquipmentImport; } & Partial<Record<NpcEquipmentLevel, EquipmentImport>>;
    ability?: Ability;
}

export { NpcId, NpcEquipmentLevel };
export default NPC;