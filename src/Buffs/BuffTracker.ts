import Character from '../Character/Character';
import { Buff, BuffId, Debuff, DebuffId } from './buffs';
import DamageType from '../DamageType';
import { dice, rollDice } from '../dice';

const BurnDamage = dice['1d3'];
const PoisonDamage = 1;

type BuffInfo = {
    duration: number;
    source: Character;
    new: boolean;
}

class BuffTracker {
    private char: Character;
    private buffs: {[id in BuffId]?: {[key: string]: BuffInfo}} = {};
    private debuffs: {[id in DebuffId]?: {[key: string]: BuffInfo}} = {};

    constructor(char: Character) {
        this.char = char;
    }

    getBuffCount() {
        return Object.keys(this.buffs).length;
    }

    getDebuffCount() {
        return Object.keys(this.debuffs).length;
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

    addBuff(id: BuffId, duration: number, source: Character) {
        if (!this.char.battle) return;
        if (!this.buffs[id]) this.buffs[id] = {};
        const sideId = `${source.battle?.side}${source.battle?.index}`;
        if (!this.buffs[id]![sideId]) {
            this.buffs[id]![sideId] = {duration, source, new: true};
        }
        else {
            this.buffs[id]![sideId].duration += duration;
            this.buffs[id]![sideId].new = true;
        }
        this.char.battle.ref.combatLog.add(`${this.char.name} gained buff ${id}(${duration}).`);
    }

    addDebuff(id: DebuffId, duration: number, source: Character) {
        if (!this.char.battle) return;
        if (!this.debuffs[id]) this.debuffs[id] = {};
        const sideId = `${source.battle?.side}${source.battle?.index}`;
        if (!this.debuffs[id]![sideId]) {
            this.debuffs[id]![sideId] = {duration, source, new: true};
        }
        else {
            this.debuffs[id]![sideId].duration += duration;
            this.debuffs[id]![sideId].new = true;
        }
        this.char.battle.ref.combatLog.add(`${this.char.name} gained debuff ${`${id}(${duration})`}.`);
    }

    tick() {
        if (!this.char.battle) return;

        // Tick buffs
        for (const [id, buff] of Object.entries(this.buffs)) {
            for (const [sideId, charBuff] of Object.entries(buff)) {
                if (charBuff.new) charBuff.new = false;
                else charBuff.duration -= 1;

                if (charBuff.duration <= 0) {
                    delete this.buffs[id as BuffId]![sideId];
                    this.char.battle.ref.combatLog.add(`${this.char.name} lost buff ${id}.`);
                }
            }
        }

        // Tick debuffs
        for (const [id, debuff] of Object.entries(this.debuffs)) {
            for (const [sideId, charDebuff] of Object.entries(debuff)) {
                if (id as DebuffId === DebuffId.Burn) {
                    this.char.takeDamage(`${Debuff.Burn.name} (${charDebuff.source.name})`, rollDice(BurnDamage) + Math.floor(charDebuff.source.mainHand.damageBonus/2), DamageType.Magic);
                }
                else if (id as DebuffId === DebuffId.Poison && this.debuffs.Poison) {
                    this.char.takeDamage(`${Debuff.Poison.name} (${charDebuff.source.name})`, PoisonDamage, DamageType.Physical);
                }
    
                charDebuff.duration -= 1;

                if (charDebuff.duration <= 0) {
                    delete this.debuffs[id as DebuffId]![sideId];
                    this.char.battle.ref.combatLog.add(`${this.char.name} lost debuff ${id}.`);
                }
            }
        }
    }
}

export default BuffTracker;