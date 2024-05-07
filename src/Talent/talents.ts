import swordMastery from './Fighter/swordMastery';
import tripleStrike from './Fighter/tripleStrike';
import criticalChance from './Generic/criticalChance';

const genericTalents = {
    criticalChance
};

const fighterTalents = {
    swordMastery,
    tripleStrike,
} as const;

export { genericTalents, fighterTalents };