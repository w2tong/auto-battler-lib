import Character from '../Character/Character';
import BuffId from './BuffId';
import DebuffId from './DebuffId';

enum StatusEffectType {
    Buff = 'Buff',
    Debuff = 'Debuff'
}

abstract class StatusEffect {
    abstract readonly id: BuffId | DebuffId;
    abstract readonly type: StatusEffectType;
    abstract readonly name: string;
    abstract readonly symbol: string;
    readonly char: Character;
    readonly instances: {[key: string]: {source: Character, stacks: number}} = {};

    constructor(char: Character) {
        this.char = char;
    }

    // Status Effect events
    abstract onApply(): void;
    abstract onExpire(): void;
    // Char events
    abstract onTurnStart(): void;
    abstract onTurnEnd(): void;
    abstract onAttack(hit: boolean): void;
    // Source events
    abstract onSourceTurnStart(source: Character): void;
    abstract onSourceTurnEnd(source: Character): void;

    get stacks(): number {
        return Object.values(this.instances).reduce((sum, curr) => sum + curr.stacks, 0);
    }

    add(id: string, source: Character, stacks: number) {
        if (this.char.battle) this.char.battle.ref.log.add(`${this.char.name} gained ${this.name}${stacks !== 1 ? `(${stacks})` : ''} from ${source.name}.`);

        if (this.instances[id]) this.instances[id].stacks += stacks;
        else {
            this.instances[id] = {source, stacks};
            this.onApply();
        }
    }

    remove(id: string) {
        if (this.char.battle) this.char.battle.ref.log.add(`${this.char.name} lost ${this.name} from ${this.instances[id].source.name}.`);

        this.onExpire();
        if (this.id in BuffId) this.instances[id].source.statusEffectManager.removeOutgoingBuff(this.id as BuffId, this.char);
        else if (this.id in DebuffId) this.instances[id].source.statusEffectManager.removeOutgoingDebuff(this.id as DebuffId, this.char);
        
        delete this.instances[id];
    }
}

export default StatusEffect;
export { StatusEffectType };