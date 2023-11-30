import { BuffId } from '../../Buffs/buffs';
import ManaCharacter from '../ManaCharacter';

class Rogue extends ManaCharacter {
    static description: string = 'Rogue Class description here.';
    static specialName: string = 'Sneak';
    static specialDescription: string = 'Gain Invisibility causing your next attack to be a sneak attack.';

    special(): void {
        if (!this.battle) return;
        this.currMana -= (this.maxMana - this.manaCostReduction);
        this.battle.ref.log.add(`${this.name} used ${'Sneak'}.`);
        this.buffTracker.addBuff(BuffId.Invisible, 1, this);
    }
}

export default Rogue;