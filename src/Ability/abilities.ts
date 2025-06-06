import Ability from './Ability';
import AbilityId from './AbilityId';

import Bless from './Bless';
import DoubleStrike from './DoubleStrike';
import FerociousBite from './FerociousBite';
import Firebolt from './Firebolt';
import Vanish from './Vanish';
import WoundingShot from './WoundingShot';

const abilities: Record<AbilityId, Ability> = {
    [AbilityId.Bless]: Bless,
    [AbilityId.DoubleStrike]: DoubleStrike,
    [AbilityId.FerociousBite]: FerociousBite,
    [AbilityId.Firebolt]: Firebolt,
    [AbilityId.Vanish]: Vanish,
    [AbilityId.WoundingShot]: WoundingShot,
} as const;

export default abilities;