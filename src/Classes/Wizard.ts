import Character from '../Character';
import { DebuffId } from '../Buffs/buffs';
import DamageType from '../DamageType';
import HitType from '../HitType';
import { rollDice } from '../dice';
import { generateCombatAttack } from '../CombatLog';

class Wizard extends Character {
    specialAbility(): void {
        if (!this.battle) return;
        this.setTarget();
        if (this.target) {
            this.currMana -= (this.maxMana - this.manaCostReduction);
            this.battle.ref.combatLog.add(`${this.name} casted ${'Firebolt'}.`);
            const attack = this.attackRoll(this.mainHand);
            this.battle.ref.combatLog.add(generateCombatAttack(this.name, this.target.name, attack.details, attack.hitType, false));
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