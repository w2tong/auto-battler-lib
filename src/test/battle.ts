import Battle from '../Battle';
import Character from '../Character/Character';
import StatType from '../Character/Stats/StatType';
import { getRandomEncounter } from '../encounters';

const testChar = new Character({
    name: 'Test',
    level: 1,
    attributes: {},
    statTemplate: {},
    equipment: {},
    // ability:
});

const battle = new Battle(
    [testChar],
    getRandomEncounter(1),
);

const left = battle.left[0];
const right = battle.right[0];

function displayCharacterStats(char: Character) {
    console.log(`${char.name}
Lvl. ${char.level}
Health: ${char.currentHealth}
Hit Chance: ${char.stats.hitChance}
Dodge Chance: ${char.stats.dodge}
Crit Chance: ${char.stats.critChance}
Crit Damage: ${char.stats.critDamage}
`);
}

displayCharacterStats(left);
displayCharacterStats(right);

battle.startCombat();
let combatEnded = false;

const interval = setInterval(() => {
    const res = battle.nextTurn();
    battle.log.last.forEach(line => {
        console.log(line.text);
    });
    console.log(left.name, left.currentHealth);
    console.log(right.name, right.currentHealth);
    combatEnded = res.combatEnded;

    if (res.combatEnded) clearInterval(interval);
}, 1000);