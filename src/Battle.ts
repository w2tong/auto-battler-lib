import Character, { CharacterJSON } from './Character/Character';
import CombatLog from './CombatLog';
import { rollDice, dice } from './dice';

enum Side {
    Left = 'Left',
    Right = 'Right',
    Tie = 'Tie'
}

type TurnRes = {
    combatEnded: boolean;
    winner?: Side;
}

type BattleJSON = {
    left: CharacterJSON[];
    right: CharacterJSON[];
    turnOrder: {name: string, init: number}[];
    turnIndex: number;
}

class Battle {
    private _left: Character[] = [];
    private leftAlive: Set<number> = new Set();

    private _right: Character[] = [];
    private rightAlive: Set<number> = new Set();

    private _turnIndex = -1;
    private _turnOrder: {char: Character, init: number}[] = [];

    private _combatLog: CombatLog;

    private winner?: Side; 

    constructor(left: Character[], right: Character[]) {
        this._left = left;
        this.leftAlive = new Set(Array(left.length).keys());
        for (let i = 0; i < this.left.length; i++) {
            this.left[i].setBattle(this, Side.Left, i);
        }

        this._right = right;
        this.rightAlive = new Set(Array(right.length).keys());
        for (let i = 0; i < this.right.length; i++) {
            this.right[i].setBattle(this, Side.Right, i);
        }

        this._combatLog = new CombatLog();
    }

    get combatLog() {
        return this._combatLog;
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

    getTargets(side: Side) {
        // Get alive chars
        return side === Side.Left ? Array.from(this.rightAlive.values()).map(i => this.right[i]) : Array.from(this.leftAlive.values()).map(i => this.left[i]);
    }

    setCharDead(side: Side, index: number) {
        let char: Character;
        if (side === Side.Left) {
            char = this.left[index];
            this.leftAlive.delete(index);
        }
        else {
            char = this.right[index];
            this.rightAlive.delete(index);
        }
        this._turnOrder = this.turnOrder.filter(c => c.char !== char);
    }

    startCombat() {
        // Assign turn order for characters
        for (const char of this.left) {
            const init = rollDice(dice['1d20']) + char.initiativeBonus;
            this.turnOrder.push({char, init});
        }
        for (const char of this.right) {
            const init = rollDice(dice['1d20']) + char.initiativeBonus;
            this.turnOrder.push({char, init});
        }
        this.turnOrder.sort((a, b) => b.init - a.init);
    }

    nextTurn(): TurnRes {
        this.combatLog.nextTurn();
        const res: TurnRes = {combatEnded: false};
        if (this.leftAlive.size === 0 && this.rightAlive.size === 0) {
            this.winner = Side.Tie;
            res.combatEnded = true;
            res.winner = Side.Tie;
            this.combatLog.add('Tie!');
        }
        else if (this.leftAlive.size === 0) {
            this.winner = Side.Right;
            res.combatEnded = true;
            res.winner = Side.Right;
            this.combatLog.add(`${'Right'} wins!`);
        }
        else if (this.rightAlive.size === 0) {
            this.winner = Side.Left;
            res.combatEnded = true;
            res.winner = Side.Left;
            this.combatLog.add(`${'Left'} wins!`);
        }
        else {
            this._turnIndex++;
            if (this.turnIndex >= this.turnOrder.length) this._turnIndex = 0;
            const char = this.turnOrder[this.turnIndex].char;
            char.doTurn();

            return {combatEnded: false};
        }

        return res;
    }

    json(): BattleJSON {
        return {
            left: [...this.left.map(char => char.json())],
            right: [...this.right.map(char => char.json())],
            turnOrder: this.turnOrder.map(charInit => {return {name: charInit.char.name, init: charInit.init};}),
            turnIndex: this.turnIndex,
        };
    }
}

export default Battle;
export { BattleJSON, Side };