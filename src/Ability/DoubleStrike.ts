import Ability from './Ability';
import AbilityId from './AbilityId';

const NAME = 'Double Strike';

const DoubleStrike: Ability = {
    id: AbilityId.DoubleStrike,
    name: NAME,
    description: () => 'Attack your target twice with your weapon(s).',
    func: (char) => {
        if (char.target) {
            if (char.battle) char.battle.ref.log.addAbility(char.name, NAME, char.target.name);

            char.useAbilityMana();
            char.turnAttack();
            char.turnAttack();
        }
    },
    scaling: ['Weapon Damage']
} as const;

export default DoubleStrike;