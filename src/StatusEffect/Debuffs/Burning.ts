import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Burning extends Debuff {
    id = DebuffId.Burning;

    static baseDamage = 1;
    static spellPowerRatio = 0.2;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        const spellPowerDamage = this.source.stats.spellPower * Burning.spellPowerRatio;
        const damagePercent = 1 + this.source.stats.getStat(StatType.DamagePercent);

        this.char.takeDamage({
            source: `${this.id} (${this.source.name})`,
            damage: (Burning.baseDamage + spellPowerDamage) * damagePercent,
            armourPenetration: this.source.stats.getStat(StatType.ArmourPenetration)
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}