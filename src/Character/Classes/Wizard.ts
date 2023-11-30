import { DebuffId } from '../../Buffs/buffs';
import DamageType from '../../DamageType';
import HitType from '../../HitType';
import { rollDice } from '../../dice';
import ManaCharacter from '../ManaCharacter';

class Wizard extends ManaCharacter {
    static description: string = 'Wizard Class description here.';
    static specialName: string = 'Firebolt';
    static specialDescription: string = 'Attack your target and apply Burn.';

    special(): void {
        if (!this.battle) return;
        this.setTarget();
        if (this.target) {
            this.currMana -= (this.maxMana - this.manaCostReduction);
            this.battle.ref.log.add(`${this.name} casted ${'Firebolt'}.`);
            const attack = this.attackRoll(this.mainHand);
            this.battle.ref.log.addAttack(this.name, this.target.name, attack.details, attack.hitType, false);
            if (attack.hitType === HitType.Hit || attack.hitType === HitType.Crit) {
                let damage = rollDice(this.mainHand.damage) + this.mainHand.damageBonus;
                if (attack.hitType === HitType.Crit) damage *= this.mainHand.critMult;
                this.target.takeDamage(this.name, damage, DamageType.Magic);
                this.target?.buffTracker.addDebuff(DebuffId.Burn, 2, this);
            }
        }
    }
}

export default Wizard;