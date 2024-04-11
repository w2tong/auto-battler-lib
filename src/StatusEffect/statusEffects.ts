import Buff from './StatusEffect';
import Bless from './Buffs/Bless';
import Invisible from './Buffs/Invisible';
import Burn from './Debuffs/Burn';
import Frozen from './Debuffs/Frozen';
import Poison from './Debuffs/Poison';

enum BuffId {
    Invisible = 'Invisible',
    Bless = 'Bless',
}
const Buffs: {[id in BuffId]: Buff} = {
    [BuffId.Invisible]: Invisible,
    [BuffId.Bless]: Bless,
} as const;

enum DebuffId {
    Burn = 'Burn',
    Poison = 'Poison',
    Frozen = 'Frozen',
}
const Debuffs: {[id in DebuffId]: Buff} = {
    [DebuffId.Burn]: Burn,
    [DebuffId.Poison]: Poison,
    [DebuffId.Frozen]: Frozen,
} as const;

export { BuffId, Buffs, DebuffId, Debuffs };