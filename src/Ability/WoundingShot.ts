import AttackType from '../AttackType';
import DebuffId from '../StatusEffect/DebuffId';
import Ability from './Ability';

const NAME = 'Wounding Shot';
const BONUS_DMG = 0.5;
const BLEED_STACKS = 3;
const DMG_PER_TURN = 0.2;

const WoundingShot: Ability = {
    name: NAME,
    description: 'Attack your target and apply Bleeding.',
    func: (char) => {
        if (char.target) {
            char.useAbilityMana();
            const { hit, damageDone } = char.attack({
                target: char.target,
                attackType: AttackType.RangedWeapon,
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

export default WoundingShot;