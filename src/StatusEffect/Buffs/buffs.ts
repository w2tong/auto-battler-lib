import Bless from './Bless';
import Invisible from './Invisible';

enum BuffId {
    Invisible = 'Invisible',
    Bless = 'Bless',
}

const Buffs = {
    [BuffId.Invisible]: Invisible,
    [BuffId.Bless]: Bless,
} as const;

export { BuffId, Buffs };