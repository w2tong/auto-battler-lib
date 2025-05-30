import Character from '../Character/Character';
import BuffId from './types/BuffId';
import DebuffId from './types/DebuffId';
import StatusEffectManager from './StatusEffectManager';
import StatusEffectCtorArgs from './types/StatusEffectCtorArgs';
import StatusEffectType from './types/StatusEffectType';

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