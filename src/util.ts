import Ability from './Ability/Ability';
import { AttributeType, BaseAttributes } from './Character/Attributes';
import Character from './Character/Character';
import { ClassName } from './Character/Classes/classes';
import { StatTemplate } from './Character/StatTemplate';
import { Equipment } from './Equipment/Equipment';
import { BuffId } from './StatusEffect/Buffs/buffs';
import { DebuffId } from './StatusEffect/Debuffs/debuffs';
import NPC from './npc/NPC';

// Random integer between 0 and max
function getRandomRange(max: number): number {
    return Math.floor(Math.random() * max);
}

function getCharBattleId(char: Character): string {
    return `${char.battle!.side}${char.battle!.index}`;
}

function geOutgoingStatusEffectId(id: BuffId | DebuffId, char: Character) {
    return `${id}-${getCharBattleId(char)}`;
}

function createNPCChar(npc: NPC, level: number, num?: number): Character {
    const attributes: BaseAttributes = {};
    for (const [type, {base, perLvl}] of Object.entries(npc.attributes)) {
        attributes[type as AttributeType] = base + (perLvl ? perLvl * level : 0);
    }

    return new Character({
        name: num ? `${npc.name} ${num}` : npc.name,
        level,
        attributes,
        statTemplate: npc.stats,
        equipment: npc.equipment,
        ability: npc.ability
    });
}

function createPlayerChar({userId, name, level, className, attributes, statTemplate, equipment, ability}: {userId: string, name: string, level: number, className: ClassName, attributes: BaseAttributes, statTemplate: StatTemplate, equipment: Equipment, ability: Ability}): Character {
    return new Character({
        name,
        level,
        className,
        attributes,
        statTemplate,
        equipment,
        ability,
        options: {
            userId
        }
    });
}

export { getRandomRange, getCharBattleId, geOutgoingStatusEffectId, createNPCChar, createPlayerChar };