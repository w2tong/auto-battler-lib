import Battle from '../Battle';
import Character from '../Character/Character';
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

// console.log(left.currentHealth);
// console.log(right.name, right.currentHealth, right.stats['Max Health'], right.stats.maxHealth);

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