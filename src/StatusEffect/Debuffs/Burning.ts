import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import type DamageTaken from '../interface/DamageTaken';
import DebuffId from '../types/DebuffId';

export default class Burning extends Debuff implements DamageTaken {
    static name = 'Burning';
    static baseDamage = 2;
    static spellPowerRatio = 0.12;

    id = DebuffId.Burning;

    calcDamage(): number {
        const spellPowerDamage = this.source.stats.spellPower * Burning.spellPowerRatio;
        const damagePercent = 1 + this.source.stats.getStat(StatType.DamagePercent);

        return (Burning.baseDamage + spellPowerDamage) * damagePercent;
    }

    getDamageTaken(): number {
        return this.char.calcDamageTaken(this.calcDamage(), this.source.stats.getStat(StatType.ArmourPenetration));
    }

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        this.char.takeDamage({
            source: `${this.id} (${this.source.name})`,
            damage: this.calcDamage(),
            armourPenetration: this.source.stats.getStat(StatType.ArmourPenetration)
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }
    onAttacked() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}