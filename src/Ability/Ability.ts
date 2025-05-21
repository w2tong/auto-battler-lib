import Character from '../Character/Character';

interface Ability {
    name: string;
    description: (char?: Character) => string;
    func: (char: Character) => void;
}

export default Ability;