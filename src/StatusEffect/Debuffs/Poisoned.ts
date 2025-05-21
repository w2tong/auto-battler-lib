import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Poisoned extends Debuff {
    id = DebuffId.Poisoned;

    static baseDamage = 1;
    static healthDamagePercent = 0.01;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        this.char.takeDamage({
            source: `${this.id} (${this.source.name})`,
            damage: (Poisoned.baseDamage + this.char.currentHealth * Poisoned.healthDamagePercent) * this.stacks,
            armourPenetration: Infinity
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}