import Character from '../Character/Character';
import { getOutgoingStatusEffectId, getCharBattleId } from '../util';
import Buff from './Buff';
import BuffId from './BuffId';
import buffs from './buffs';
import Debuff from './Debuff';
import DebuffId from './DebuffId';
import debuffs from './debuffs';

export default class StatusEffectManager {
    private char: Character;
    private _buffs: { [id in BuffId]?: { [key: string]: Buff; } } = {};
    private _debuffs: { [id in DebuffId]?: { [key: string]: Debuff; } } = {};

    private outgoingBuffs: { [key: string]: Buff; } = {};
    private outgoingDebuffs: { [key: string]: Debuff; } = {};

    constructor(char: Character) {
        this.char = char;
    }

    get buffs() {
        return this._buffs;
    }

    get debuffs() {
        return this._debuffs;
    }

    getBuffStacks(id: BuffId) {
        let count = 0;
        if (this.buffs[id]) {
            for (const buff of Object.values(this.buffs[id]!)) {
                count += buff.stacks;
            }
        }
        return count;
    }

    addBuff(id: BuffId, source: Character, stacks: number) {
        if (stacks <= 0) return;
        if (!this.buffs[id]) this.buffs[id] = {};
        const buff = this.buffs[id]![getCharBattleId(source)];
        if (!buff) {
            this.buffs[id]![getCharBattleId(source)] = new buffs[id](this, this.char, source, stacks);
            source.statusEffectManager.addOutgoingBuff(id, this.char, this.buffs[id]![getCharBattleId(source)]);
            this.buffs[id]![getCharBattleId(source)].onApply();
        }
        else {
            buff.addStacks(stacks);
        }
    }

    addDebuff(id: DebuffId, source: Character, stacks: number) {
        if (stacks <= 0) return;
        if (!this.debuffs[id]) this.debuffs[id] = {};
        const debuff = this.debuffs[id]![getCharBattleId(source)];
        if (!debuff) {
            this.debuffs[id]![getCharBattleId(source)] = new debuffs[id](this, this.char, source, stacks);
            source.statusEffectManager.addOutgoingDebuff(id, this.char, this.debuffs[id]![getCharBattleId(source)]);
            this.debuffs[id]![getCharBattleId(source)].onApply();
        }
        else {
            debuff.addStacks(stacks);
        }
    }

    removeBuff(id: BuffId, source: Character) {
        const sourceId = getCharBattleId(source);
        this.buffs[id]![sourceId].onExpire();
        delete this.buffs[id]![sourceId];
        source.statusEffectManager.removeOutgoingBuff(id, this.char);
    }

    removeDebuff(id: DebuffId, source: Character) {
        const sourceId = getCharBattleId(source);
        this.debuffs[id]![sourceId].onExpire();
        delete this.debuffs[id]![sourceId];
        source.statusEffectManager.removeOutgoingDebuff(id, this.char);
    }

    addOutgoingBuff(id: BuffId, char: Character, ref: Buff) {
        this.outgoingBuffs[getOutgoingStatusEffectId(id, char)] = ref;
    }
    addOutgoingDebuff(id: DebuffId, char: Character, ref: Debuff) {
        this.outgoingDebuffs[getOutgoingStatusEffectId(id, char)] = ref;
    }

    removeOutgoingBuff(id: BuffId, char: Character) {
        delete this.outgoingBuffs[getOutgoingStatusEffectId(id, char)];
    }
    removeOutgoingDebuff(id: DebuffId, char: Character) {
        delete this.outgoingDebuffs[getOutgoingStatusEffectId(id, char)];
    }

    turnStart() {
        for (const buffId of Object.values(this.buffs)) {
            for (const buff of Object.values(buffId)) {
                buff.onTurnStart();
            }
        }
        for (const debuffId of Object.values(this.debuffs)) {
            for (const debuff of Object.values(debuffId)) {
                debuff.onTurnStart();
            }
        }

        for (const buff of Object.values(this.outgoingBuffs)) buff.onSourceTurnStart(this.char);
        for (const debuff of Object.values(this.outgoingDebuffs)) debuff.onSourceTurnStart(this.char);
    }

    turnEnd() {
        for (const buffId of Object.values(this.buffs)) {
            for (const buff of Object.values(buffId)) {
                buff.onTurnEnd();
            }
        }
        for (const debuffId of Object.values(this.debuffs)) {
            for (const debuff of Object.values(debuffId)) {
                debuff.onTurnEnd();
            }
        }

        for (const buff of Object.values(this.outgoingBuffs)) buff.onSourceTurnEnd(this.char);
        for (const debuff of Object.values(this.outgoingDebuffs)) debuff.onSourceTurnEnd(this.char);
    }

    onAttack(hit: boolean) {
        for (const buffId of Object.values(this.buffs)) {
            for (const buff of Object.values(buffId)) {
                buff.onAttack(hit);
            }
        }
        for (const debuffId of Object.values(this.debuffs)) {
            for (const debuff of Object.values(debuffId)) {
                debuff.onAttack(hit);
            }
        }
    }

    // TODO: move following methods to client
    // getStatusEffectString(statusEffects: { [id in BuffId]?: Buff } | { [id in DebuffId]?: Debuff }) {
    //     const arr: string[] = [];
    //     for (const statusEffect of Object.values(statusEffects)) {
    //         arr.push(`${statusEffect.symbol}(${statusEffect.stacks})`);
    //     }
    //     return arr.join(' ');
    // }

    // getBuffString(): string {
    //     return this.getStatusEffectString(this.buffs);
    // }

    // getDebuffString(): string {
    //     return this.getStatusEffectString(this.debuffs);
    // }
}