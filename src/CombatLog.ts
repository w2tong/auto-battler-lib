import HitType from './HitType';

class CombatLog {
    
    private _log: string[][] = [];

    get log() {
        return this._log;
    }

    get flatLog() {
        return this._log.flat();
    }

    get last() {
        return this.log[this.log.length-1];
    }

    nextTurn() {
        this.log.push([]);
    }

    add(line: string) {
        this.last.push(line);
    }

    addAttack(charName: string, tarName: string, attackDetails: string, hitType: HitType, sneak: boolean) {
        this.last.push(`${charName} ⚔️ ${tarName} (${attackDetails}). ${hitType.toString()}${sneak ? ' (Sneak Attack)' : ''}.`);
    }
}

export default CombatLog;