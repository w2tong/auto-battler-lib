import AttackType from '../types/AttackType';
import Ability from './Ability';
import { formatNum } from '../util';
import AbilityId from './AbilityId';
import StatType from '../Character/Stats/StatType';
import Frozen from '../StatusEffect/Debuffs/Frozen';
import { dice, rollDice } from '../dice';

const NAME = 'Frostbolt';
const MIN_BASE = 1;
const MIN_PER_LVL = 0.1;
const MAX_BASE = 2;
const MAX_PER_LVL = 0.2;
const SPELLPOWER_RATIO = 0.5;
const STACKS = 1;
const FROZEN_CHANCE = 50;

const Frostbolt: Ability = {
    id: AbilityId.Frostbolt,
    name: NAME,
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
        return `Deals ${damageRange ? `${formatNum(damageRange.min)} - ${formatNum(damageRange.max)} ` : ''}to your target. There's a ${FROZEN_CHANCE}% chance to apply 1 ${Frozen.name} stack, preventing them from acting for 1 turn.`;
    },
    func: (char) => {
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
                abilityName: NAME
            });

            if (hit && rollDice(dice['1d100']) <= FROZEN_CHANCE) {
                char.target.statusEffectManager.add(new Frozen({
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

export default Frostbolt;