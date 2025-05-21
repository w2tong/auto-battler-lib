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
        this.char.takeDamage({
            source: `${this.id} (${this.source.name})`,
            damage: Burning.baseDamage + this.source.stats.spellPower * Burning.spellPowerRatio,
            armourPenetration: this.source.stats.getStat(StatType.ArmourPenetration)
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}