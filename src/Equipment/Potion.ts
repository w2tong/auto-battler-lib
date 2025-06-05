import { Item, ItemType } from './Item';
import Character from '../Character/Character';
import NumberRange from '../NumberRange';

interface Potion extends Item {
    id: PotionId;
    itemType: ItemType.Potion;
    healingRange: NumberRange;
    charges: number;
    onUse?: {
        func: (self: Character) => void;
        description: string;
    };
}

type PotionId =
    'healingPotion0' | 'healingPotion1' | 'healingPotion2' | 'healingPotion3' | 'healingPotion4'
    ;

const potions: { [id in PotionId]: Potion } = {
    healingPotion0: {
        id: 'healingPotion0',
        itemType: ItemType.Potion,
        name: 'Lesser Healing Potion',
        tier: 1,

        healingRange: { min: 4, max: 8, bonus: 0 },
        charges: 1
    },
    healingPotion1: {
        id: 'healingPotion1',
        itemType: ItemType.Potion,
        name: 'Healing Potion',
        tier: 2,

        healingRange: { min: 8, max: 16, bonus: 0 },
        charges: 1
    },
    healingPotion2: {
        id: 'healingPotion2',
        itemType: ItemType.Potion,
        name: 'Greater Healing Potion',
        tier: 3,

        healingRange: { min: 12, max: 24, bonus: 0 },
        charges: 1
    },
    healingPotion3: {
        id: 'healingPotion3',
        itemType: ItemType.Potion,
        name: 'Superior Healing Potion',
        tier: 4,

        healingRange: { min: 16, max: 32, bonus: 0 },
        charges: 1
    },
    healingPotion4: {
        id: 'healingPotion4',
        itemType: ItemType.Potion,
        name: 'Supreme Healing Potion',
        tier: 5,

        healingRange: { min: 20, max: 40, bonus: 0 },
        charges: 1
    }
} as const;

export { Potion, PotionId, potions };