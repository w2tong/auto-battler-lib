import ManaCharacter from '../ManaCharacter';

class Fighter extends ManaCharacter {
    static description: string = 'Fighter Class description here.';
    static specialName: string = 'Extra Attack';
    static specialDescription: string = 'Attack your target twice.';

    special(): void {
        if (!this.battle) return;
        this.setTarget();
        if (this.target) {
            this.currMana -= (this.maxMana - this.manaCostReduction);
            this.battle.ref.log.add(`${this.name} used ${Fighter.specialName}.`);
            this.attack();
            this.attack();
        }
    }
}

export default Fighter;