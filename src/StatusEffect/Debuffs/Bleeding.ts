import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Bleeding extends Debuff {
    id = DebuffId.Bleeding;
    name: string = 'Bleeding';
    symbol: string = '🤢';

    static baseDamage = 1;
    static healthDamagePercent = 0.01;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        // TODO: change this to be different from poison
        this.char.takeDamage({
            source: `${Bleeding.name} (${this.source.name})`,
            damage: (Bleeding.baseDamage + this.char.currentHealth * Bleeding.healthDamagePercent) * this.stacks,
            armourPenetration: Infinity
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}