import AttackType from '../types/AttackType';
import Ability from './Ability';
import Burning from '../StatusEffect/Debuffs/Burning';
import { formatNum } from '../util';
import AbilityId from './AbilityId';
import StatType from '../Character/Stats/StatType';

const NAME = 'Firebolt';
const MIN_BASE = 1;
const MIN_PER_LVL = 0.1;
const MAX_BASE = 4;
const MAX_PER_LVL = 0.2;
const SPELLPOWER_RATIO = 0.34;
const STACKS = 2;

const Firebolt: Ability = {
    id: AbilityId.Firebolt,
    name: NAME,
    description: (char) => {
        const damageRange = char ? char.calcDamageRange({
            damageRange: {
                min: MIN_BASE + char.level * MIN_PER_LVL,
                max: MAX_BASE + char.level * MAX_PER_LVL,
                bonus: 0,
            },
            weaponAttack: false,
            spellPowerRatio: SPELLPOWER_RATIO
        }) : null;
        return `Deals ${damageRange ? `${formatNum(damageRange.min)} - ${formatNum(damageRange.max)} ` : ''}to your target and apply ${STACKS} ${Burning.name} stacks${char ? ` dealing ${formatNum(Burning.baseDamage + char.stats.spellPower * Burning.spellPowerRatio)} damage each turn` : ''}.`;
    },
    func: (char) => {
        if (char.target) {
            char.useAbilityMana();
            const { hit } = char.attack({
                target: char.target,
                attackType: AttackType.Spell,
                damageRange: {
                    min: MIN_BASE + char.level * MIN_PER_LVL,
                    max: MAX_BASE + char.level * MAX_PER_LVL,
                    bonus: 0
                },
                weaponAttack: false,
                spellPowerRatio: SPELLPOWER_RATIO,
                isOffHand: false,
                abilityName: NAME
            });

            if (hit) {
                char.target.statusEffectManager.add(new Burning({
                    char: char.target,
                    source: char,
                    stacks: STACKS
                }));
            }
        }
    },
    scaling: ['level', StatType.SpellPower],
    attackType: AttackType.Spell,
} as const;

export default Firebolt;