import StatType from '../Character/Stats/StatType';
import WeaponStyle from '../WeaponStyle';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Hands extends Item {
    id: HandsId;
    itemType: ItemType.Hands;
    weaponStyle?: WeaponStyle;

    attributes?: ItemAttributes;
    stats?: ItemStats;
}

type HandsId =
    'dwGloves0' | 'dwGloves1' | 'dwGloves2'
    | 'thGloves0' | 'thGloves1' | 'thGloves2'
    | 'ohGloves0' | 'ohGloves1' | 'ohGloves2'
    // | 'rGloves0'
    ;

const hands: { [id in HandsId]: Hands } = {
    dwGloves0: {
        id: 'dwGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of Lesser Dual Wielding',
        tier: 0,

        weaponStyle: WeaponStyle.DualWield,
        stats: {
            [StatType.Accuracy]: 10,
        }
    },
    dwGloves1: {
        id: 'dwGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of Dual Wielding',
        tier: 3,

        weaponStyle: WeaponStyle.DualWield,
        stats: {
            [StatType.Accuracy]: 15,
        }
    },
    dwGloves2: {
        id: 'dwGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of Greater Dual Wielding',
        tier: 5,

        weaponStyle: WeaponStyle.DualWield,
        stats: {
            [StatType.Accuracy]: 20,
        }
    },
    thGloves0: {
        id: 'thGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of Lesser Two Handing',
        tier: 0,

        weaponStyle: WeaponStyle.TwoHanded,
        stats: {
            [StatType.DamagePercent]: 0.1,
        }
    },
    thGloves1: {
        id: 'thGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of Two Handing',
        tier: 3,

        weaponStyle: WeaponStyle.TwoHanded,
        stats: {
            [StatType.DamagePercent]: 0.15,
        }
    },
    thGloves2: {
        id: 'thGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of Greater Two Handing',
        tier: 5,

        weaponStyle: WeaponStyle.TwoHanded,
        stats: {
            [StatType.DamagePercent]: 0.2,
        }
    },
    ohGloves0: {
        id: 'ohGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of the Lesser Duelist',
        tier: 0,

        weaponStyle: WeaponStyle.OneHanded,
        stats: {
            [StatType.Accuracy]: 4,
            [StatType.Damage]: 1,
        }
    },
    ohGloves1: {
        id: 'ohGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of the Duelist',
        tier: 3,

        weaponStyle: WeaponStyle.OneHanded,
        stats: {
            [StatType.Accuracy]: 7,
            [StatType.Damage]: 2,
        }
    },
    ohGloves2: {
        id: 'ohGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of the Greater Duelist',
        tier: 5,

        weaponStyle: WeaponStyle.OneHanded,
        stats: {
            [StatType.Accuracy]: 10,
            [StatType.Damage]: 3,
        }
    },
} as const;

export { Hands, HandsId, hands };