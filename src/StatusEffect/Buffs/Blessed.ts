import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { getCharBattleId } from '../../util';
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

    onApply(id: string) {
        const source = this.instances[id].source;

        const damagePerLvl = Bless.damagePerLvl * source.level;
        const damagePerWisdom = Bless.damagePerWisdom * source.attributes.wisdom;
        const accuracyPerLvl = Bless.accuracyPerLvl * source.level;
        const accuracyPerWisdom = Bless.accuracyPerWisdom * source.attributes.wisdom;

        this.instances[id].stats = {
            [StatType.Damage]: Bless.baseDamage + damagePerLvl + damagePerWisdom,
            [StatType.Accuracy]: Bless.baseAccuracy + accuracyPerLvl + accuracyPerWisdom
        };

        this.char.stats.addStatusEffectStats(this.instances[id].stats);

    }
    onExpire(id: string) {
        if (this.instances[id].stats) {
            this.char.stats.removeStatusEffectStats(this.instances[id].stats);
        }
    }

    onTurnStart() { }
    onTurnEnd() { }
    onAttack() { }

    onSourceTurnStart(source: Character) {
        const id = getCharBattleId(source);
        const instance = this.instances[id];
        instance.stacks -= 1;
        if (instance.stacks <= 0) {
            this.remove(id);
        }
    }
    onSourceTurnEnd() { }
}