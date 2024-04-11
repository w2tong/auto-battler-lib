import Debuff from '../Debuff';
import { StatusEffectType } from '../StatusEffect';

const Frozen: Debuff = {
    type: StatusEffectType.Debuff,
    name: 'Frozen',
    symbol: '🧊',
    duration: true,
    stacks: false,
};

export default Frozen;