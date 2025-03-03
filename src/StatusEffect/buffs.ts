import BuffId from './BuffId';

import Bless from './Buffs/Bless';
import Invisible from './Buffs/Invisible';

export default {
    [BuffId.Invisible]: Invisible,
    [BuffId.Bless]: Bless,
} as const;