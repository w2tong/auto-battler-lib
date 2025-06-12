import Invisible from '../StatusEffect/Buffs/Invisible';
import Ability from './Ability';
import AbilityId from './AbilityId';
import AttributeType from '../Character/Attributes/AttributeType';
import Attributes from '../Character/Attributes/Attributes';

const NAME = 'Vanish';
const stacksPerLvl = 0.5;
const stacksPerDex = 0.2;

const Vanish: Ability = {
    id: AbilityId.Vanish,
    name: NAME,
    description: (char) => {
        const stacks = char ? 1 + Math.floor(stacksPerLvl * (char.level - 1)) + Math.trunc(stacksPerDex * (char.attributes.dexterity - Attributes.DEFAULT_VALUE)) : null;
        return `Gain${stacks ? ` ${stacks}` : ''} ${Invisible.name}, causing your next attack to be a sneak attack, dealing ${Invisible.damage} damage per stack.`;
    },
    func: (char) => {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        const stacks = 1 + Math.floor(stacksPerLvl * (char.level - 1)) + Math.trunc(stacksPerDex * (char.attributes.dexterity - Attributes.DEFAULT_VALUE));
        char.statusEffectManager.add(new Invisible({
            char,
            source: char,
            stacks
        }));
    },
    scaling: ['Level', AttributeType.Dexterity]

} as const;

export default Vanish;