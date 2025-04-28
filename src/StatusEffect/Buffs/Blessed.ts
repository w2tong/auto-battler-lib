import StatType from '../../Character/Stats/StatType';
import Buff from '../Buff';
import BuffId from '../BuffId';

export default class Bless extends Buff {
    id = BuffId.Blessed;
    name = 'Bless';
    symbol = '🙏';

    static baseDamage = 4;
    static damagePerLvl = 1;
    static damagePerWisdom = 0.5;

    static baseAccuracy = 5;
    static accuracyPerLvl = 0.5;
    static accuracyPerWisdom = 0.2;

    onApply() {
        const damagePerLvl = Bless.damagePerLvl * this.source.level;
        const damagePerWisdom = Bless.damagePerWisdom * this.source.attributes.wisdom;
        const accuracyPerLvl = Bless.accuracyPerLvl * this.source.level;
        const accuracyPerWisdom = Bless.accuracyPerWisdom * this.source.attributes.wisdom;

        this.stats = {
            [StatType.Damage]: Bless.baseDamage + damagePerLvl + damagePerWisdom,
            [StatType.Accuracy]: Bless.baseAccuracy + accuracyPerLvl + accuracyPerWisdom
        };

        this.char.stats.addStatusEffectStats(this.stats);

    }
    onExpire() {
        this.char.stats.removeStatusEffectStats(this.stats);
    }

    onTurnStart() { }
    onTurnEnd() { }
    onAttack() { }

    onSourceTurnStart() {
        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeBuff(this.id, this.source);
    }
    onSourceTurnEnd() { }
}