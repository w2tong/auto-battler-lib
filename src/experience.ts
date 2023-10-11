const levelExp: {[level: number]: number} = {
    1: 100,
    2: 250,
    3: 500,
    4: 1_000,
    5: 1_500,
    6: 2_100,
    7: 2_800,
    8: 3_600,
    9: 4_700,
    10: 5_900,
    11: 7_300,
    12: 9_100,
    13: 11_000,
    14: 13_500,
    15: 16_300,
    16: 19_320,
    17: 22_900,
    18: 27_000,
    19: 31_500,
} as const;

const encounterExp: {[level: number]: number} = {
    1: 10,
    2: 20,
    3: 35,
    4: 50,
    5: 65,
    6: 80,
    7: 100,
    8: 120,
    9: 145,
    10: 170,
    11: 195,
    12: 225,
    13: 255,
    14: 285,
    15: 320,
    16: 355,
    17: 390,
    18: 430,
    19: 470,
    20: 500
} as const;

// Wins per encounter to level up
// for (let i = 1; i < 20; i++) {
//     console.log(i, levelExp[i] / encounterExp[i]);
// }

export {levelExp, encounterExp};