import Character from './Character';

export default abstract class ManaCharacter extends Character {
    abstract special(): void;

    doTurn(): void {
        this.usePotion();
        
        if (this.stats.maxMana !== 0 && this.currentMana >= this.stats.maxMana) {
            this.special();
        }
        else {
            this.weaponAttack();
        }
        this.addMana(this.stats.manaRegen);
        this.buffTracker.tick();
    }
}