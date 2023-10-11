
enum BuffId {
    Invisible = 'Invisible'
} 
const Buff = {
    Invisible: {
        name: 'Invisible',
        symbol: '🕵️'
    },
    // Bless = 'Bless'
} as const;

enum DebuffId {
    Burn = 'Burn',
    Frozen = 'Frozen',
    Poison = 'Poison'
}
const Debuff: {[id in DebuffId]: {name: string, symbol: string}} = {
    Burn: {
        name: 'Burn',
        symbol: '🔥'
    },
    Frozen: {
        name: 'Frozen',
        symbol: '🧊'
    },
    Poison: {
        name: 'Poison',
        symbol: '🤢'
    }
} as const;

export { Buff, BuffId, Debuff, DebuffId };