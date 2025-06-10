import Debuff from '../Debuff';
import DebuffId from '../types/DebuffId';

export default class Stunned extends Debuff {
    id = DebuffId.Stunned;
    name = 'Stunned';

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