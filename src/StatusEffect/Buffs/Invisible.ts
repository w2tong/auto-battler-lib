import Buff from '../Buff';
import BuffId from '../BuffId';

export default class Invisible extends Buff {
    id = BuffId.Invisible;
    name = 'Invisible';
    symbol = '☁️';

    static damage = 2;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() { }
    onAttack() {
        for (const key of Object.keys(this.instances)) {
            this.remove(key);
        }
    }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}