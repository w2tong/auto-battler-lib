import HitType from '../HitType';

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

interface ExpLine extends BaseLine {
    type: LineType.Exp;
    name: string;
    exp: number;
}

interface LevelLine extends BaseLine {
    type: LineType.LevelUp;
    name: string;
    level: number;
}

type LogLine = TextLine | LootLine | ExpLine | LevelLine;

class Log {

    private _log: LogLine[][] = [[]];

    get log() {
        return this._log;
    }

    get flatLog() {
        return this._log.flat();
    }

    get last() {
        return this.log[this.log.length - 1];
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

    addAttack({ charName, tarName, hitType, damage, sneak, blocked, abilityName }: { charName: string, tarName: string, hitType: HitType, damage: number, sneak: boolean, blocked: boolean, abilityName?: string }) {
        const attackName = abilityName ? `casted ${abilityName} on` : 'attacked';
        let attackStr = `${charName} ${attackName} ${tarName} and ${hitType}`;
        if (hitType !== HitType.Miss) {
            attackStr += ` for ${damage} damage`;
            if (sneak) attackStr += ' (Sneak Attack)';
            if (blocked) attackStr += ' (Blocked)';
        }
        this.add(`${attackStr}.`);
    }

    addDamage(name: string, source: string, damage: number) {
        this.add(`${name} took ${damage.toLocaleString()} damage from ${source}.`);
    }

    addLoot(name: string, itemId: string) {
        this.last.push({
            type: LineType.Loot,
            name,
            itemId
        });
    }

    addExp(name: string, exp: number) {
        this.last.push({
            type: LineType.Exp,
            name,
            exp
        });
    }

    addLevelUp(name: string, level: number) {
        this.last.push({
            type: LineType.LevelUp,
            name,
            level
        });
    }
}

export default Log;
export { LogLine, LineType };