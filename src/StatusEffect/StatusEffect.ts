import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import BuffId from './BuffId';
import DebuffId from './DebuffId';
import StatusEffectManager from './StatusEffectManager';

enum StatusEffectType {
    Buff = 'Buff',
    Debuff = 'Debuff'
}

type StatusEffectOptional = { stats?: { [stat in StatType]?: number }, remainingDamage: number; };

abstract class StatusEffect {
    abstract readonly id: BuffId | DebuffId;
    abstract readonly type: StatusEffectType;
    abstract readonly name: string;
    abstract readonly symbol: string;
    readonly manager: StatusEffectManager;
    readonly char: Character;
    readonly source: Character;
    private _stacks: number;
    stats?: { [stat in StatType]?: number };
    private _remainingDamage?: number;

    constructor(manager: StatusEffectManager, char: Character, source: Character, stacks: number, optional?: StatusEffectOptional) {
        this.manager = manager;
        this.char = char;
        this.source = source;
        this._stacks = stacks;
        if (optional?.stats) this.stats = optional.stats;
        if (optional?.remainingDamage) this._remainingDamage = optional.remainingDamage;
    }

    get stacks() {
        return this._stacks;
    }
    set stacks(num: number) {
        this._stacks = num;
    }

    get remainingDamage(): number | undefined {
        return this._remainingDamage;
    }
    set remainingDamage(num: number) {
        this._remainingDamage = num;
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
export type { StatusEffectOptional };
export { StatusEffectType };