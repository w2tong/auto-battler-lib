import { AttributeType } from '../Character/Attributes';
import Character from '../Character/Character';
import { StatType } from '../Character/Stats';

type OnEventFunction = (char: Character, source: Character) => void
enum StatusEffectType {
    Buff = 'Buff',
    Debuff = 'Debuff'
}

interface StatusEffect {
    type: StatusEffectType
    name: string;
    symbol: string;
    duration: boolean;
    stacks: boolean;
    attributes?: {[attr in AttributeType]: number};
    stats?: {[stat in StatType]: number};
    onTurnStart?: OnEventFunction;
    onTurnEnd?: OnEventFunction;
    onAttack?: OnEventFunction;
    onApply?: OnEventFunction;
    onExpire?: OnEventFunction;
}

export default StatusEffect;
export { StatusEffectType };