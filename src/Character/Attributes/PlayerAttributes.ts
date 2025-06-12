import LevelRange from '../../types/LevelRange';

const STARTING_POINTS = 10;
const POINTS_PER_LEVEL = 3;
const LEVEL_CAPS: Record<LevelRange, number> = {
    1: 20,
    2: 20,
    3: 20,
    4: 20,
    5: 20,

    6: 30,
    7: 30,
    8: 30,
    9: 30,
    10: 30,

    11: 40,
    12: 40,
    13: 40,
    14: 40,
    15: 40,

    16: 50,
    17: 50,
    18: 50,
    19: 50,
    20: 50
} as const;

export { STARTING_POINTS, POINTS_PER_LEVEL, LEVEL_CAPS };