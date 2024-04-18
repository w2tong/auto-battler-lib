import Character from '../Character/Character';

type OnEventFunction = () => void
enum StatusEffectType {
    Buff = 'Buff',
    Debuff = 'Debuff'
}

abstract class StatusEffect {
    abstract readonly name: string;
    abstract readonly symbol: string;
    readonly char: Character;
    readonly instances: {[key: string]: {source: Character, stacks: number}} = {};

    constructor(char: Character) {
        this.char = char;
    }

    get stacks(): number {
        return Object.values(this.instances).reduce((sum, curr) => sum + curr.stacks, 0);
    }

    add(id: string, source: Character, stacks: number) {
        if (this.char.battle) this.char.battle.ref.log.add(`${this.char.name} gained ${id}${stacks !== 1 ? `(${stacks})` : ''} from ${source.name}.`);

        if (this.instances[id]) this.instances[id].stacks += stacks;
        else this.instances[id] = {source, stacks};
    }

    remove(id: string) {
        if (this.char.battle) this.char.battle.ref.log.add(`${this.char.name} lost ${id} from ${this.instances[id].source.name}.`);

        delete this.instances[id];
    }
}

interface StatusEffectEventInterface {
    // Char events
    onTurnStart?: OnEventFunction;
    onTurnEnd?: OnEventFunction;
    onAttack?: OnEventFunction;
    onApply?: OnEventFunction;
    onExpire?: OnEventFunction;
    // Source events
    onSourceTurnStart?: OnEventFunction;
    onSourceTurnEnd?: OnEventFunction;
}

export default StatusEffect;
export { StatusEffectType, StatusEffectEventInterface };