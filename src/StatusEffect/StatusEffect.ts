import Character from '../Character/Character';
import BuffId from './BuffId';
import DebuffId from './DebuffId';
import StatusEffectManager from './StatusEffectManager';

enum StatusEffectType {
    Buff = 'Buff',
    Debuff = 'Debuff'
}

type StatusEffectCtorArgs = {
    char: Character,
    source: Character,
    stacks: number;
};

abstract class StatusEffect {
    abstract readonly id: BuffId | DebuffId;
    abstract readonly type: StatusEffectType;
    readonly manager: StatusEffectManager;
    readonly char: Character;
    readonly source: Character;
    private _stacks: number;

    constructor({ char, source, stacks }: StatusEffectCtorArgs) {
        this.manager = char.statusEffectManager;
        this.char = char;
        this.source = source;
        this._stacks = stacks;
    }

    get stacks() {
        return this._stacks;
    }
    set stacks(num: number) {
        this._stacks = num;
    }

    add(statusEffect: StatusEffect) {
        this._stacks += statusEffect.stacks;
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
export type { StatusEffectCtorArgs };
export { StatusEffectType };