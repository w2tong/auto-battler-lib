import StatusEffect, { StatusEffectType } from '../StatusEffect';
import { BuffId } from './buffs';

export default abstract class Buff extends StatusEffect {
    abstract readonly id: BuffId;
    type = StatusEffectType.Buff;
}