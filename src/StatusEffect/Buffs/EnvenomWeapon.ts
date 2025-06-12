import Character from '../../Character/Character';
import Buff from '../Buff';
import Poisoned from '../Debuffs/Poisoned';
import BuffId from '../types/BuffId';

export default class EnvenomWeapon extends Buff {
    id = BuffId.EnvenomWeapon;
    name = 'Envenom Weapon';

    static POISONED_STACKS = 4;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() { }
    onAttack(hit: boolean, target: Character) {
        if (hit) {
            this.stacks -= 1;
            target.statusEffectManager.add(new Poisoned({
                char: target,
                source: this.char,
                stacks: EnvenomWeapon.POISONED_STACKS
            }));
            if (this.stacks <= 0) this.manager.removeBuff(this.id, this.source);
        }
    }
    onAttacked() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}