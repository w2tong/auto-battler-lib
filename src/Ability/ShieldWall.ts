import type Ability from './Ability';
import AbilityId from './AbilityId';
import { formatNum } from '../util';
import ShieldWallBuff from '../StatusEffect/Buffs/ShieldWall';
import AttributeType from '../Character/Attributes/AttributeType';

const STACKS = 3;

const ShieldWall: Ability = {
    id: AbilityId.ShieldWall,
    name: 'Shield Wall',
    description: (char) => {
        let blockChance = null;
        let thorns = null;
        if (char) {
            blockChance = ShieldWallBuff.calcBlockChance(char.level, char.attributes.strength);
            thorns = ShieldWallBuff.calcThorns(char.level, char.attributes.strength);
        }
        return `Increases Block Chance${blockChance ? ` by ${formatNum(blockChance)}%` : ''} and Thorns${thorns ? ` by ${formatNum(thorns)}` : ''} for ${STACKS} turns.`;
    },
    func: function (char) {
        char.useAbilityMana();
        if (char.battle) char.battle.ref.log.addAbility(char.name, this.name);

        char.statusEffectManager.add(new ShieldWallBuff({
            char,
            source: char,
            stacks: STACKS
        }));
    },
    scaling: ['Level', AttributeType.Strength],
} as const;

export default ShieldWall;