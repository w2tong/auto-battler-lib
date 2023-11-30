import HitType from './HitType';

enum LineType {
    // Text
    Text = 'Text',
    // Combat
    Attack = 'Attack',
    Damage = 'Damage',
    // Results
    Loot = 'Loot',
    Exp = 'Exp',
    LevelUp = 'Level Up'
}

type BaseLine = {
    type: LineType;
}

interface TextLine extends BaseLine {
    type: LineType.Text;
    text: string;
}

interface LootLine extends BaseLine {
    type: LineType.Loot;
    name: string;
    itemId: string;
}

type LogLine = TextLine | LootLine;

class Log {
    
    private _log: LogLine[][] = [];

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

    add(text: string) {
        this.last.push({
            type: LineType.Text, 
            text
        });
    }

    addLoot(name: string, itemId: string) {
        this.last.push({
            type: LineType.Loot,
            name,
            itemId
        });
    }

    addAttack(charName: string, tarName: string, attackDetails: string, hitType: HitType, sneak: boolean) {
        this.add(`${charName} ⚔️ ${tarName} (${attackDetails}). ${hitType.toString()}${sneak ? ' (Sneak Attack)' : ''}.`);
    }
}

export default Log;
export { LogLine };