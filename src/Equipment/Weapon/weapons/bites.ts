import AttackType from '../../../types/AttackType';
import Character from '../../../Character/Character';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';
import Poisoned from '../../../StatusEffect/Debuffs/Poisoned';

type BiteId = 'bite0' | 'poisonbite0' | 'poisonbite1';

const bites: { [id in BiteId]: Weapon } = {
    bite0: {
        id: 'bite0',
        itemType: ItemType.Weapon,
        name: 'Bite',
        tier: 0,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 2, max: 3, bonus: 0 }
    },
    poisonbite0: {
        id: 'poisonbite0',
        itemType: ItemType.Weapon,
        name: 'Poison Bite',
        tier: 0,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 0 },
        onHit: {
            func: (self: Character, target: Character) => {
                target.statusEffectManager.addDebuff(new Poisoned({
                    char: target,
                    source: self,
                    stacks: 2
                }));
            },
            description: 'Inflict 2 Poison on hit.'
        }
    },
    poisonbite1: {
        id: 'poisonbite1',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +1',
        tier: 1,


        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 1 },
        onHit: {
            func: (self: Character, target: Character) => {
                target.statusEffectManager.addDebuff(new Poisoned({
                    char: target,
                    source: self,
                    stacks: 2
                }));
            },
            description: 'Inflict 2 Poison on hit.'
        }
    }
} as const;

export { BiteId, bites };