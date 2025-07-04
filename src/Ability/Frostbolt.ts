import type Ability from './Ability';
import AbilityId from './AbilityId';
import AttackType from '../types/AttackType';
import { formatNum } from '../util';
import StatType from '../Character/Stats/StatType';
import Frozen from '../StatusEffect/Debuffs/Frozen';
import { dice, rollDice } from '../dice';

const MIN_BASE = 1;
const MIN_PER_LVL = 0.1;
const MAX_BASE = 2;
const MAX_PER_LVL = 0.2;
const SPELLPOWER_RATIO = 0.5;
const STACKS = 1;
const FROZEN_CHANCE = 50;

const Frostbolt: Ability = {
    id: AbilityId.Frostbolt,
    name: 'Frostbolt',
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
        return `Deals ${damageRange ? `${formatNum(damageRange.min)}-${formatNum(damageRange.max)} ` : ''}damage to your target, with a ${FROZEN_CHANCE}% chance of applying 1 ${Frozen.name}, preventing them from acting for 1 turn.`;
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

            if (hit && rollDice(dice['1d100']) <= FROZEN_CHANCE) {
                char.target.statusEffectManager.add(new Frozen({
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

export default Frostbolt;