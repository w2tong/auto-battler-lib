import type { ArmourId } from './Equipment/Armour';
import type { HandsId } from './Equipment/Hands';
import type { HeadId } from './Equipment/Head';
import type { ShieldId } from './Equipment/Shield';
import type { WeaponId } from './Equipment/Weapon/weapons';
import type { RingId } from './Equipment/Ring';
import type { PotionId } from './Equipment/Potion';
import type { WaistId } from './Equipment/Waist';
import type { NeckId } from './Equipment/Neck';
import type LevelRange from './types/LevelRange';
type LootTable = (WeaponId | ShieldId | HeadId | ArmourId | HandsId | RingId | PotionId | WaistId | NeckId)[];

const lootTiers: { [tier: number]: LootTable; } = {
    0: [
        // Weapons
        'longsword0', 'greatsword0', 'dagger0', 'quarterstaff0', 'wand0', 'mace0', 'longbow0',
        // Shields
        'buckler0', 'spikedShield0', 'towerShield0',
        // Armour
        'robe0', 'leatherArmour0', 'mailArmour0', 'plateArmour0',
        // Heads
        'helmet0', 'clothHood0',
        // Hands
        'dwGloves0', 'thGloves0', 'ohGloves0',
        // Rings
        'accRing0', 'dmgRing0', 'dodgeRing0'

    ],
    1: [
        // Weapons
        'longsword1', 'greatsword1', 'dagger1', 'quarterstaff1', 'wand1', 'mace1', 'longbow1',
        // Shields
        'buckler1', 'spikedShield1', 'towerShield1',
        // Armour
        'robe1', 'leatherArmour1', 'mailArmour1', 'plateArmour1',
        // Heads
        'helmet0', 'clothHood0',
        // Hands
        'dwGloves0', 'thGloves0', 'ohGloves0',
        // Rings
        'accRing0', 'dmgRing0', 'critRing0', 'dodgeRing0', 'thornsRing0', 'mpHitRing0', 'mpRegenRing0', 'mpCostRing0',
        // Potions
        'healingPotion0',
        // Necks
        'strNeck0', 'dexNeck0', 'perNeck0', 'conNeck0', 'intNeck0', 'wisNeck0',
    ],
    2: [
        // Weapons
        'longsword2', 'greatsword2', 'dagger2', 'quarterstaff2', 'wand2', 'mace2', 'longbow2',
        // Shields
        'buckler2', 'spikedShield2', 'towerShield2',
        // Armour
        'robe2', 'leatherArmour2', 'mailArmour2', 'plateArmour2',
        // Heads
        'helmet0', 'clothHood0',
        // Hands
        'dwGloves0', 'thGloves0', 'ohGloves0',
        // Rings
        'accRing0', 'dmgRing0', 'critRing0', 'dodgeRing0', 'thornsRing0', 'mpHitRing0', 'mpRegenRing0', 'mpCostRing0',
        // Potions
        'healingPotion1',
        // Necks
        'strNeck0', 'dexNeck0', 'perNeck0', 'conNeck0', 'intNeck0', 'wisNeck0',
        // Waists
        'effBelt0', 'healBelt0',
    ],
    3: [
        // Weapons
        'longsword3', 'greatsword3', 'dagger3', 'quarterstaff3', 'wand3', 'mace3', 'longbow3',
        // Shields
        'buckler3', 'spikedShield3', 'towerShield3',
        // Armour
        'robe3', 'leatherArmour3', 'mailArmour3', 'plateArmour3',
        // Heads
        'helmet1', 'clothHood1',
        // Hands
        'dwGloves1', 'thGloves1', 'ohGloves1',
        // Rings
        'accRing1', 'dmgRing1', 'critDmgRing1', 'dodgeRing1', 'thornsRing1', 'mpHitRing1', 'mpRegenRing1', 'mpCostRing1', 'critRing1',
        // Potions
        'healingPotion2',
        // Necks
        'strNeck1', 'dexNeck1', 'perNeck1', 'conNeck1', 'intNeck1', 'wisNeck1',
        // Waists
        'effBelt1', 'healBelt1',
    ],
    4: [
        // Weapons
        'longsword4', 'greatsword4', 'dagger4', 'quarterstaff4', 'wand4', 'mace4', 'longbow4',
        // Shields
        'buckler4', 'spikedShield4', 'towerShield4',
        // Armour
        'robe4', 'leatherArmour4', 'mailArmour4', 'plateArmour4',
        // Heads
        'helmet1', 'clothHood1',
        // Hands
        'dwGloves1', 'thGloves1', 'ohGloves1',
        // Rings
        'accRing1', 'dmgRing1', 'critDmgRing1', 'dodgeRing1', 'thornsRing1', 'mpHitRing1', 'mpRegenRing1', 'mpCostRing1', 'critRing1',
        // Potions
        'healingPotion3',
        // Necks
        'strNeck1', 'dexNeck1', 'perNeck1', 'conNeck1', 'intNeck1', 'wisNeck1',
        // Waists
        'effBelt2', 'healBelt2', 'chargesBelt0',
    ],

    5: [
        // Weapons
        'longsword5', 'greatsword5', 'dagger5', 'quarterstaff5', 'wand5', 'mace5', 'longbow5',
        // Shields
        'buckler5', 'spikedShield5', 'towerShield5',
        // Armour
        'robe5', 'leatherArmour5', 'mailArmour5', 'plateArmour5',
        // Heads
        'helmet2', 'clothHood2',
        // Hands
        'dwGloves2', 'thGloves2', 'ohGloves2',
        // Rings
        'accRing2', 'dmgRing2', 'critDmgRing2', 'dodgeRing2', 'thornsRing2', 'mpHitRing2', 'mpRegenRing2', 'mpCostRing2', 'critRing2',
        // Potions
        'healingPotion4',
        // Necks
        'strNeck2', 'dexNeck2', 'perNeck2', 'conNeck2', 'intNeck2', 'wisNeck2',
        // Waists
        'effBelt3', 'healBelt3', 'chargesBelt1',
    ],
};

const lootTables: Record<LevelRange, { normal: LootTable, rare: LootTable, rareChance: number; }> = {
    1: { normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.05 },
    2: { normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.1 },
    3: { normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.25 },
    4: { normal: lootTiers[0], rare: lootTiers[1], rareChance: 0.5 },
    5: { normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.05 },
    6: { normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.1 },
    7: { normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.25 },
    8: { normal: lootTiers[1], rare: lootTiers[2], rareChance: 0.5 },
    9: { normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.05 },
    10: { normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.1 },
    11: { normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.25 },
    12: { normal: lootTiers[2], rare: lootTiers[3], rareChance: 0.5 },
    13: { normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.05 },
    14: { normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.1 },
    15: { normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.25 },
    16: { normal: lootTiers[3], rare: lootTiers[4], rareChance: 0.5 },
    17: { normal: lootTiers[4], rare: lootTiers[5], rareChance: 0.1 },
    18: { normal: lootTiers[4], rare: lootTiers[5], rareChance: 0.25 },
    19: { normal: lootTiers[4], rare: lootTiers[5], rareChance: 0.5 },
    20: { normal: lootTiers[5], rare: lootTiers[5], rareChance: 0 },
};

export default lootTables;