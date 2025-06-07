import Ability from './Ability';
import { formatNum } from '../util';
import AbilityId from './AbilityId';
import ShieldWallBuff from '../StatusEffect/Buffs/ShieldWall';

const NAME = 'Shield Wall';
const STACKS = 3;

const ShieldWall: Ability = {
    id: AbilityId.Bless,
    name: NAME,
    description: (char) => {
        let blockChance = null;
        let thorns = null;
        if (char) {
            blockChance = ShieldWallBuff.calcBlockChance(char.level, char.attributes.strength);
            thorns = ShieldWallBuff.calcThorns(char.level, char.attributes.strength);
        }
        return `Gain ${ShieldWallBuff.name} for ${STACKS} turns, increasing Block Chance${blockChance ? ` by ${formatNum(blockChance)}` : ''} and Thorns${thorns ? ` by ${formatNum(thorns)}` : ''}.`;
    },
    func: (char) => {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.add(`${char.name} used ${NAME}.`);
        char.statusEffectManager.add(new ShieldWallBuff({
            char,
            source: char,
            stacks: STACKS
        }));
    }
} as const;

export default ShieldWall;