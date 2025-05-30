import Character from '../Character/Character';
import { getOutgoingStatusEffectId, getCharBattleId } from '../util';
import Buff from './Buff';
import BuffId from './BuffId';
import Debuff from './Debuff';
import DebuffId from './DebuffId';

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

    getDebuffStacks(id: DebuffId) {
        let count = 0;
        if (this.debuffs[id]) {
            for (const debuff of Object.values(this.debuffs[id]!)) {
                count += debuff.stacks;
            }
        }
        return count;
    }

    addBuff(buff: Buff) {
        if (buff.stacks <= 0) return;
        const id = buff.id;
        if (this.buffs[id] === undefined) this.buffs[id] = {};
        const battleId = getCharBattleId(buff.source);
        const buffMap = this.buffs[id]!; // Non-null after assignment above
        if (buffMap[battleId] === undefined) {
            buffMap[battleId] = buff;
            buff.source.statusEffectManager.addOutgoingBuff(id, this.char, this.buffs[id]![battleId]);
            buff.onApply();
        }
        else {
            buffMap[battleId].add(buff);
        }
    }

    addDebuff(debuff: Debuff) {
        if (debuff.stacks <= 0) return;
        const id = debuff.id;
        if (this.debuffs[id] === undefined) this.debuffs[id] = {};
        const battleId = getCharBattleId(debuff.source);
        const debuffMap = this.debuffs[id]!; // Non-null after assignment above
        if (debuffMap[battleId] === undefined) {
            debuffMap[battleId] = debuff;
            debuff.source.statusEffectManager.addOutgoingDebuff(id, this.char, this.debuffs[id]![battleId]);
            debuff.onApply();
        }
        else {
            debuffMap[battleId].add(debuff);
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
}