import Buff from '../Buff';
import BuffId from '../BuffId';

// TODO: add attribute/stat buff system
export default class Bless extends Buff {
    id = BuffId.Bless;
    name = 'Bless';
    symbol = '🙏';

    onApply() {}
    onExpire() {}

    onTurnStart() {}
    onTurnEnd() {}
    onAttack() {}
    
    onSourceTurnStart() {}
    onSourceTurnEnd() {}
}