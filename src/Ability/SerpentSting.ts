import AttackType from '../types/AttackType';
import Ability from './Ability';
import { formatNum } from '../util';
import AbilityId from './AbilityId';
import Poisoned from '../StatusEffect/Debuffs/Poisoned';

const NAME = 'Serpent Sting';
const BONUS_DMG = 0.25;
const STACKS = 4;

const SerpentSting: Ability = {
    id: AbilityId.SerpentSting,
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
        return `Deals ${damageRange ? `${formatNum(damageRange.min)}-${formatNum(damageRange.max)} ` : ''}damage and applies ${STACKS} ${Poisoned.name}.`;
    },
    func: (char) => {
        if (char.target) {
            char.useAbilityMana();
            const mainHand = char.equipment.mainHand;
            const { hit } = char.attack({
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
                char.target.statusEffectManager.add(new Poisoned({
                    char: char.target,
                    source: char,
                    stacks: STACKS
                }));
            }
        }
    },
    attackType: AttackType.RangedWeapon,
} as const;

export default SerpentSting;