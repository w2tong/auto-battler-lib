import StatusEffect from './StatusEffect';
import BuffId from './types/BuffId';
import StatusEffectType from './types/StatusEffectType';

export default abstract class Buff extends StatusEffect {
    abstract readonly id: BuffId;
    type: StatusEffectType = 'Buff';
}