import BuffId from './BuffId';

import Blessed from './Buffs/Blessed';
import Invisible from './Buffs/Invisible';

export default {
    [BuffId.Invisible]: Invisible,
    [BuffId.Blessed]: Blessed,
} as const;