import AttackType from '../types/AttackType';
import DebuffId from '../StatusEffect/DebuffId';
import Ability from './Ability';

const NAME = 'Ferocious Bite';
const BONUS_DMG = 0.25;
const BLEED_STACKS = 2;
const DMG_PER_TURN = 0.15;

const FerociousBite: Ability = {
    name: NAME,
    description: (char) => {
        const damageRange = char ? char.calcDamageRange({
            damageRange: {
                min: char.equipment.mainHand.damageRange.min * (1 + BONUS_DMG),
                max: char.equipment.mainHand.damageRange.max * (1 + BONUS_DMG),
                bonus: char.equipment.mainHand.damageRange.bonus * (1 + BONUS_DMG)
            },
            weaponAttack: true
        }) : null;
        return `Deals ${damageRange ? `${damageRange.min} - ${damageRange.max} ` : ''}damage and applies Bleed dealing ${DMG_PER_TURN * BLEED_STACKS * 100}% of the damage dealt over ${BLEED_STACKS} turns.`;
    },
    func: (char) => {
        if (char.target) {
            char.useAbilityMana();
            const { hit, damageDone } = char.attack({
                target: char.target,
                attackType: AttackType.MeleeWeapon,
                damageRange: {
                    min: char.equipment.mainHand.damageRange.min * (1 + BONUS_DMG),
                    max: char.equipment.mainHand.damageRange.max * (1 + BONUS_DMG),
                    bonus: char.equipment.mainHand.damageRange.bonus * (1 + BONUS_DMG)
                },
                weaponAttack: true,
                isOffHand: false,
                abilityName: NAME
            });

            if (hit) {
                char.target.statusEffectManager.addDebuff(DebuffId.Bleeding, char, BLEED_STACKS, { remainingDamage: damageDone * BLEED_STACKS * DMG_PER_TURN });
            }
        }
    }
};

export default FerociousBite;