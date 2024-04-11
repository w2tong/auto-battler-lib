import StatusEffect, { StatusEffectType } from './StatusEffect';

interface Buff extends StatusEffect {
    type: StatusEffectType.Buff
}

export default Buff;