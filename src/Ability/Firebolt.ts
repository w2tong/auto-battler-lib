import AttackType from '../AttackType';
import DebuffId from '../StatusEffect/DebuffId';
import Ability from './Ability';

const NAME = 'Firebolt';
const MIN_BASE = 1;
const MIN_PER_LVL = 0.1;
const MAX_BASE = 4;
const MAX_PER_LVL = 0.2;
const SPELLPOWER_RATIO = 0.34;

const Firebolt: Ability = {
    name: NAME,
    description: 'Attack your target and apply Burn.',
    func: (char) => {
        if (char.target) {
            char.useAbilityMana();
            const hit = char.attack({
                target: char.target,
                attackType: AttackType.Spell,
                damageRange: {
                    min: MIN_BASE + char.level * MIN_PER_LVL,
                    max: MAX_BASE + char.level * MAX_PER_LVL,
                    bonus: 0
                },
                spellPowerRatio: SPELLPOWER_RATIO,
                isOffHand: false,
                abilityName: NAME
            });

            if (hit) {
                char.target.statusEffectManager.addDebuff(DebuffId.Burning, char, 2);
            }
        }
    }
};

export default Firebolt;