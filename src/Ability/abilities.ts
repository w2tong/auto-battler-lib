import Ability from './Ability';
import AbilityId from './AbilityId';

import Bless from './Bless';
import DoubleStrike from './DoubleStrike';
import FerociousBite from './FerociousBite';
import Firebolt from './Firebolt';
import SerpentSting from './SerpentSting';
import ShieldWall from './ShieldWall';
import Vanish from './Vanish';
import WoundingShot from './WoundingShot';

const abilities: Record<AbilityId, Ability> = {
    // Fighter
    [AbilityId.DoubleStrike]: DoubleStrike,
    [AbilityId.ShieldWall]: ShieldWall,

    // Priest
    [AbilityId.Bless]: Bless,

    // Ranger
    [AbilityId.SerpentSting]: SerpentSting,
    [AbilityId.WoundingShot]: WoundingShot,

    // Rogue
    [AbilityId.Vanish]: Vanish,

    // Wizard
    [AbilityId.Firebolt]: Firebolt,

    // Other
    [AbilityId.FerociousBite]: FerociousBite,
} as const;

export default abilities;