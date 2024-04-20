import StatusEffect, { StatusEffectType } from '../StatusEffect';
import { DebuffId } from './debuffs';

export default abstract class Debuff extends StatusEffect {
    abstract readonly id: DebuffId;
    type = StatusEffectType.Debuff;
}