import { Item, ItemType } from './Item';

enum ShieldType {
    Light = 'Light',
    Medium = 'Medium',
    Heavy = 'Heavy'
}

interface Shield extends Item {
    itemType: ItemType.Shield;
    type: ShieldType;
    armourClass: number;
    attackBonus?: number;
    physDR?: number;
    magicDR?: number;
    physResist?: number;
    magicResist?: number;
    thorns?: number;
}

type ShieldId = 'buckler0' | 'buckler1' | 'buckler2' | 'buckler3' | 'buckler4' | 'buckler5' |
'spikedShield0' | 'spikedShield1' | 'spikedShield2' | 'spikedShield3' | 'spikedShield4' | 'spikedShield5' |
'towerShield0' | 'towerShield1' | 'towerShield2' | 'towerShield3' | 'towerShield4' | 'towerShield5'
const shields: {[id in ShieldId]: Shield} = {
    buckler0: {
        id: 'buckler0',
        name: 'Buckler',
        itemType: ItemType.Shield,
        tier: 0,
        img: 'shield-buckler.png',
        type: ShieldType.Light,
        armourClass: 1
    },
    buckler1: {
        id: 'buckler1',
        name: 'Buckler +1',
        itemType: ItemType.Shield,
        tier: 1,
        img: 'shield-buckler.png',
        type: ShieldType.Light,
        armourClass: 2
    },
    buckler2: {
        id: 'buckler2',
        name: 'Buckler +2',
        itemType: ItemType.Shield,
        tier: 2,
        img: 'shield-buckler.png',
        type: ShieldType.Light,
        armourClass: 3
    },
    buckler3: {
        id: 'buckler3',
        name: 'Buckler +3',
        itemType: ItemType.Shield,
        tier: 3,
        img: 'shield-buckler.png',
        type: ShieldType.Light,
        armourClass: 4
    },
    buckler4: {
        id: 'buckler4',
        name: 'Buckler +4',
        itemType: ItemType.Shield,
        tier: 4,
        img: 'shield-buckler.png',
        type: ShieldType.Light,
        armourClass: 5
    },
    buckler5: {
        id: 'buckler5',
        name: 'Buckler +5',
        itemType: ItemType.Shield,
        tier: 5,
        img: 'shield-buckler.png',
        type: ShieldType.Light,
        armourClass: 6
    },
    spikedShield0: {
        id: 'spikedShield0',
        name: 'Spiked Shield',
        itemType: ItemType.Shield,
        tier: 0,
        img: 'shield-spiked.png',
        type: ShieldType.Medium,
        armourClass: 1,
        thorns: 1
    },
    spikedShield1: {
        id: 'spikedShield1',
        name: 'Spiked Shield +1',
        itemType: ItemType.Shield,
        tier: 1,
        img: 'shield-spiked.png',
        type: ShieldType.Medium,
        armourClass: 2,
        thorns: 2
    },
    spikedShield2: {
        id: 'spikedShield2',
        name: 'Spiked Shield +2',
        itemType: ItemType.Shield,
        tier: 2,
        img: 'shield-spiked.png',
        type: ShieldType.Medium,
        armourClass: 3,
        thorns: 3
    },
    spikedShield3: {
        id: 'spikedShield3',
        name: 'Spiked Shield +3',
        itemType: ItemType.Shield,
        tier: 3,
        img: 'shield-spiked.png',
        type: ShieldType.Medium,
        armourClass: 4,
        thorns: 4
    },
    spikedShield4: {
        id: 'spikedShield4',
        name: 'Spiked Shield +4',
        itemType: ItemType.Shield,
        tier: 4,
        img: 'shield-spiked.png',
        type: ShieldType.Medium,
        armourClass: 5,
        thorns: 5
    },
    spikedShield5: {
        id: 'spikedShield5',
        name: 'Spiked Shield +5',
        itemType: ItemType.Shield,
        tier: 5,
        img: 'shield-spiked.png',
        type: ShieldType.Medium,
        armourClass: 6,
        thorns: 6
    },
    towerShield0: {
        id: 'towerShield0',
        name: 'Tower Shield',
        itemType: ItemType.Shield,
        tier: 0,
        img: 'shield-tower.png',
        type: ShieldType.Heavy,
        armourClass: 3,
        attackBonus: -2
    },
    towerShield1: {
        id: 'towerShield1',
        name: 'Tower Shield +1',
        itemType: ItemType.Shield,
        tier: 1,
        img: 'shield-tower.png',
        type: ShieldType.Heavy,
        armourClass: 4,
        attackBonus: -2
    },
    towerShield2: {
        id: 'towerShield2',
        name: 'Tower Shield +2',
        itemType: ItemType.Shield,
        tier: 2,
        img: 'shield-tower.png',
        type: ShieldType.Heavy,
        armourClass: 5,
        attackBonus: -2
    },
    towerShield3: {
        id: 'towerShield3',
        name: 'Tower Shield +3',
        itemType: ItemType.Shield,
        tier: 3,
        img: 'shield-tower.png',
        type: ShieldType.Heavy,
        armourClass: 6,
        attackBonus: -2
    },
    towerShield4: {
        id: 'towerShield4',
        name: 'Tower Shield +4',
        itemType: ItemType.Shield,
        tier: 4,
        img: 'shield-tower.png',
        type: ShieldType.Heavy,
        armourClass: 7,
        attackBonus: -2
    },
    towerShield5: {
        id: 'towerShield5',
        name: 'Tower Shield +5',
        itemType: ItemType.Shield,
        tier: 5,
        img: 'shield-tower.png',
        type: ShieldType.Heavy,
        armourClass: 8,
        attackBonus: -2
    },
};

export { Shield, ShieldId, shields };