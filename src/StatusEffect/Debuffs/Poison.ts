import Debuff from '../Debuff';
import { StatusEffectType } from '../StatusEffect';

const name = 'Poison';
const damage = 1;

const Poison: Debuff = {
    type: StatusEffectType.Debuff,
    name,
    symbol: '🤢',
    duration: true,
    stacks: false,
    
    onTurnEnd: (char, source) => {
        char.takeDamage({
            source: `${name} (${source.name})`, 
            damage, 
            armourPenetration: source.stats.armourPenetration,
            addToLog: true
        });
    }
};

export default Poison;