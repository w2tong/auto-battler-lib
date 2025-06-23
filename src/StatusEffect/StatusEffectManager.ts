import Character from '../Character/Character';
import { getOutgoingStatusEffectId, getCharBattleId } from '../util';
import Buff from './Buff';
import Debuff from './Debuff';
import StatusEffect from './StatusEffect';
import BuffId from './types/BuffId';
import DebuffId from './types/DebuffId';

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

    private addStatusEffect<T extends Buff | Debuff, IdType extends string>(
        effect: T,
        map: { [id in IdType]?: { [key: string]: T; } },
        addOutgoing: (id: IdType, char: Character, ref: T) => void
    ) {
        if (effect.stacks <= 0) return;
        const id = effect.id as IdType;
        if (map[id] === undefined) map[id] = {};
        const battleId = getCharBattleId(effect.source);
        const effectMap = map[id]!;
        if (effectMap[battleId] === undefined) {
            effectMap[battleId] = effect;
            addOutgoing(id, this.char, effectMap[battleId]);
            effect.onApply();
        } else {
            effectMap[battleId].add(effect);
        }
    }

    add(statusEffect: StatusEffect) {
        if (statusEffect instanceof Buff) {
            this.addStatusEffect(
                statusEffect,
                this._buffs,
                (id, char, ref) => statusEffect.source.statusEffectManager.addOutgoingBuff(id, char, ref)
            );
        }
        else if (statusEffect instanceof Debuff) {
            this.addStatusEffect(
                statusEffect,
                this._debuffs,
                (id, char, ref) => statusEffect.source.statusEffectManager.addOutgoingDebuff(id, char, ref)
            );
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
        for (const buff of Object.values(this.outgoingBuffs)) buff.onSourceTurnStart(this.char);
        for (const debuff of Object.values(this.outgoingDebuffs)) debuff.onSourceTurnStart(this.char);

        if (!this.char.isDead()) {
            for (const buffId of Object.values(this.buffs)) {
                for (const buff of Object.values(buffId)) {
                    buff.onTurnStart();
                    if (this.char.isDead()) return;
                }
            }
            for (const debuffId of Object.values(this.debuffs)) {
                for (const debuff of Object.values(debuffId)) {
                    debuff.onTurnStart();
                    if (this.char.isDead()) return;
                }
            }
        }
    }

    turnEnd() {
        for (const buff of Object.values(this.outgoingBuffs)) buff.onSourceTurnEnd(this.char);
        for (const debuff of Object.values(this.outgoingDebuffs)) debuff.onSourceTurnEnd(this.char);

        if (!this.char.isDead()) {
            for (const buffId of Object.values(this.buffs)) {
                for (const buff of Object.values(buffId)) {
                    buff.onTurnEnd();
                    if (this.char.isDead()) return;
                }
            }
            for (const debuffId of Object.values(this.debuffs)) {
                for (const debuff of Object.values(debuffId)) {
                    debuff.onTurnEnd();
                    if (this.char.isDead()) return;
                }
            }
        }
    }

    onAttack(hit: boolean, target: Character) {
        for (const buffId of Object.values(this.buffs)) {
            for (const buff of Object.values(buffId)) {
                buff.onAttack(hit, target);
            }
        }
        for (const debuffId of Object.values(this.debuffs)) {
            for (const debuff of Object.values(debuffId)) {
                debuff.onAttack(hit, target);
            }
        }
    }
}