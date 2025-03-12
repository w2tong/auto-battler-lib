import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Burn extends Debuff {
    id = DebuffId.Burn;
    name: string = 'Burn';
    symbol: string = '🔥';

    static baseDamage = 1;
    static spellPowerRatio = 0.2;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        for (const [key, instance] of Object.entries(this.instances)) {
            this.char.takeDamage({
                source: `${Burn.name} (${instance.source.name})`,
                damage: Burn.baseDamage + Math.floor(instance.source.stats.spellPower * Burn.spellPowerRatio),
                armourPenetration: instance.source.stats.getStat(StatType.ArmourPenetration)
            });

            instance.stacks -= 1;
            if (instance.stacks <= 0) this.remove(key);
        }
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}