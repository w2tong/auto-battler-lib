import Character from '../Character/Character';
import Buff from './Buffs/Buff';
import Debuff from './Debuffs/Debuff';
import { StatusEffectType } from './StatusEffect';
import { BuffId, Buffs, DebuffId, Debuffs } from './statusEffects';

export default class StatusEffectManager {
    private char: Character;
    private buffs: {[id in BuffId]?: Buff} = {};
    private debuffs: {[id in DebuffId]?: Debuff} = {};

    constructor(char: Character) {
        this.char = char;
    }

    getBuffStacks(id: BuffId) {
        return this.buffs[id]?.stacks ?? 0;
    }

    getStatusEffectString(statusEffects: {[id in BuffId]?: Buff}|{[id in DebuffId]?: Debuff}) {
        const arr: string[] = [];
        for (const statusEffect of Object.values(statusEffects)) {
            arr.push(`${statusEffect.symbol}(${statusEffect.stacks})`);
        }
        return arr.join(' ');
    }

    getBuffString(): string {
        return this.getStatusEffectString(this.buffs);
    }

    getDebuffString(): string {
        return this.getStatusEffectString(this.debuffs);
    }

    private addStatusEffect({type, id}: {type: StatusEffectType.Buff, id: BuffId} | {type: StatusEffectType.Debuff, id: DebuffId}, source: Character, stacks: number) {
    // private addStatusEffect(id: BuffId | DebuffId, source: Character, stacks: number) {
        if (!this.char.battle || !source.battle) return;
        
        const char = `${source.battle.side}${source.battle.index}`;
        let statusEffect;

        if (type === StatusEffectType.Buff) {
            console.log(id);
            if (!this.buffs[id]) this.buffs[id] = new Buffs[id](this.char);
            statusEffect = this.buffs[id];
        }
        else {
            if (!this.debuffs[id]) this.debuffs[id] = new Debuffs[id](this.char);
            statusEffect = this.debuffs[id];
        }

        if (!statusEffect) return;
        statusEffect.add(char, source, stacks);
    }

    addBuff(id: BuffId, source: Character, stacks: number) {
        this.addStatusEffect({type: StatusEffectType.Buff, id}, source, stacks);
    }

    addDebuff(id: DebuffId, source: Character, stacks: number) {
        this.addStatusEffect({type: StatusEffectType.Debuff, id}, source, stacks);
    }
}