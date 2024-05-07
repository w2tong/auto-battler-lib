import DebuffId from './DebuffId';
import StatusEffect, { StatusEffectType } from './StatusEffect';

export default abstract class Debuff extends StatusEffect {
    abstract readonly id: DebuffId;
    type = StatusEffectType.Debuff;
}