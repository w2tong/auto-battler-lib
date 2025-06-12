import Ability from './Ability';
import Blessed from '../StatusEffect/Buffs/Blessed';
import { formatNum, getRandomRange } from '../util';
import AbilityId from './AbilityId';
import AttributeType from '../Character/Attributes/AttributeType';

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
        return `Increases Accuracy${accuracy ? ` by ${formatNum(accuracy)}` : ''} and Damage${damage ? ` by ${formatNum(damage)}` : ''} for ${STACKS} turns.`;
    },
    func: (char) => {
        if (!char.battle) return;

        char.useAbilityMana();
        const targets = char.battle.ref.getAliveTargets(char.battle.side);
        const target = targets[getRandomRange(targets.length)];
        char.battle.ref.log.add(`${char.name} casted ${NAME} on ${target.name}.`);
        target.statusEffectManager.add(new Blessed({
            char: target,
            source: char,
            stacks: STACKS
        }));
    },
    scaling: ['Level', AttributeType.Wisdom]
} as const;

export default Bless;