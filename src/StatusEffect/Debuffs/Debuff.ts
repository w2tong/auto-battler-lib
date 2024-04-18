import StatusEffect, { StatusEffectType } from '../StatusEffect';

export default abstract class Debuff extends StatusEffect {
    type: StatusEffectType = StatusEffectType.Debuff;
}