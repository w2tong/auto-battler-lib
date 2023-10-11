import { ArmourId } from './Equipment/Armour';
import { HandsId } from './Equipment/Hands';
import { HeadId } from './Equipment/Head';
import { ShieldId } from './Equipment/Shield';
import { WeaponId } from './Equipment/Weapons';
import { RingId } from './Equipment/Ring';
import { PotionId } from './Equipment/Potion';
import { BeltId } from './Equipment/Belt';
type LootTable = (WeaponId|ShieldId|HeadId|ArmourId|HandsId|RingId|PotionId|BeltId)[];

const lootTiers: {[tier: number]: LootTable} = {
    0: [
        // Weapons
        'longsword0', 'greatsword0', 'dagger0', 'quarterstaff0', 'wand0',
        // Shields
        'buckler0', 'spikedShield0', 'towerShield0',
        // Armour
        'robe0', 'lightarmour0', 'mediumarmour0', 'heavyarmour0',
        // Heads
        'helmet0', 'clothHood0',
        // Hands
        'dwGloves0', 'thGloves0', 'ohGloves0',
        // Rings
        'abRing0', 'dbRing0', 'acRing0'
        
    ],
    1: [
        // Weapons
        'longsword1', 'greatsword1', 'dagger1', 'quarterstaff1', 'wand1',
        // Shields
        'buckler1', 'spikedShield1', 'towerShield1',
        // Armour
        'robe1', 'lightarmour1', 'mediumarmour1', 'heavyarmour1', 
        // Heads
        'helmet0', 'clothHood0',
        // Hands
        'dwGloves0', 'thGloves0', 'ohGloves0',
        // Rings
        'abRing0', 'dbRing0', 'cmRing0', 'acRing0', 'thrRing0', 'mpatkRing0', 'mrgnRing0', 'mcostRing0' ,
        // Potions
        'healingPotion0'
    ],
    2: [
        // Weapons
        'longsword2', 'greatsword2', 'dagger2', 'quarterstaff2', 'wand2',
        // Shields
        'buckler2', 'spikedShield2', 'towerShield2',
        // Armour
        'robe2', 'lightarmour2', 'mediumarmour2', 'heavyarmour2',
        // Heads
        'helmet0', 'clothHood0',
        // Hands
        'dwGloves0', 'thGloves0', 'ohGloves0',
        // Rings
        'abRing0', 'dbRing0', 'cmRing0', 'acRing0', 'thrRing0', 'mpatkRing0', 'mrgnRing0', 'mcostRing0',
        // Potions
        'healingPotion1',
        // Belts
        'effBelt0', 'healBelt0',
    ],
    3: [
        // Weapons
        'longsword3', 'greatsword3', 'dagger3', 'quarterstaff3', 'wand3',
        // Shields
        'buckler3', 'spikedShield3', 'towerShield3',
        // Armour
        'robe3', 'lightarmour3', 'mediumarmour3', 'heavyarmour3',
        // Heads
        'helmet1', 'clothHood1',
        // Hands
        'dwGloves1', 'thGloves1', 'ohGloves1',
        // Rings
        'abRing1' , 'dbRing1', 'cmRing1', 'acRing1', 'thrRing1', 'mpatkRing1', 'mrgnRing1', 'mcostRing1', 'crRing0',
        // Potions
        'healingPotion2',
        // Belts
        'effBelt1', 'healBelt1',
    ],
    4: [
        // Weapons
        'longsword4', 'greatsword4', 'dagger4', 'quarterstaff4', 'wand4',
        // Shields
        'buckler4', 'spikedShield4', 'towerShield4',
        // Armour
        'robe4', 'lightarmour4', 'mediumarmour4', 'heavyarmour4',
        // Heads
        'helmet1', 'clothHood1',
        // Hands
        'dwGloves1', 'thGloves1', 'ohGloves1',
        // Rings
        'abRing1', 'dbRing1', 'cmRing1', 'acRing1', 'thrRing1', 'mpatkRing1', 'mrgnRing1', 'mcostRing1', 'crRing0',
        // Potions
        'healingPotion3',
        // Belts
        'effBelt2', 'healBelt2', 'chargesBelt0',
    ],
        
    5: [
        // Weapons
        'longsword5', 'greatsword5', 'dagger5', 'quarterstaff5', 'wand5',
        // Shields
        'buckler5', 'spikedShield5', 'towerShield5',
        // Armour
        'robe5', 'lightarmour5', 'mediumarmour5', 'heavyarmour5',
        // Heads
        'helmet2', 'clothHood2',
        // Hands
        'dwGloves2', 'thGloves2', 'ohGloves2',
        // Rings
        'abRing2', 'dbRing2', 'cmRing2', 'acRing2', 'thrRing2', 'mpatkRing2', 'mrgnRing2', 'mcostRing2', 'crRing1',
        // Potions
        'healingPotion4',
        // Belts
        'effBelt3', 'healBelt3', 'chargesBelt1',
    ],
};

const lootTables: {[level: number]: {normal: LootTable, rare: LootTable, rareChance: number}} = {
    1: {normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.05},
    2: {normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.1},
    3: {normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.25},
    4: {normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.5},
    5: {normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.05},
    6: {normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.1},
    7: {normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.25},
    8: {normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.5},
    9: {normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.05},
    10: {normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.1},
    11: {normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.25},
    12: {normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.5},
    13: {normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.05},
    14: {normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.1},
    15: {normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.25},
    16: {normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.5},
    17: {normal: lootTiers[4], rare: lootTiers[5], rareChance: 0.1},
    18: {normal: lootTiers[4], rare: lootTiers[5], rareChance: 0.25},
    19: {normal: lootTiers[4], rare: lootTiers[5], rareChance: 0.5},
    20: {normal: lootTiers[5], rare: lootTiers[5], rareChance: 0},
};

export default lootTables;