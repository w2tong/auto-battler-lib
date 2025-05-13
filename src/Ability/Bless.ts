import BuffId from '../StatusEffect/BuffId';
import Ability from './Ability';
import Blessed from '../StatusEffect/Buffs/Blessed';

const NAME = 'Bless';
const STACKS = 3;

const Bless: Ability = {
    name: NAME,
    description: (char) => {
        let damage = null;
        let accuracy = null;
        if (char) {
            damage = Blessed.baseDamage + Blessed.damagePerLvl * (char.level - 1) + Blessed.damagePerWisdom * char.attributes.wisdom;
            accuracy = Blessed.baseAccuracy + Blessed.accuracyPerLvl * (char.level - 1) + Blessed.accuracyPerWisdom * char.attributes.wisdom;
        }
        return `Gain ${STACKS} ${BuffId.Blessed} stacks, increasing Damage ${damage ? `by ${damage}` : ''} and Accuracy${accuracy ? ` by ${accuracy}` : ''}.`;
    },
    func: (char) => {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        // TODO: add targeting system for blessing allies
        char.statusEffectManager.addBuff(BuffId.Blessed, char, STACKS);
    }
};

export default Bless;