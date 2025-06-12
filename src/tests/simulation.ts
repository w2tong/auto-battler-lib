import Battle, { Side, TurnRes } from '../Battle/Battle';

import abilities from '../Ability/abilities';
import AbilityId from '../Ability/AbilityId';
import AttributeType from '../Character/Attributes/AttributeType';
import BaseAttributes from '../Character/Attributes/BaseAttributes';
import Character from '../Character/Character';
import ClassName from '../Character/Classes/ClassName';
import { PetId } from '../Character/Pet';
import { StatTemplate } from '../Character/Stats/StatTemplate';

import { EquipmentImport, EquipSlot } from '../Equipment/Equipment';
import { armour } from '../Equipment/Armour';
import { hands } from '../Equipment/Hands';
import { heads } from '../Equipment/Head';
import { necks } from '../Equipment/Neck';
import { potions } from '../Equipment/Potion';
import { rings } from '../Equipment/Ring';
import { shields } from '../Equipment/Shield';
import { weapons } from '../Equipment/Weapon/weapons';
import { waists } from '../Equipment/Waist';

import NPC from '../npc/NPC';
import { createNpcChars } from '../encounters';

import BanditFighter from '../npc/bandit/BanditFighter';
import BanditPriest from '../npc/bandit/BanditPriest';
import BanditRanger from '../npc/bandit/BanditRanger';
import BanditRogue from '../npc/bandit/BanditRogue';
import BanditWizard from '../npc/bandit/BanditWizard';

import OrcFighter from '../npc/OrcFighter';
import OgreFighter from '../npc/OgreFighter';
import GoblinFighter from '../npc/GoblinFighter';
import GoblinRogue from '../npc/GoblinRogue';
import GoblinPriest from '../npc/GoblinPriest';
import Rat from '../npc/Rat';
import Zombie from '../npc/Zombie';



type CharConstructorArgs = {
    name: string,
    level: number,
    className: ClassName,
    attributes: BaseAttributes,
    statTemplate: StatTemplate,
    equipment: EquipmentImport,
    ability: AbilityId,
    petId?: PetId;
};
type Player = { name: string, level: Record<number, CharConstructorArgs>; };

type SimulationResults = { leftWins: number, rightWins: number, ties: number; };
type SimNPCs = { chars: NPC[], level: number; };

