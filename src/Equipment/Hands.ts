import StatType from '../Character/Stats/StatType';
import WeaponStyle from '../WeaponStyle';
import { Item, ItemAttributes, ItemStats, ItemType } from './Item';

interface Hands extends Item {
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
        img: 'gloves-dual-wield.png',

        weaponStyle: WeaponStyle.DualWield,
        stats: {
            [StatType.Accuracy]: 5,
        }
    },
    dwGloves1: {
        id: 'dwGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of Dual Wielding',
        tier: 3,
        img: 'gloves-dual-wield.png',

        weaponStyle: WeaponStyle.DualWield,
        stats: {
            [StatType.Accuracy]: 10,
        }
    },
    dwGloves2: {
        id: 'dwGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of Greater Dual Wielding',
        tier: 5,
        img: 'gloves-dual-wield.png',

        weaponStyle: WeaponStyle.DualWield,
        stats: {
            [StatType.Accuracy]: 15,
        }
    },
    thGloves0: {
        id: 'thGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of Lesser Two Handing',
        tier: 0,
        img: 'gloves-two-hand.png',

        weaponStyle: WeaponStyle.TwoHanded,
        stats: {
            [StatType.Damage]: 2,
        }
    },
    thGloves1: {
        id: 'thGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of Two Handing',
        tier: 3,
        img: 'gloves-two-hand.png',
        weaponStyle: WeaponStyle.TwoHanded,
        stats: {
            [StatType.Damage]: 4,
        }
    },
    thGloves2: {
        id: 'thGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of Greater Two Handing',
        tier: 5,
        img: 'gloves-two-hand.png',

        weaponStyle: WeaponStyle.TwoHanded,
        stats: {
            [StatType.Damage]: 6,
        }
    },
    ohGloves0: {
        id: 'ohGloves0',
        itemType: ItemType.Hands,
        name: 'Gloves of the Lesser Duelist',
        tier: 0,
        img: 'gloves-one-hand.png',

        weaponStyle: WeaponStyle.OneHanded,
        stats: {
            [StatType.Accuracy]: 3,
            [StatType.Damage]: 1,
        }
    },
    ohGloves1: {
        id: 'ohGloves1',
        itemType: ItemType.Hands,
        name: 'Gloves of the Duelist',
        tier: 3,
        img: 'gloves-one-hand.png',

        weaponStyle: WeaponStyle.OneHanded,
        stats: {
            [StatType.Accuracy]: 6,
            [StatType.Damage]: 2,
        }
    },
    ohGloves2: {
        id: 'ohGloves2',
        itemType: ItemType.Hands,
        name: 'Gloves of the Greater Duelist',
        tier: 5,
        img: 'gloves-one-hand.png',

        weaponStyle: WeaponStyle.OneHanded,
        stats: {
            [StatType.Accuracy]: 9,
            [StatType.Damage]: 3,
        }
    },
} as const;

export { Hands, HandsId, hands };