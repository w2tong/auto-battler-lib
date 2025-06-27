import StatusEffect from './StatusEffect';
import type DebuffId from './types/DebuffId';
import type StatusEffectType from './types/StatusEffectType';

export default abstract class Debuff extends StatusEffect {
    abstract readonly id: DebuffId;
    type: StatusEffectType = 'Debuff';
}