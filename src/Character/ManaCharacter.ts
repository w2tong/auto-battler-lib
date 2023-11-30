import Character from './Character';
import { rollDice } from '../dice';

export default abstract class ManaCharacter extends Character {
    abstract special(): void;

    doTurn(): void {
        if (this.potion && this.potion.charges > 0 && this.currHealth <= this.maxHealth/2) {
            const potionHeal = Math.round((rollDice(this.potion.dice) + this.potion.bonus) * this.potionEffectiveness);
            this.addHealth(potionHeal);
            this.potion.charges -= 1;
            if (this.battle) this.battle.ref.log.add(`${this.name} used ${this.potion.name} and healed for ${potionHeal.toLocaleString()}.`);
        }
        if (this.maxMana !== 0 && this.currMana >= this.maxMana - this.manaCostReduction) {
            this.special();
        }
        else {
            this.attack();
        }
        this.addMana(this.manaRegen);
        this.buffTracker.tick();
    }
}