import type Ability from './Ability';
import AbilityId from './AbilityId';
import AttackType from '../types/AttackType';
import Burning from '../StatusEffect/Debuffs/Burning';
import { formatNum } from '../util';
import StatType from '../Character/Stats/StatType';

const MIN_BASE = 1;
const MIN_PER_LVL = 0.1;
const MAX_BASE = 4;
const MAX_PER_LVL = 0.2;
const SPELLPOWER_RATIO = 0.33;
const STACKS = 2;

const Firebolt: Ability = {
    id: AbilityId.Firebolt,
    name: 'Firebolt',
    description: (char) => {
        const damageRange = char ? char.calcDamageRange({
            damageRange: {
                min: MIN_BASE + (char.level - 1) * MIN_PER_LVL,
                max: MAX_BASE + (char.level - 1) * MAX_PER_LVL,
                bonus: 0,
            },
            weaponAttack: false,
            spellPowerRatio: SPELLPOWER_RATIO
        }) : null;
        return `Deals ${damageRange ? `${formatNum(damageRange.min)}-${formatNum(damageRange.max)} ` : ''}damage to your target and applies ${STACKS} ${Burning.name}, dealing${char ? ` ${formatNum(Burning.baseDamage + char.stats.spellPower * Burning.spellPowerRatio)}` : ''} damage each turn.`;
    },
    func: function (char) {
        if (char.target) {
            char.useAbilityMana();
            const { hit } = char.attack({
                target: char.target,
                attackType: AttackType.Spell,
                damageRange: {
                    min: MIN_BASE + (char.level - 1) * MIN_PER_LVL,
                    max: MAX_BASE + (char.level - 1) * MAX_PER_LVL,
                    bonus: 0
                },
                weaponAttack: false,
                spellPowerRatio: SPELLPOWER_RATIO,
                isOffHand: false,
                abilityName: this.name
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
    scaling: ['Level', StatType.SpellPower],
    attackType: AttackType.Spell,
} as const;

export default Firebolt;