import type Ability from './Ability/Ability';
import type BaseAttributes from './Character/Attributes/BaseAttributes';
import Character from './Character/Character';
import { type ClassName } from './Character/Classes/classes';
import { type StatTemplate } from './Character/Stats/StatTemplate';
import { type EquipmentImport } from './Equipment/Equipment';
import type BuffId from './StatusEffect/types/BuffId';
import type DebuffId from './StatusEffect/types/DebuffId';
import type LevelRange from './types/LevelRange';

// Random integer between 0 and max
function getRandomRange(max: number): number {
    return Math.floor(Math.random() * max);
}

function getCharBattleId(char: Character): string {
    return `${char.battle!.side}${char.battle!.index}`;
}

function getOutgoingStatusEffectId(id: BuffId | DebuffId, char: Character) {
    return `${id}-${getCharBattleId(char)}`;
}

function formatNum(num: number, multiplier = 1): number {
    return Number((num * multiplier).toFixed(1));
}

function createPlayerChar({ userId, name, level, className, attributes, statTemplate, equipment, ability }: { userId: string, name: string, level: LevelRange, className: ClassName, attributes: BaseAttributes, statTemplate: StatTemplate, equipment: EquipmentImport, ability: Ability; }): Character {
    // TODO: use class to calculate stuff
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

export { getRandomRange, getCharBattleId, getOutgoingStatusEffectId, createPlayerChar, formatNum };