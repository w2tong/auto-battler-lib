import { StatusEffectEventInterface } from '../StatusEffect';
import Debuff from './Debuff';

export default class Burn extends Debuff implements StatusEffectEventInterface {
    name: string = 'Burn';
    symbol: string = '🔥';

    static baseDamage = 1;
    static spellPowerRatio = 0.2;
    
    onTurnEnd() {
        for (const [key, instance] of Object.entries(this.instances)) {
            this.char.takeDamage({
                source: `${Burn.name} (${instance.source.name})`, 
                damage: Burn.baseDamage + Math.floor(instance.source.stats.spellPower * Burn.spellPowerRatio),
                armourPenetration: instance.source.stats.armourPenetration,
                addToLog: true
            });

            instance.stacks -= 1;
            if (instance.stacks <= 0) this.remove(key);
        }
    }
}