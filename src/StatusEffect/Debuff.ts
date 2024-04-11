import StatusEffect, { StatusEffectType } from './StatusEffect';

interface Debuff extends StatusEffect {
    type: StatusEffectType.Debuff
}

export default Debuff;