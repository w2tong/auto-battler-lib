import { AttributeType, BaseAttributes } from './Attributes';
import { ClassName } from './Classes/classes';

const PlayerAttributes: {[name in ClassName]: BaseAttributes} = {
    [ClassName.Fighter]: {
        [AttributeType.Strength]: 10,
        [AttributeType.Constitution]: 5
    },
    [ClassName.Rogue]: {
        [AttributeType.Strength]: 5,
        [AttributeType.Dexterity]: 10
    },
    [ClassName.Wizard]: {
        [AttributeType.Intelligence]: 10,
        [AttributeType.Wisdom]: 5
    },
} as const;

export { PlayerAttributes };