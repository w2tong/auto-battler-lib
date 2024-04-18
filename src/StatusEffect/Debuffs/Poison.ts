import { StatusEffectEventInterface } from '../StatusEffect';
import Debuff from './Debuff';

export default class Poison extends Debuff implements StatusEffectEventInterface {
    name: string = 'Poison';
    symbol: string = '🤢';

    static baseDamage = 1;
    static healthDamagePercent = 0.01;
    
    onTurnEnd() {
        for (const [key, instance] of Object.entries(this.instances)) {
            this.char.takeDamage({
                source: `${Poison.name} (${instance.source.name})`, 
                damage: Poison.baseDamage + Math.floor(this.char.currentHealth * Poison.healthDamagePercent),
                armourPenetration: instance.source.stats.armourPenetration,
                addToLog: true
            });

            instance.stacks -= 1;
            if (instance.stacks <= 0) this.remove(key);
        }
    }
}