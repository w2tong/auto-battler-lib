import Character from './Character/Character';
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

export { getRandomRange, getCharBattleId, geOutgoingStatusEffectId };