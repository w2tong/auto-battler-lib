import { Item, ItemType } from './Item';

interface Head extends Item {
    itemType: ItemType.Head
    armourClass?: number
    manaPerAtk?: number;
    manaRegen?: number;
    manaCostReduction?: number;
    initiativeBonus?: number;
}

type HeadId = 
'helmet0' | 'helmet1' | 'helmet2' |
'clothHood0' | 'clothHood1' | 'clothHood2' 
;

const heads: {[id in HeadId]: Head} = {
    helmet0: {
        id: 'helmet0',
        itemType: ItemType.Head,
        name: 'Leather Helmet',
        tier: 0,
        img: 'head-leather.png',
        armourClass: 1
    },
    helmet1: {
        id: 'helmet1',
        itemType: ItemType.Head,
        name: 'Mail Coif',
        tier: 3,
        img: 'head-mail.png',
        armourClass: 2
    },
    helmet2: {
        id: 'helmet2',
        itemType: ItemType.Head,
        name: 'Plate Helmet',
        tier: 5,
        img: 'head-plate.png',
        armourClass: 3
    },
    clothHood0: {
        id: 'clothHood0',
        itemType: ItemType.Head,
        name: 'Cloth Hood',
        tier: 0,
        img: 'head-cloth.png',
        manaCostReduction: 10
    },
    clothHood1: {
        id: 'clothHood1',
        itemType: ItemType.Head,
        name: 'Cloth Hood +1',
        tier: 3,
        img: 'head-cloth.png',
        manaCostReduction: 15
    },
    clothHood2: {
        id: 'clothHood2',
        itemType: ItemType.Head,
        name: 'Cloth Hood +2',
        tier: 5,
        img: 'head-cloth.png',
        manaCostReduction: 20
    }
} as const;

export { Head, HeadId, heads };