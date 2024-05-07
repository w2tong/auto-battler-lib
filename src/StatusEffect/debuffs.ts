import DebuffId from './DebuffId';

import Burn from './Debuffs/Burn';
import Frozen from './Debuffs/Frozen';
import Poison from './Debuffs/Poison';

export default {
    [DebuffId.Burn]: Burn,
    [DebuffId.Poison]: Poison,
    [DebuffId.Frozen]: Frozen,
} as const;