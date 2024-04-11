import Buff from '../Buff';
import { StatusEffectType } from '../StatusEffect';

const Bless: Buff = {
    type: StatusEffectType.Buff,
    name: 'Bless',
    symbol: '🙏',
    duration: true,
    stacks: false
};

export default Bless;