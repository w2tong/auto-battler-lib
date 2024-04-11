import Debuff from '../Debuff';
import { StatusEffectType } from '../StatusEffect';
import { dice, rollDice } from '../../dice';

const name = 'Burn';
const BurnDamageDice = dice['1d3'];

const Burn: Debuff = {
    type: StatusEffectType.Debuff,
    name,
    symbol: '🔥',
    duration: true,
    stacks: false,
    
    onTurnEnd: (char, source) => {
        char.takeDamage({
            source: `${name} (${source.name})`, 
            damage: rollDice(BurnDamageDice) + Math.floor(source.stats.spellPower * 0.2),
            armourPenetration: source.stats.armourPenetration,
            addToLog: true
        });
    }
};

export default Burn;