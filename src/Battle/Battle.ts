import type Character from '../Character/Character';
import Log from './Log';
import { rollDice, dice } from '../dice';

enum Side {
    Left = 'Left',
    Right = 'Right',
    Tie = 'Tie'
}

type TurnRes = { combatEnded: false; } | { combatEnded: true, winner: Side; };

class Battle {
    private readonly _left: Character[] = [];
    private leftAlive: Set<number> = new Set();

    private readonly _right: Character[] = [];
    private rightAlive: Set<number> = new Set();

    private _turnIndex = 0;
    private readonly _turnOrder: { char: Character, init: number; }[] = [];
    private _aliveTurnOrder: { char: Character, index: number; }[] = [];

    private readonly _log: Log;

    constructor(left: Character[], right: Character[]) {
        this._left = this.getCharsWithPets(left);
        this.leftAlive = new Set(Array(this.left.length).keys());
        for (let i = 0; i < this.left.length; i++) {
            this.left[i].setBattle(this, Side.Left, i);
        }

        this._right = this.getCharsWithPets(right);
        this.rightAlive = new Set(Array(this.right.length).keys());
        for (let i = 0; i < this.right.length; i++) {
            this.right[i].setBattle(this, Side.Right, i);
        }

        this._log = new Log();
    }

    private getCharsWithPets(chars: Character[]) {
        const res: Character[] = [];
        for (const char of chars) {
            res.push(char);
            if (char.pet !== null) res.push(char.pet);
        }
        return res;
    }

    get log() {
        return this._log;
    }

    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
    get turnIndex() {
        return this._turnIndex;
    }
    get turnOrder() {
        return this._turnOrder;
    }
    get aliveTurnOrder() {
        return this._aliveTurnOrder;
    }

    getAliveTargets(side: Side) {
        const alive = side === Side.Left ? this.leftAlive : this.rightAlive;
        const chars = side === Side.Left ? this.left : this.right;
        const result: Character[] = [];
        for (const i of alive) {
            result.push(chars[i]);
        }
        return result;
    }

    setCharDead(side: Side, index: number) {
        if (side === Side.Tie) return;
        let char: Character | null = null;
        if (side === Side.Left) {
            char = this.left[index];
            this.leftAlive.delete(index);
        }
        else if (side === Side.Right) {
            char = this.right[index];
            this.rightAlive.delete(index);
        }

        if (char === null) return;
        this._aliveTurnOrder = this._aliveTurnOrder.filter(c => c.char !== char);
    }

    startCombat() {
        // Assign turn order for characters
        for (const char of this.left) {
            const init = rollDice(dice['1d20']) + char.initiative;
            this._turnOrder.push({ char, init });
        }
        for (const char of this.right) {
            const init = rollDice(dice['1d20']) + char.initiative;
            this._turnOrder.push({ char, init });
        }
        this._turnOrder.sort((a, b) => b.init - a.init);
        this._aliveTurnOrder = this._turnOrder.map((c, i) => { return { char: c.char, index: i }; });
    }

    nextTurn(): TurnRes {
        this.log.nextTurn();
        let res: TurnRes = { combatEnded: false };

        const char = this.turnOrder[this.turnIndex].char;
        char.doTurn();

        this._turnIndex++;
        if (this.turnIndex >= this.turnOrder.length) this._turnIndex = 0;

        if (this.leftAlive.size === 0 && this.rightAlive.size === 0) {
            res = { combatEnded: true, winner: Side.Tie };
            this.log.addResult(Side.Tie);
        }
        else if (this.leftAlive.size === 0) {
            res = { combatEnded: true, winner: Side.Right };
            this.log.addResult(Side.Right);
        }
        else if (this.rightAlive.size === 0) {
            res = { combatEnded: true, winner: Side.Left };
            this.log.addResult(Side.Left);
        }

        return res;
    }
}

export default Battle;
export { Side, TurnRes };
