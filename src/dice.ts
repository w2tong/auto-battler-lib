type Dice = {num: number, sides: number}

type DiceRoll = '1d2'|'1d3'|'1d4'|'1d6'|'1d8'|'1d10'|'1d12'|'1d20'
| '2d6'
const dice: {[key in DiceRoll]: Dice} = {
    '1d2': {num: 1, sides: 2},
    '1d3': {num: 1, sides: 3},
    '1d4': {num: 1, sides: 4},
    '1d6': {num: 1, sides: 6},
    '1d8': {num: 1, sides: 8},
    '1d10': {num: 1, sides: 10},
    '1d12': {num: 1, sides: 12},
    '1d20': {num: 1, sides: 20},
    '2d6': {num: 2, sides: 6},
} as const;

function rollDice(dice: Dice): number {
    let sum = 0;
    for (let i = 0; i < dice.num; i++) {
        sum += Math.floor(Math.random() * dice.sides + 1);
    }
    return sum;
}

export { Dice, dice, rollDice };