import StatusEffect, { StatusEffectType } from './StatusEffect';
import BuffId from './BuffId';

export default abstract class Buff extends StatusEffect {
    abstract readonly id: BuffId;
    type = StatusEffectType.Buff;
}