import Character from '../Character/Character';
import { StatusEffectType } from './StatusEffect';
import { BuffId, DebuffId } from './statusEffects';

type StatusEffectInfo = {
    source: Character;
    duration?: number;
    stacks?: number;
}

class StatusEffectManager {
    private char: Character;
    private buffs: {[id in BuffId]?: {[key: string]: StatusEffectInfo}} = {};
    private debuffs: {[id in DebuffId]?: {[key: string]: StatusEffectInfo}} = {};

    constructor(char: Character) {
        this.char = char;
    }

    getBuff(id: BuffId): number {
        if (this.buffs[id]) return Object.values(this.buffs[id]!).reduce((sum, curr) => sum + curr.duration, 0);
        return 0;
    }

    getBuffString(): string {
        const buffs = [];
        for (const [id, buff] of Object.entries(this.buffs)) {
            for (const charBuff of Object.values(buff)) {
                buffs.push(`${Buff[id as BuffId].symbol}(${charBuff.duration})`);
            }
        }
        return buffs.join(', ');
    }

    getDebuffString(): string {
        const debuffs = [];
        for (const [id, debuff] of Object.entries(this.debuffs)) {
            for (const charDebuff of Object.values(debuff)) {
                debuffs.push(`${Debuff[id as DebuffId].symbol}(${charDebuff.duration})`);
            }
            
        }
        return debuffs.join(', ');
    }

    private addStatusEffect({type, id}: {type: StatusEffectType.Buff, id: BuffId} | {type: StatusEffectType.Debuff, id: DebuffId}, {source, duration, stacks}: StatusEffectInfo) {
        if (!this.char.battle || !source.battle) return;
        
        const char = `${source.battle.side}${source.battle.index}`;
        let statusEffect;

        if (type === StatusEffectType.Buff) {
            if (!this.buffs[id]) this.buffs[id] = {};
            statusEffect = this.buffs[id];
        }
        else {
            if (!this.debuffs[id]) this.debuffs[id] = {};
            statusEffect = this.debuffs[id];
        }

        if (!statusEffect) return;
        if (!statusEffect[char]) statusEffect[char] = {source, duration, stacks};
        else {
            const charBuff = statusEffect[char];
            if (duration && charBuff.duration) charBuff.duration += duration;
            if (stacks && charBuff.stacks) charBuff.stacks += stacks;
        }

        this.char.battle.ref.log.add(`${this.char.name} gained ${type === StatusEffectType.Debuff ? 'de' : ''}buff ${id}${duration !== 1 ? `(${duration})` : ''}.`);
    }

    addBuff(id: BuffId, info: StatusEffectInfo) {
        this.addStatusEffect({type: StatusEffectType.Buff, id}, info);
    }

    addDebuff(id: DebuffId, info: StatusEffectInfo) {
        this.addStatusEffect({type: StatusEffectType.Debuff, id}, info);
    }

    tick() {
        if (!this.char.battle) return;

        // Tick buffs
        for (const [id, buff] of Object.entries(this.buffs)) {
            for (const [sideId, charBuff] of Object.entries(buff)) {
                
                charBuff.duration -= 1;

                if (charBuff.duration <= 0) {
                    delete this.buffs[id as BuffId]![sideId];
                    this.char.battle.ref.log.add(`${this.char.name} lost buff ${id}.`);
                }
            }
        }

        // Tick debuffs
        for (const [id, debuff] of Object.entries(this.debuffs)) {
            for (const [sideId, charDebuff] of Object.entries(debuff)) {
    
                charDebuff.duration -= 1;

                if (charDebuff.duration <= 0) {
                    delete this.debuffs[id as DebuffId]![sideId];
                    this.char.battle.ref.log.add(`${this.char.name} lost debuff ${id}.`);
                }
            }
        }
    }
}

export default StatusEffectManager;