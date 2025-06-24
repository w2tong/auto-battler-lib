import type Ability from './Ability';
import AbilityId from './AbilityId';
import Invisible from '../StatusEffect/Buffs/Invisible';
import AttributeType from '../Character/Attributes/AttributeType';
import Attributes from '../Character/Attributes/Attributes';
import Stats from '../Character/Stats/Stats';

const stacksPerLvl = 0.5;
const stacksPerDex = 0.4;

const Vanish: Ability = {
    id: AbilityId.Vanish,
    name: 'Vanish',
    description: (char) => {
        const stacks = char ? 1 + Math.floor(stacksPerLvl * (char.level - 1)) + Math.trunc(stacksPerDex * (char.attributes.dexterity - Attributes.DEFAULT_VALUE)) : null;
        return `Gain${stacks ? ` ${stacks}` : ''} ${Invisible.name}, causing your next attack to be a sneak attack, dealing ${Invisible.damage} damage per stack, or ${Invisible.damage * (1 + Stats.TWO_HANDED_BONUS)} if using a two-handed weapon.`;
    },
    func: function (char) {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.addAbility(char.name, this.name);

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