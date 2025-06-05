import StatType from '../../Character/Stats/StatType';
import Buff from '../Buff';
import BuffId from '../types/BuffId';
import StatsInterface, { StatsInterfaceType } from '../interface/StatsInterface';
import Attributes from '../../Character/Attributes/Attributes';
import StatusEffectCtorArgs from '../types/StatusEffectCtorArgs';

export default class Blessed extends Buff implements StatsInterface {
    id = BuffId.Blessed;

    static baseAccuracy = 5;
    static accuracyPerLvl = 0.5;
    static accuracyPerWisdom = 0.2;

    static baseDamage = 4;
    static damagePerLvl = 1;
    static damagePerWisdom = 0.5;

    stats: StatsInterfaceType;

    constructor(args: StatusEffectCtorArgs) {
        super(args);
        this.stats = {
            [StatType.Accuracy]: Blessed.calcAccuracy(this.source.level, this.source.attributes.wisdom),
            [StatType.Damage]: Blessed.calcDamage(this.source.level, this.source.attributes.wisdom),
        };
    }

    static calcAccuracy(level: number, wisdom: number): number {
        const perLvl = Blessed.accuracyPerLvl * (level - 1);
        const perWisdom = Blessed.accuracyPerWisdom * (wisdom - Attributes.DEFAULT_VALUE);
        return Blessed.baseAccuracy + perLvl + perWisdom;
    }
    static calcDamage(level: number, wisdom: number): number {
        const perLvl = Blessed.damagePerLvl * (level - 1);
        const perWisdom = Blessed.damagePerWisdom * (wisdom - Attributes.DEFAULT_VALUE);
        return Blessed.baseDamage + perLvl + perWisdom;
    }

    onApply() {
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