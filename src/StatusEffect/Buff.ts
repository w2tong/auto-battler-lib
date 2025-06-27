import StatusEffect from './StatusEffect';
import type BuffId from './types/BuffId';
import type StatusEffectType from './types/StatusEffectType';

export default abstract class Buff extends StatusEffect {
    abstract readonly id: BuffId;
    type: StatusEffectType = 'Buff';
}