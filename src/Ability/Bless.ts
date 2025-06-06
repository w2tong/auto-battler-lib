import BuffId from '../StatusEffect/types/BuffId';
import Ability from './Ability';
import Blessed from '../StatusEffect/Buffs/Blessed';
import { formatNum } from '../util';
import AbilityId from './AbilityId';

const NAME = 'Bless';
const STACKS = 3;

const Bless: Ability = {
    id: AbilityId.Bless,
    name: NAME,
    description: (char) => {
        let damage = null;
        let accuracy = null;
        if (char) {
            accuracy = Blessed.calcAccuracy(char.level, char.attributes.wisdom);
            damage = Blessed.calcDamage(char.level, char.attributes.wisdom);
        }
        return `Gain ${STACKS} ${BuffId.Blessed} stacks, increasing Accuracy${accuracy ? ` by ${formatNum(accuracy)}` : ''} and Damage${damage ? ` by ${formatNum(damage)}` : ''}.`;
    },
    func: (char) => {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        // TODO: add targeting system for blessing allies
        char.statusEffectManager.add(new Blessed({
            char,
            source: char,
            stacks: STACKS
        }));
    }
} as const;

export default Bless;