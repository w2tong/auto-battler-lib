import StatusEffect, { StatusEffectType } from '../StatusEffect';

export default abstract class Buff extends StatusEffect {
    type: StatusEffectType = StatusEffectType.Buff;
}