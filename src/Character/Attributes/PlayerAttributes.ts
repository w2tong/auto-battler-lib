const STARTING_POINTS = 10;
const POINTS_PER_LEVEL = 3;
const LEVEL_CAPS: {[level: number]: number} = {
    5: 20,
    10: 25,
    15: 30,
    20: 35
} as const;

export { STARTING_POINTS, POINTS_PER_LEVEL, LEVEL_CAPS };