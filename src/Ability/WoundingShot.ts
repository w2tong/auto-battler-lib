import AttackType from '../types/AttackType';
import DebuffId from '../StatusEffect/DebuffId';
import Ability from './Ability';

const NAME = 'Wounding Shot';
const BONUS_DMG = 0.5;
const BLEED_STACKS = 3;
const DMG_PER_TURN = 0.2;

const WoundingShot: Ability = {
    name: NAME,
    description: `Attack your target for Weapon Damage + ${BONUS_DMG * 100}% and apply Bleeding.`,
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
                char.target.statusEffectManager.addDebuff(DebuffId.Bleeding, char, BLEED_STACKS, { remainingDamage: damageDone * BLEED_STACKS * DMG_PER_TURN });
            }
        }
    }
};

export default WoundingShot;