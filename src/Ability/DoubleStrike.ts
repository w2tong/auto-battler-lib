import Ability from './Ability';

const name = 'Double Strike';
const DoubleStrike: Ability = {
    name,
    description: 'Attack an enemy twice.',
    func: (char) => {
        if (!char.battle) return;
        char.setTarget();
        if (char.target) {
            char.battle.ref.log.add(`${char.name} used ${name}.`);
            char.useMana();
            char.weaponAttack();
            char.weaponAttack();
        }
    }
};

export default DoubleStrike;