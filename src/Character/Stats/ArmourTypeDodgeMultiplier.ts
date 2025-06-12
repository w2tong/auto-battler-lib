import { ArmourType } from '../../Equipment/Armour';

const ArmourTypeDodgeMultiplier: { [type in ArmourType]: number } = {
    [ArmourType.Unarmoured]: 1,
    [ArmourType.Light]: 0.7,
    [ArmourType.Medium]: 0.4,
    [ArmourType.Heavy]: 0.1,
};

export default ArmourTypeDodgeMultiplier;