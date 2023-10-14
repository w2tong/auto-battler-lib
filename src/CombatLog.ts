import HitType from './HitType';

class CombatLog {
    
    private _log: string[] = [];

    get log() {
        return this._log;
    }

    add(line: string) {
        this.log.push(line);
    }

    getLog() {
        if (!this.log.length) return 'None';
        return this.log.join('\n');
    }
}

function generateCombatAttack(charName: string, tarName: string, attackDetails: string, hitType: HitType, sneak: boolean) {
    return `${charName} ⚔️ ${tarName} (${attackDetails}). ${hitType.toString()}${sneak ? ' (Sneak Attack)' : ''}.`;
}

export default CombatLog;
export { generateCombatAttack };