import ManaCharacter from '../ManaCharacter';

class Fighter extends ManaCharacter {
    static description: string = 'Fighter Class description here.';
    static specialName: string = 'Extra Attack';
    static specialDescription: string = 'Attack your target twice.';

    special(): void {
        if (!this.battle) return;
        this.setTarget();
        if (this.target) {
            this.useMana();
            this.battle.ref.log.add(`${this.name} used ${Fighter.specialName}.`);
            this.weaponAttack();
            this.weaponAttack();
        }
    }
}

export default Fighter;