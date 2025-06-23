import Ability from './Ability';
import AbilityId from './AbilityId';

const DoubleStrike: Ability = {
    id: AbilityId.DoubleStrike,
    name: 'Double Strike',
    description: () => 'Attack your target twice with your weapon(s).',
    func: function (char) {
        if (char.target) {
            if (char.battle) char.battle.ref.log.addAbility(char.name, this.name, char.target.name);

            char.useAbilityMana();
            char.turnAttack();
            char.turnAttack();
        }
    },
    scaling: ['Weapon Damage']
} as const;

export default DoubleStrike;