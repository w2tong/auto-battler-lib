import type AttributeType from '../Character/Attributes/AttributeType';
import type Character from '../Character/Character';
import type StatType from '../Character/Stats/StatType';
import type AttackType from '../types/AttackType';
import type AbilityId from './AbilityId';

interface Ability {
    id: AbilityId;
    name: string;
    description: (char?: Character) => string;
    func: (char: Character) => void;
    scaling?: ReadonlyArray<'Level' | 'Weapon Damage' | AttributeType | StatType>;
    attackType?: AttackType;
}

export default Ability;