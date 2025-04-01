import DebuffId from './DebuffId';

import Burning from './Debuffs/Burning';
import Frozen from './Debuffs/Frozen';
import Poison from './Debuffs/Poison';

export default {
    [DebuffId.Burning]: Burning,
    [DebuffId.Poison]: Poison,
    [DebuffId.Frozen]: Frozen,
} as const;