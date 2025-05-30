import StatusEffect from './StatusEffect';
import DebuffId from './types/DebuffId';
import StatusEffectType from './types/StatusEffectType';

export default abstract class Debuff extends StatusEffect {
    abstract readonly id: DebuffId;
    type: StatusEffectType = 'Debuff';
}