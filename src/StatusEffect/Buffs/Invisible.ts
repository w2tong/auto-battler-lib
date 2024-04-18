import { StatusEffectEventInterface } from '../StatusEffect';
import Buff from './Buff';

// TODO: remove all stacks on attack
export default class Invisible extends Buff implements StatusEffectEventInterface {
    name: string = 'Invisible';
    symbol: string = '☁️';

    static damage = 2;

    onAttack() {
        for (const key of Object.keys(this.instances)) {
            this.remove(key);
        }
    }
}