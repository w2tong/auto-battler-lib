import Debuff from '../Debuff';
import RemainingDamage from '../interface/RemainingDamage';
import DebuffId from '../types/DebuffId';
import StatusEffectCtorArgs from '../types/StatusEffectCtorArgs';

export default class Bleeding extends Debuff implements RemainingDamage {
    id = DebuffId.Bleeding;

    _remainingDamage: number;

    constructor(args: StatusEffectCtorArgs & { remainingDamage: number; }) {
        super(args);
        this._remainingDamage = args.remainingDamage;
    }

    get remainingDamage(): number {
        return this._remainingDamage;
    }
    set remainingDamage(damage: number) {
        this._remainingDamage = damage;
    }

    add(bleeding: Bleeding) {
        this.stacks += bleeding.stacks;
        this._remainingDamage += bleeding.remainingDamage;
    }

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