const fighter: Player = {
    name: 'Fighter',
    level: {
        5: {
            name: 'Fighter',
            level: 5,
            className: ClassName.Fighter,

            // Free points
            // 10 starting points
            // 12 points from levels
            // 10 points from 5 INT and WIS
            // 32 Total

            // Points spent
            // +10 STR
            // + 2 DEX
            // +10 PER
            // +10 CON

            // 32 Total
            attributes: {
                [AttributeType.Strength]: 20,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 20,
                [AttributeType.Constitution]: 20,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword1,
                [EquipSlot.OffHand]: shields.buckler1,
                [EquipSlot.Armour]: armour.plateArmour0,
                [EquipSlot.Head]: heads.helmet0,
                [EquipSlot.Hands]: hands.ohGloves0,
                [EquipSlot.Ring1]: rings.accRing0,
                [EquipSlot.Ring2]: rings.dmgRing0,
                [EquipSlot.Potion]: potions.healingPotion0,
                [EquipSlot.Neck]: necks.strNeck0
            },
            ability: AbilityId.DoubleStrike,
        },
        8: {
            name: 'Fighter',
            level: 8,
            className: ClassName.Fighter,

            // Points spent
            // +19 STR
            // + 2 DEX
            // +10 PER
            // +10 CON
            // 41 Total
            attributes: {
                [AttributeType.Strength]: 29,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 20,
                [AttributeType.Constitution]: 20,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword1,
                [EquipSlot.OffHand]: shields.buckler1,
                [EquipSlot.Armour]: armour.plateArmour1,
                [EquipSlot.Head]: heads.helmet0,
                [EquipSlot.Hands]: hands.ohGloves0,
                [EquipSlot.Ring1]: rings.accRing0,
                [EquipSlot.Ring2]: rings.dmgRing0,
                [EquipSlot.Potion]: potions.healingPotion0,
                [EquipSlot.Neck]: necks.strNeck0
            },
            ability: AbilityId.DoubleStrike,
        },
        9: {
            name: 'Fighter',
            level: 9,
            className: ClassName.Fighter,

            // Points spent
            // +20 STR
            // + 2 DEX
            // +12 PER
            // +10 CON
            // 44 Total
            attributes: {
                [AttributeType.Strength]: 30,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 22,
                [AttributeType.Constitution]: 20,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword2,
                [EquipSlot.OffHand]: shields.buckler2,
                [EquipSlot.Armour]: armour.plateArmour2,
                [EquipSlot.Head]: heads.helmet0,
                [EquipSlot.Hands]: hands.ohGloves0,
                [EquipSlot.Ring1]: rings.accRing0,
                [EquipSlot.Ring2]: rings.dmgRing0,
                [EquipSlot.Potion]: potions.healingPotion1,
                [EquipSlot.Neck]: necks.strNeck0,
                [EquipSlot.Waist]: waists.healBelt0
            },
            ability: AbilityId.DoubleStrike,
        },
        12: {
            name: 'Fighter',
            level: 12,
            className: ClassName.Fighter,

            // Points spent
            // +29 STR
            // + 2 DEX
            // +12 PER
            // +10 CON
            // 53 Total
            attributes: {
                [AttributeType.Strength]: 39,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 22,
                [AttributeType.Constitution]: 22,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword2,
                [EquipSlot.OffHand]: shields.buckler2,
                [EquipSlot.Armour]: armour.plateArmour2,
                [EquipSlot.Head]: heads.helmet0,
                [EquipSlot.Hands]: hands.ohGloves0,
                [EquipSlot.Ring1]: rings.accRing0,
                [EquipSlot.Ring2]: rings.dmgRing0,
                [EquipSlot.Potion]: potions.healingPotion1,
                [EquipSlot.Neck]: necks.strNeck0,
                [EquipSlot.Waist]: waists.healBelt0
            },
            ability: AbilityId.DoubleStrike,
        },
        13: {
            name: 'Fighter',
            level: 13,
            className: ClassName.Fighter,

            // Points spent
            // +30 STR
            // + 2 DEX
            // +12 PER
            // +12 CON
            // 56 Total
            attributes: {
                [AttributeType.Strength]: 40,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 22,
                [AttributeType.Constitution]: 22,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword3,
                [EquipSlot.OffHand]: shields.buckler3,
                [EquipSlot.Armour]: armour.plateArmour3,
                [EquipSlot.Head]: heads.helmet1,
                [EquipSlot.Hands]: hands.ohGloves1,
                [EquipSlot.Ring1]: rings.accRing1,
                [EquipSlot.Ring2]: rings.dmgRing1,
                [EquipSlot.Potion]: potions.healingPotion2,
                [EquipSlot.Neck]: necks.strNeck1,
                [EquipSlot.Waist]: waists.healBelt1
            },
            ability: AbilityId.DoubleStrike,
        },
        17: {
            name: 'Fighter',
            level: 17,
            className: ClassName.Fighter,

            // Points spent
            // +40 STR
            // + 2 DEX
            // +12 PER
            // +14 CON
            // 68 Total
            attributes: {
                [AttributeType.Strength]: 50,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 22,
                [AttributeType.Constitution]: 24,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword4,
                [EquipSlot.OffHand]: shields.buckler4,
                [EquipSlot.Armour]: armour.plateArmour4,
                [EquipSlot.Head]: heads.helmet1,
                [EquipSlot.Hands]: hands.ohGloves1,
                [EquipSlot.Ring1]: rings.accRing1,
                [EquipSlot.Ring2]: rings.dmgRing1,
                [EquipSlot.Potion]: potions.healingPotion3,
                [EquipSlot.Neck]: necks.strNeck1,
                [EquipSlot.Waist]: waists.healBelt2
            },
            ability: AbilityId.DoubleStrike,
        },
        20: {
            name: 'Fighter',
            level: 20,
            className: ClassName.Fighter,

            // Points spent
            // +40 STR
            // + 2 DEX
            // +15 PER
            // +14 CON
            // 71 Total
            attributes: {
                [AttributeType.Strength]: 50,
                [AttributeType.Dexterity]: 12,
                [AttributeType.Perception]: 25,
                [AttributeType.Constitution]: 24,
                [AttributeType.Intelligence]: 5,
                [AttributeType.Wisdom]: 5
            },
            statTemplate: {},
            equipment: {
                [EquipSlot.MainHand]: weapons.longsword5,
                [EquipSlot.OffHand]: shields.buckler5,
                [EquipSlot.Armour]: armour.plateArmour5,
                [EquipSlot.Head]: heads.helmet2,
                [EquipSlot.Hands]: hands.ohGloves2,
                [EquipSlot.Ring1]: rings.accRing2,
                [EquipSlot.Ring2]: rings.dmgRing2,
                [EquipSlot.Potion]: potions.healingPotion4,
                [EquipSlot.Neck]: necks.strNeck2,
                [EquipSlot.Waist]: waists.healBelt3
            },
            ability: AbilityId.DoubleStrike,
        }
    }
};

