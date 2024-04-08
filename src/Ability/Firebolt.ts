import AttackType from '../AttackType';
import { DebuffId } from '../Buffs/buffs';
import Ability from './Ability';

const Firebolt: Ability = {
    name: 'Firebolt',
    description: 'Attack your target and apply Burn.',
    func: (char) => {
        if (!char.battle) return;
        char.setTarget();
        if (char.target) {
            char.useMana();
            const hit = char.attack({
                target: char.target,
                attackType: AttackType.Spell,
                damageRange: char.mainHand.damageRange,
                spellPowerRatio: 0.25,
                isOffHand: false,
                abilityName: 'Firebolt'
            });

            if (hit) {
                char.target.buffTracker.addDebuff(DebuffId.Burn, 2, char);
            }
        }
    }
};

export default Firebolt;