import Ability from './Ability/Ability';
import { BaseAttributes } from './Character/Attributes';
import Character from './Character/Character';
import { ClassName } from './Character/Classes/classes';
import { StatTemplate } from './Character/StatTemplate';
import { Equipment } from './Equipment/Equipment';
import { BuffId } from './StatusEffect/Buffs/buffs';
import { DebuffId } from './StatusEffect/Debuffs/debuffs';

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

function createPlayerChar({userId, name, level, className, attributes, statTemplate, equipment, ability}: {userId: string, name: string, level: number, className: ClassName, attributes: BaseAttributes, statTemplate: StatTemplate, equipment: Equipment, ability: Ability}) {
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


export { getRandomRange, getCharBattleId, geOutgoingStatusEffectId, createPlayerChar };