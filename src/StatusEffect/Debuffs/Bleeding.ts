import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Bleeding extends Debuff {
    id = DebuffId.Bleeding;
    name: string = 'Bleeding';
    symbol: string = '🩸';

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        this.char.takeDamage({
            source: `${Bleeding.name} (${this.source.name})`,
            damage: this.remainingDamage ?? 0 / this.stacks,
            armourPenetration: Infinity
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}