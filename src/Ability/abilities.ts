import Ability from './Ability';
import AbilityId from './AbilityId';

import Bless from './Bless';
import DoubleStrike from './DoubleStrike';
import EnvenomWeapon from './EnvenomWeapon';
import FerociousBite from './FerociousBite';
import Firebolt from './Firebolt';
import Frostbolt from './Frostbolt';
import SerpentSting from './SerpentSting';
import ShieldWall from './ShieldWall';
import Smite from './Smite';
import Vanish from './Vanish';
import WoundingShot from './WoundingShot';

const abilities: Record<AbilityId, Ability> = {
    // Fighter
    [AbilityId.DoubleStrike]: DoubleStrike,
    [AbilityId.ShieldWall]: ShieldWall,

    // Priest
    [AbilityId.Bless]: Bless,
    [AbilityId.Smite]: Smite,

    // Ranger
    [AbilityId.SerpentSting]: SerpentSting,
    [AbilityId.WoundingShot]: WoundingShot,

    // Rogue
    [AbilityId.Vanish]: Vanish,
    [AbilityId.EnvenomWeapon]: EnvenomWeapon,

    // Wizard
    [AbilityId.Firebolt]: Firebolt,
    [AbilityId.Frostbolt]: Frostbolt,

    // Other
    [AbilityId.FerociousBite]: FerociousBite,
} as const;

export default abilities;