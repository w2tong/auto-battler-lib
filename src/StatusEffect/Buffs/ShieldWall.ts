import StatType from '../../Character/Stats/StatType';
import Buff from '../Buff';
import BuffId from '../types/BuffId';
import StatsInterface, { StatsInterfaceType } from '../interface/StatsInterface';
import Attributes from '../../Character/Attributes/Attributes';
import StatusEffectCtorArgs from '../types/StatusEffectCtorArgs';

export default class ShieldWall extends Buff implements StatsInterface {
    id = BuffId.ShieldWall;
    name = 'Shield Wall';

    static blockChanceBase = 10;
    static blockChancePerLvl = 1;
    static blockChancePerStrength = 0.2;

    static thornsBase = 2;
    static thornsPerLvl = 1;
    static thornsPerStrength = 0.2;

    stats: StatsInterfaceType;

    constructor(args: StatusEffectCtorArgs) {
        super(args);
        this.stats = {
            [StatType.BlockChance]: ShieldWall.calcBlockChance(this.source.level, this.source.attributes.strength),
            [StatType.Thorns]: ShieldWall.calcThorns(this.source.level, this.source.attributes.strength),
        };
    }

    static calcBlockChance(level: number, strength: number): number {
        const perLvl = ShieldWall.blockChancePerLvl * (level - 1);
        const perStrength = ShieldWall.blockChancePerStrength * (strength - Attributes.DEFAULT_VALUE);
        console.log('calcBlockChance', ShieldWall.blockChanceBase, perLvl, perStrength, ShieldWall.blockChanceBase + perLvl + perStrength);
        return ShieldWall.blockChanceBase + perLvl + perStrength;
    }
    static calcThorns(level: number, strength: number): number {
        const perLvl = ShieldWall.thornsPerLvl * (level - 1);
        const perStrength = ShieldWall.thornsPerStrength * (strength - Attributes.DEFAULT_VALUE);
        return ShieldWall.thornsBase + perLvl + perStrength;
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
    onAttacked() { }

    onSourceTurnStart() {
        this.stacks -= 1;
        if (this.stacks <= 0) this.manager.removeBuff(this.id, this.source);
    }
    onSourceTurnEnd() { }
}