import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import BuffId from './BuffId';
import DebuffId from './DebuffId';
import StatusEffectManager from './StatusEffectManager';

enum StatusEffectType {
    Buff = 'Buff',
    Debuff = 'Debuff'
}

abstract class StatusEffect {
    abstract readonly id: BuffId | DebuffId;
    abstract readonly type: StatusEffectType;
    abstract readonly name: string;
    abstract readonly symbol: string;
    readonly manager: StatusEffectManager;
    readonly char: Character;
    readonly source: Character;
    stacks: number;
    stats?: { [stat in StatType]?: number };

    constructor(manager: StatusEffectManager, char: Character, source: Character, stacks: number, optional?: { stats?: { [stat in StatType]?: number }; }) {
        this.manager = manager;
        this.char = char;
        this.source = source;
        this.stacks = stacks;
        if (optional?.stats) this.stats = optional.stats;
    }

    addStacks(stacks: number) {
        this.stacks += stacks;
    }

    // Status Effect events
    abstract onApply(): void;
    abstract onExpire(): void;
    // Char events
    abstract onTurnStart(): void;
    abstract onTurnEnd(): void;
    abstract onAttack(hit: boolean): void;
    // Source events
    abstract onSourceTurnStart(source: Character): void;
    abstract onSourceTurnEnd(source: Character): void;
}

export default StatusEffect;
export { StatusEffectType };