import type Character from '../../Character/Character';

type StatusEffectCtorArgs = {
    char: Character,
    source: Character,
    stacks: number;
};

export default StatusEffectCtorArgs;