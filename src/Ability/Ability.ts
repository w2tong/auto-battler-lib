import Character from '../Character/Character';

interface Ability {
    name: string;
    description: string;
    func: (char: Character) => undefined;
}

export default Ability;