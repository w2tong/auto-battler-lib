import type Ability from './Ability';
import AbilityId from './AbilityId';
import AttackType from '../types/AttackType';
import { formatNum } from '../util';
import Bleeding from '../StatusEffect/Debuffs/Bleeding';

const BONUS_DMG = 0.5;
const BLEED_STACKS = 3;
const DMG_PER_TURN = 0.2;

const WoundingShot: Ability = {
    id: AbilityId.WoundingShot,
    name: 'Wounding Shot',
    description: (char) => {
        const damageRange = char ? char.calcDamageRange({
            damageRange: {
                min: char.equipment.mainHand.damageRange.min * (1 + BONUS_DMG),
                max: char.equipment.mainHand.damageRange.max * (1 + BONUS_DMG),
                bonus: char.equipment.mainHand.damageRange.bonus * (1 + BONUS_DMG)
            },
            weaponAttack: true,
            spellPowerRatio: char.equipment.mainHand.spellPowerRatio ? char.equipment.mainHand.spellPowerRatio * (1 + BONUS_DMG) : char.equipment.mainHand.spellPowerRatio
        }) : null;
        return `Deals ${damageRange ? `${formatNum(damageRange.min)}-${formatNum(damageRange.max)} ` : ''}damage and applies Bleed dealing ${formatNum(DMG_PER_TURN * BLEED_STACKS * 100)}% of the initial damage dealt over ${BLEED_STACKS} turns.`;
    },
    func: function (char) {
        if (char.target) {
            char.useAbilityMana();
            const mainHand = char.equipment.mainHand;
            const { hit, damageDone } = char.attack({
                target: char.target,
                attackType: AttackType.RangedWeapon,
                damageRange: {
                    min: mainHand.damageRange.min * (1 + BONUS_DMG),
                    max: mainHand.damageRange.max * (1 + BONUS_DMG),
                    bonus: mainHand.damageRange.bonus * (1 + BONUS_DMG)
                },
                weaponAttack: true,
                spellPowerRatio: mainHand.spellPowerRatio ? mainHand.spellPowerRatio * (1 + BONUS_DMG) : mainHand.spellPowerRatio,
                isOffHand: false,
                abilityName: this.name
            });

            if (hit) {
                char.target.statusEffectManager.add(new Bleeding({
                    char: char.target,
                    source: char,
                    stacks: BLEED_STACKS,
                    remainingDamage: damageDone * BLEED_STACKS * DMG_PER_TURN
                }));
            }
        }
    },
    attackType: AttackType.RangedWeapon,
    scaling: ['Weapon Damage']
} as const;

export default WoundingShot;