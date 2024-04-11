import Buff from '../Buff';
import { StatusEffectType } from '../StatusEffect';

const Invisible: Buff = {
    type: StatusEffectType.Buff,
    name: 'Invisible',
    symbol: '☁️',
    duration: false,
    stacks: true
};

export default Invisible;