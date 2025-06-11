import Battle, { Side, TurnRes } from '../Battle/Battle';

import abilities from '../Ability/abilities';
import AbilityId from '../Ability/AbilityId';
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

import NPC from '../npc/NPC';
import { createNpcChars } from '../encounters';
import OgreFighter from '../npc/OgreFighter';
import AttributeType from '../Character/Attributes/AttributeType';

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

type SimulationResults = { leftWins: number, rightWins: number, ties: number; };
type SimNPCs = { chars: NPC[], level: number; };

const fighter5: CharConstructorArgs = {
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
    // +10 PER
    // +10 CON
    // +2
    // 32 Total
    attributes: {
        [AttributeType.Strength]: 25,
        [AttributeType.Dexterity]: 12,
        [AttributeType.Perception]: 20,
        [AttributeType.Constitution]: 25,
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
        [EquipSlot.Ring2]: rings.accRing0,
        [EquipSlot.Potion]: potions.healingPotion0,
        [EquipSlot.Neck]: necks.strNeck0
    },
    ability: AbilityId.DoubleStrike,
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

function printTitle(player: CharConstructorArgs, npcs: SimNPCs, battles: number) {
    console.log(
        `Lvl. ${player.level} ${player.name} vs Lvl. ${npcs.level} ${npcs.chars.map(npc => npc.name).join(', ')} (${battles})`
    );
}

function printRes(res: SimulationResults, total: number) {
    console.log(`Player: ${res.leftWins / total * 100}%`);
    console.log(`NPC: ${res.rightWins / total * 100}%`);
    console.log(`Tie: ${res.ties / total * 100}%`);
}

function simAndPrint(player: CharConstructorArgs, npcs: SimNPCs, battles: number) {
    printTitle(player, npcs, battles);
    const res = simulateBattles(player, npcs, battles);
    printRes(res, battles);
}

simAndPrint(fighter5, { chars: [OgreFighter], level: 5 }, 1000);