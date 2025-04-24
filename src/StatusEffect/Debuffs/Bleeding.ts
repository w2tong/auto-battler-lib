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
        for (const [key, instance] of Object.entries(this.instances)) {
            this.char.takeDamage({
                source: `${Bleeding.name} (${instance.source.name})`,
                damage: (Bleeding.baseDamage + this.char.currentHealth * Bleeding.healthDamagePercent) * instance.stacks,
                armourPenetration: Infinity
            });

            instance.stacks -= 1;
            if (instance.stacks <= 0) this.remove(key);
        }
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}