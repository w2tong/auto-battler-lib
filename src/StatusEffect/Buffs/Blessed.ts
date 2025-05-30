import StatType from '../../Character/Stats/StatType';
import Buff from '../Buff';
import BuffId from '../BuffId';
import StatsInterface, { StatsInterfaceType } from '../interface/StatsInterface';

export default class Blessed extends Buff implements StatsInterface {
    id = BuffId.Blessed;

    static baseDamage = 4;
    static damagePerLvl = 1;
    static damagePerWisdom = 0.5;

    static baseAccuracy = 5;
    static accuracyPerLvl = 0.5;
    static accuracyPerWisdom = 0.2;

    stats: StatsInterfaceType = {};

    onApply() {
        const damagePerLvl = Blessed.damagePerLvl * this.source.level;
        const damagePerWisdom = Blessed.damagePerWisdom * this.source.attributes.wisdom;
        const accuracyPerLvl = Blessed.accuracyPerLvl * this.source.level;
        const accuracyPerWisdom = Blessed.accuracyPerWisdom * this.source.attributes.wisdom;

        this.stats = {
            [StatType.Damage]: Blessed.baseDamage + damagePerLvl + damagePerWisdom,
            [StatType.Accuracy]: Blessed.baseAccuracy + accuracyPerLvl + accuracyPerWisdom
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