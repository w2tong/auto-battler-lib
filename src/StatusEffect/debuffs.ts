import DebuffId from './DebuffId';

import Burning from './Debuffs/Burning';
import Frozen from './Debuffs/Frozen';
import Poisoned from './Debuffs/Poisoned';

export default {
    [DebuffId.Burning]: Burning,
    [DebuffId.Poisoned]: Poisoned,
    [DebuffId.Frozen]: Frozen,
} as const;