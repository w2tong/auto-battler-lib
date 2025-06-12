import HitType from '../types/HitType';

enum LineType {
    // Text
    Text = 'Text',
    // Combat
    Attack = 'Attack',
    Damage = 'Damage',
    Turn = 'Turn',
    Death = 'Death',
    // Results
    Loot = 'Loot',
    Exp = 'Exp',
    LevelUp = 'Level Up'
}

type BaseLine = {
    type: LineType;
};

interface TextLine extends BaseLine {
    type: LineType.Text;
    text: string;
}

interface AttackLine extends BaseLine {
    type: LineType.Attack;
    name: string;
    target: string;
    hitType: HitType;
    damage: number;
    sneak: boolean;
    blocked: boolean;
    abilityName?: string;
}

interface DamageLine extends BaseLine {
    type: LineType.Damage;
    name: string;
    source: string;
    damage: number;
}

interface TurnLine extends BaseLine {
    type: LineType.Turn;
    name: string;
}

interface DeathLine extends BaseLine {
    type: LineType.Death;
    name: string;
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

type LogLine = TextLine | AttackLine | DamageLine | TurnLine | DeathLine | LootLine | ExpLine | LevelLine;

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

    addAttack({ name, target, hitType, damage, sneak, blocked, abilityName }: { name: string, target: string, hitType: HitType, damage: number, sneak: boolean, blocked: boolean, abilityName?: string; }) {
        this.last.push({
            type: LineType.Attack,
            name,
            target,
            hitType,
            damage,
            sneak,
            blocked,
            abilityName
        });
    }

    addDamage(name: string, source: string, damage: number) {
        this.last.push({
            type: LineType.Damage,
            name,
            source,
            damage
        });
    }

    addTurn(name: string) {
        this.last.push({
            type: LineType.Turn,
            name
        });
    }

    addDeath(name: string) {
        this.last.push({
            type: LineType.Death,
            name
        });
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