import Debuff from '../Debuff';
import DebuffId from '../types/DebuffId';

// TODO: skip turn on turn start
export default class Frozen extends Debuff {
    static name = 'Frozen';

    id = DebuffId.Frozen;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }
    onAttacked() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}