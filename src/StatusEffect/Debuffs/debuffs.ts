import Burn from './Burn';
import Frozen from './Frozen';
import Poison from './Poison';

enum DebuffId {
    Burn = 'Burn',
    Poison = 'Poison',
    Frozen = 'Frozen',
}

const Debuffs = {
    [DebuffId.Burn]: Burn,
    [DebuffId.Poison]: Poison,
    [DebuffId.Frozen]: Frozen,
} as const;

export { DebuffId, Debuffs };