function simulateBattles(player: CharConstructorArgs, npcs: SimNPCs, battles: number): SimulationResults {
    let leftWins = 0;
    let rightWins = 0;
    let ties = 0;

    for (let i = 0; i < battles; i++) {
        const playerChar = new Character({
            name: player.name,
            level: player.level,
            className: player.className,
            attributes: player.attributes,
            statTemplate: player.statTemplate,
            equipment: player.equipment,
            ability: abilities[player.ability],
            petId: player.petId
        });
        const battle = new Battle([playerChar], createNpcChars(npcs.chars, npcs.level));
        battle.startCombat();
        let res: TurnRes = { combatEnded: false };

        while (res.combatEnded === false) {
            res = battle.nextTurn();
        }

        switch (res.winner) {
            case Side.Left:
                leftWins++;
                break;
            case Side.Right:
                rightWins++;
                break;
            case Side.Tie:
                ties++;
                break;
        }
    }

    return { leftWins, rightWins, ties };
}

function simAndPrint(player: CharConstructorArgs, npcs: SimNPCs, battles: number) {
    const res = simulateBattles(player, npcs, battles);
    const wins = `W: ${(res.leftWins / battles * 100).toFixed(1)}%`;
    // const losses = `L: ${res.rightWins / total * 100}%`;
    // const ties = `T: ${res.ties / total * 100}%`;
    console.log(`${player.level}:\t${wins}`);
}

// Fighter vs. Orc Fighter
function fullSim(player: Player, npcs: NPC[], battles: number) {
    console.log(`[${player.name}] vs [${npcs.map(npc => npc.name).join(', ')}] (${battles} battles)`);
    for (const char of Object.values(player.level)) {
        simAndPrint(char, { chars: npcs, level: char.level }, battles);
    }
}

// fullSim(fighter, [BanditFighter], 1000);
// fullSim(fighter, [BanditPriest], 1000);
// fullSim(fighter, [BanditRanger], 1000);
// fullSim(fighter, [BanditRogue], 1000);
// fullSim(fighter, [BanditWizard], 1000);

// fullSim(fighter, [GoblinFighter, GoblinRogue], 1000);
// fullSim(fighter, [GoblinFighter, GoblinPriest], 1000);
// fullSim(fighter, [GoblinPriest, GoblinRogue], 1000);

// fullSim(fighter, [OrcFighter], 1000);
// fullSim(fighter, [OgreFighter], 1000);

// fullSim(fighter, [Rat, Rat], 1000);
// fullSim(fighter, [Rat, Rat, Rat], 1000);
// fullSim(fighter, [Zombie], 1000);
// fullSim(fighter, [Zombie, Zombie], 1000);