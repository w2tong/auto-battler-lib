import AttackType from '../../../types/AttackType';
import type Character from '../../../Character/Character';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';
import Poisoned from '../../../StatusEffect/Debuffs/Poisoned';

type BiteId = 'bite0' | 'poisonbite0' | 'poisonbite1' | 'poisonbite2' | 'poisonbite3' | 'poisonbite4' | 'poisonbite5';

const poisonBiteOnHit = {
    func: (self: Character, target: Character) => {
        target.statusEffectManager.add(new Poisoned({
            char: target,
            source: self,
            stacks: 2
        }));
    },
    description: 'Inflict 2 Poison on hit.'
};

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
        onHit: poisonBiteOnHit
    },
    poisonbite1: {
        id: 'poisonbite1',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +1',
        tier: 1,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 1 },
        onHit: poisonBiteOnHit
    },
    poisonbite2: {
        id: 'poisonbite2',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +2',
        tier: 2,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 2 },
        onHit: poisonBiteOnHit
    },
    poisonbite3: {
        id: 'poisonbite3',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +3',
        tier: 3,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 3 },
        onHit: poisonBiteOnHit
    },
    poisonbite4: {
        id: 'poisonbite4',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +4',
        tier: 4,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 4 },
        onHit: poisonBiteOnHit
    },
    poisonbite5: {
        id: 'poisonbite5',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +5',
        tier: 5,

        type: WeaponType.Bite,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 1, max: 3, bonus: 5 },
        onHit: poisonBiteOnHit
    }
} as const;

export { BiteId, bites };