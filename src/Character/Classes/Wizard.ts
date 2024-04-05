import { DebuffId } from '../../Buffs/buffs';
import { RangeType } from '../../Equipment/Weapon';
import ManaCharacter from '../ManaCharacter';

class Wizard extends ManaCharacter {
    static description: string = 'Wizard Class description here.';
    static specialName: string = 'Firebolt';
    static specialDescription: string = 'Attack your target and apply Burn.';

    special(): void {
        if (!this.battle) return;
        this.setTarget();
        if (this.target) {
            this.useMana();
            this.battle.ref.log.add(`${this.name} casted ${'Firebolt'}.`);
            const hit = this.attack({
                target: this.target,
                range: RangeType.LongRange,
                damageRange: this.mainHand.damageRange, // replace with damageRange + spell power
                isOffHand: false 
            });

            // this.battle.ref.log.addAttack(this.name, this.target.name, attack.details, attack.hitType, false);
            if (hit) {
                this.target.buffTracker.addDebuff(DebuffId.Burn, 2, this);
            }
        }
    }
}

export default Wizard;