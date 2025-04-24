import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Burn extends Debuff {
    id = DebuffId.Burning;
    name: string = 'Burning';
    symbol: string = '🔥';

    static baseDamage = 1;
    static spellPowerRatio = 0.2;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        this.char.takeDamage({
            source: `${Burn.name} (${this.source.name})`,
            damage: Burn.baseDamage + this.source.stats.spellPower * Burn.spellPowerRatio,
            armourPenetration: this.source.stats.getStat(StatType.ArmourPenetration)
        });

        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}