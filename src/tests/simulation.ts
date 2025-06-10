import { ClassName } from '..';
import Ability from '../Ability/Ability';
import Battle, { Side, TurnRes } from '../Battle/Battle';
import BaseAttributes from '../Character/Attributes/BaseAttributes';
import { PetId } from '../Character/Pet';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import { createNpcChars } from '../encounters';
import { EquipmentImport } from '../Equipment/Equipment';
import Fighter from '../npc/bandit/Fighter';
import NPC, { NpcId } from '../npc/NPC';
import OgreFighter from '../npc/OgreFighter';

type CharConstructorArgs = {
    level: number,
    className: ClassName,
    attributes: BaseAttributes,
    statTemplate: StatTemplate,
    equipment: EquipmentImport,
    ability: Ability,
    petId?: PetId;
};

function simulateBattles(left: { chars: NPC[], level: number; }, right: { chars: NPC[], level: number; }, battles: number): { leftWins: number, rightWins: number, ties: number; } {
    let leftWins = 0;
    let rightWins = 0;
    let ties = 0;

    for (let i = 0; i < battles; i++) {
        const battle = new Battle(createNpcChars(left.chars, left.level), createNpcChars(right.chars, right.level));
        battle.startCombat();
        let res: TurnRes = { combatEnded: false };

        // console.log(battle.left[0].currentHealth, battle.right[0].currentHealth);

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

const battles = 1_000;
const { leftWins, rightWins, ties } = simulateBattles({ chars: [Fighter], level: 5 }, { chars: [OgreFighter], level: 5 }, battles);
console.log(`Left: ${leftWins / battles * 100}%`);
console.log(`Right: ${rightWins / battles * 100}%`);
console.log(`Tie: ${ties / battles * 100}%`);