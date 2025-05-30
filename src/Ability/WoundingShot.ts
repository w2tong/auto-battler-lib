import AttackType from '../types/AttackType';
import Ability from './Ability';
import { formatNum } from '../util';
import Bleeding from '../StatusEffect/Debuffs/Bleeding';

const NAME = 'Wounding Shot';
const BONUS_DMG = 0.5;
const BLEED_STACKS = 3;
const DMG_PER_TURN = 0.2;

const WoundingShot: Ability = {
    name: NAME,
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
        return `Deals ${damageRange ? `${formatNum(damageRange.min)} - ${formatNum(damageRange.max)} ` : ''}damage and applies Bleed dealing ${formatNum(DMG_PER_TURN * BLEED_STACKS * 100)}% of the damage dealt over ${BLEED_STACKS} turns.`;
    },
    func: (char) => {
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
                abilityName: NAME
            });

            if (hit) {
                char.target.statusEffectManager.addDebuff(new Bleeding({
                    char: char.target,
                    source: char,
                    stacks: BLEED_STACKS,
                    remainingDamage: damageDone * BLEED_STACKS * DMG_PER_TURN
                }));
            }
        }
    }
};

export default WoundingShot;