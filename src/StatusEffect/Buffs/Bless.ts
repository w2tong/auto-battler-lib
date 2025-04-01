import Character from '../../Character/Character';
import StatType from '../../Character/Stats/StatType';
import { getCharBattleId } from '../../util';
import Buff from '../Buff';
import BuffId from '../BuffId';

export default class Bless extends Buff {
    id = BuffId.Bless;
    name = 'Bless';
    symbol = '🙏';

    static baseDamage = 4;
    static damagePerLvl = 1;
    static damagePerWisdom = 0.5;

    static baseHitChance = 5;
    static hitChancePerLvl = 0.5;
    static hitChancePerWisdom = 0.2;

    onApply(id: string) {
        const source = this.instances[id].source;

        const damagePerLvl = Bless.damagePerLvl * source.level;
        const damagePerWisdom = Bless.damagePerWisdom * source.attributes.wisdom;
        const hitChancePerLvl = Bless.hitChancePerLvl * source.level;
        const hitChancePerWisdom = Bless.hitChancePerWisdom * source.attributes.wisdom;

        this.instances[id].stats = {
            [StatType.Damage]: Bless.baseDamage + damagePerLvl + damagePerWisdom,
            [StatType.HitChance]: Bless.baseHitChance + hitChancePerLvl + hitChancePerWisdom
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