import Character from '../Character/Character';
import AbilityId from './AbilityId';

interface Ability {
    id: AbilityId;
    name: string;
    description: (char?: Character) => string;
    func: (char: Character) => void;
}

export default Ability;