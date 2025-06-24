import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import type DamageTaken from '../interface/DamageTaken';
import DebuffId from '../types/DebuffId';

export default class Poisoned extends Debuff implements DamageTaken {
    static name = 'Poisoned';
    static baseDamage = 1;
    static healthDamagePercent = 0.01;

    id = DebuffId.Poisoned;

    calcDamage(): number {
        const healthDamage = this.char.currentHealth * Poisoned.healthDamagePercent;
        const damagePercent = 1 + this.source.stats.getStat(StatType.DamagePercent);

        return (Poisoned.baseDamage + healthDamage) * damagePercent * this.stacks;
    }

    getDamageTaken(): number {
        return this.char.calcDamageTaken(this.calcDamage(), Infinity);
    }

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {


        this.char.takeDamage({
            source: `${this.id} (${this.source.name})`,
            damage: this.calcDamage(),
            armourPenetration: Infinity
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }
    onAttacked() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}