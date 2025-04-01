import BuffId from './BuffId';

import Bless from './Buffs/Blessed';
import Invisible from './Buffs/Invisible';

export default {
    [BuffId.Invisible]: Invisible,
    [BuffId.Blessed]: Bless,
} as const;