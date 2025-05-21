import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Bleeding extends Debuff {
    id = DebuffId.Bleeding;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        if (this.remainingDamage) {
            const damage = this.remainingDamage / this.stacks;
            this.char.takeDamage({
                source: `${this.id} (${this.source.name})`,
                damage,
                armourPenetration: Infinity
            });
            this.remainingDamage -= damage;
        }

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}