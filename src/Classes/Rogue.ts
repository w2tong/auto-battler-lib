import Character from '../Character';
import { BuffId } from '../Buffs/buffs';

class Rogue extends Character {
    specialAbility(): void {
        if (!this.battle) return;
        this.currMana -= (this.maxMana - this.manaCostReduction);
        this.battle.ref.combatLog.add(`${this.name} used ${'Sneak'}.`);
        this.buffTracker.addBuff(BuffId.Invisible, 1, this);
    }
}

export default Rogue;