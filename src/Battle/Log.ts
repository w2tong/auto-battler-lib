import type HitType from '../types/HitType';
import { type Side } from './Battle';

enum LineType {
    // Text
    Text = 'Text',
    // Combat
    Attack = 'Attack',
    Damage = 'Damage',
    Turn = 'Turn',
    Death = 'Death',
    Ability = 'Ability',
    Potion = 'Potion',
    NoTarget = 'NoTarget',
    // Results
    Loot = 'Loot',
    Exp = 'Exp',
    LevelUp = 'Level Up',
    Result = 'Result'
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

interface AbilityLine extends BaseLine {
    type: LineType.Ability;
    name: string;
    ability: string;
    target?: string;
}

interface PotionLine extends BaseLine {
    type: LineType.Potion;
    name: string;
    potion: string;
    heal: number;
}

interface NoTargetLine extends BaseLine {
    type: LineType.NoTarget;
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

interface LevelUpLine extends BaseLine {
    type: LineType.LevelUp;
    name: string;
    level: number;
}

interface ResultLine extends BaseLine {
    type: LineType.Result;
    winner: Side;
}

type LogLine = TextLine | AttackLine | DamageLine | TurnLine | DeathLine | AbilityLine | PotionLine | NoTargetLine | LootLine | ExpLine | LevelUpLine | ResultLine;

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

    addAbility(name: string, ability: string, target?: string) {
        this.last.push({
            type: LineType.Ability,
            name,
            ability,
            target
        });
    }

    addPotion(name: string, potion: string, heal: number) {
        this.last.push({
            type: LineType.Potion,
            name,
            potion,
            heal
        });
    }

    addNoTarget(name: string) {
        this.last.push({
            type: LineType.NoTarget,
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

    addResult(winner: Side) {
        this.last.push({
            type: LineType.Result,
            winner
        });
    }
}

export default Log;
export { TextLine, AttackLine, DamageLine, TurnLine, DeathLine, AbilityLine, PotionLine, NoTargetLine, LootLine, ExpLine, LevelUpLine, ResultLine, LogLine, LineType };