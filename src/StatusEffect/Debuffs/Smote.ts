import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import DebuffId from '../types/DebuffId';
import StatsInterface, { StatsInterfaceType } from '../interface/StatsInterface';
import Attributes from '../../Character/Attributes/Attributes';
import StatusEffectCtorArgs from '../types/StatusEffectCtorArgs';

export default class Smote extends Debuff implements StatsInterface {
    id = DebuffId.Smote;
    name = 'Smote';

    static baseAccuracy = 4;
    static accuracyPerLvl = 0.5;
    static accuracyPerWisdom = 0.2;

    static baseDamage = 2;
    static damagePerLvl = 0.5;
    static damagePerWisdom = 0.2;

    stats: StatsInterfaceType;

    constructor(args: StatusEffectCtorArgs) {
        super(args);
        this.stats = {
            [StatType.Accuracy]: Smote.calcAccuracy(this.source.level, this.source.attributes.wisdom),
            [StatType.Damage]: Smote.calcDamage(this.source.level, this.source.attributes.wisdom),
        };
    }

    static calcAccuracy(level: number, wisdom: number): number {
        const perLvl = Smote.accuracyPerLvl * (level - 1);
        const perWisdom = Smote.accuracyPerWisdom * (wisdom - Attributes.DEFAULT_VALUE);
        return -(Smote.baseAccuracy + perLvl + perWisdom);
    }
    static calcDamage(level: number, wisdom: number): number {
        const perLvl = Smote.damagePerLvl * (level - 1);
        const perWisdom = Smote.damagePerWisdom * (wisdom - Attributes.DEFAULT_VALUE);
        return -(Smote.baseDamage + perLvl + perWisdom);
    }

    onApply() {
        this.char.stats.addStatusEffectStats(this.stats);
    }
    onExpire() {
        this.char.stats.removeStatusEffectStats(this.stats);
    }

    onTurnStart() { }
    onTurnEnd() {
        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeDebuff(this.id, this.source);
    }
    onAttack() { }
    onAttacked() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}