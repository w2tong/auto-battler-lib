import Ability from './Ability';

const NAME = 'Double Strike';

const DoubleStrike: Ability = {
    name: NAME,
    description: () => 'Attack an enemy twice with your weapon.',
    func: (char) => {
        if (char.target) {
            if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
            char.useAbilityMana();
            char.turnAttack();
            char.turnAttack();
        }
    }
};

export default DoubleStrike;