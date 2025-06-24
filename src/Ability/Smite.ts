import type Ability from './Ability';
import AbilityId from './AbilityId';
import AttackType from '../types/AttackType';
import { formatNum } from '../util';
import StatType from '../Character/Stats/StatType';
import Smote from '../StatusEffect/Debuffs/Smote';
import AttributeType from '../Character/Attributes/AttributeType';

const MIN_BASE = 1;
const MIN_PER_LVL = 0.1;
const MAX_BASE = 2;
const MAX_PER_LVL = 0.2;
const SPELLPOWER_RATIO = 0.5;
const STACKS = 3;

const Smite: Ability = {
    id: AbilityId.Smite,
    name: 'Smite',
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

        let damage = null;
        let accuracy = null;
        if (char) {
            accuracy = Smote.calcAccuracy(char.level, char.attributes.wisdom);
            damage = Smote.calcDamage(char.level, char.attributes.wisdom);
        }

        return `Deals ${damageRange ? `${formatNum(damageRange.min)}-${formatNum(damageRange.max)} ` : ''}damage to the target and reduces their Accuracy${accuracy ? ` by ${formatNum(-accuracy)}` : ''} and Damage${damage ? ` by ${formatNum(-damage)}` : ''} for ${STACKS} turns.`;
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
                char.target.statusEffectManager.add(new Smote({
                    char: char.target,
                    source: char,
                    stacks: STACKS
                }));
            }
        }
    },
    scaling: ['Level', AttributeType.Wisdom, StatType.SpellPower],
    attackType: AttackType.Spell,
} as const;

export default Smite;