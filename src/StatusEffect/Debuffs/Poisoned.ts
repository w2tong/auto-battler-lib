import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Poison extends Debuff {
    id = DebuffId.Poisoned;
    name: string = 'Poisoned';
    symbol: string = '🤢';

    static baseDamage = 1;
    static healthDamagePercent = 0.01;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        this.char.takeDamage({
            source: `${Poison.name} (${this.source.name})`,
            damage: (Poison.baseDamage + this.char.currentHealth * Poison.healthDamagePercent) * this.stacks,
            armourPenetration: Infinity
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}