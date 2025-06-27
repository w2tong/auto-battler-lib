import type Character from '../Character/Character';
import { getOutgoingStatusEffectId, getCharBattleId } from '../util';
import Buff from './Buff';
import Debuff from './Debuff';
import type StatusEffect from './StatusEffect';
import type BuffId from './types/BuffId';
import type DebuffId from './types/DebuffId';

export default class StatusEffectManager {
    private readonly char: Character;
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
        for (const buff of Object.values(this.buffs[id] ?? {})) {
            count += buff.stacks;
        }
        return count;
    }

    getDebuffStacks(id: DebuffId) {
        let count = 0;
        for (const debuff of Object.values(this.debuffs[id] ?? {})) {
            count += debuff.stacks;
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
        const buffs = this.buffs[id];
        const sourceId = getCharBattleId(source);
        if (buffs && buffs[sourceId]) {
            buffs[sourceId].onExpire();
            delete buffs[sourceId];
            source.statusEffectManager.removeOutgoingBuff(id, this.char);
        }

    }

    removeDebuff(id: DebuffId, source: Character) {
        const debuffs = this.debuffs[id];
        const sourceId = getCharBattleId(source);
        if (debuffs && debuffs[sourceId]) {
            debuffs[sourceId].onExpire();
            delete debuffs[sourceId];
            source.statusEffectManager.removeOutgoingDebuff(id, this.char);
        }
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

    /**
     * Helper to iterate over all buffs and debuffs and apply a callback.
     */
    private forEachEffect<T>(effectMap: { [id: string]: { [key: string]: T; } | undefined; }, fn: (effect: T) => boolean | void) {
        for (const idMap of Object.values(effectMap)) {
            if (!idMap) continue;
            for (const effect of Object.values(idMap)) {
                if (fn(effect)) return; // allow early return if callback returns true
            }
        }
    }

    turnStart() {
        for (const buff of Object.values(this.outgoingBuffs)) buff.onSourceTurnStart(this.char);
        for (const debuff of Object.values(this.outgoingDebuffs)) debuff.onSourceTurnStart(this.char);

        if (!this.char.isDead()) {
            this.forEachEffect(this.buffs, (buff) => {
                buff.onTurnStart();
                if (this.char.isDead()) return true;
            });
            this.forEachEffect(this.debuffs, (debuff) => {
                debuff.onTurnStart();
                if (this.char.isDead()) return true;
            });
        }
    }

    turnEnd() {
        for (const buff of Object.values(this.outgoingBuffs)) buff.onSourceTurnEnd(this.char);
        for (const debuff of Object.values(this.outgoingDebuffs)) debuff.onSourceTurnEnd(this.char);

        if (!this.char.isDead()) {
            this.forEachEffect(this.buffs, (buff) => {
                buff.onTurnEnd();
                if (this.char.isDead()) return true;
            });
            this.forEachEffect(this.debuffs, (debuff) => {
                debuff.onTurnEnd();
                if (this.char.isDead()) return true;
            });
        }
    }

    onAttack(hit: boolean, target: Character) {
        this.forEachEffect(this.buffs, (buff) => buff.onAttack(hit, target));
        this.forEachEffect(this.debuffs, (debuff) => debuff.onAttack(hit, target));
    }
}