import { ArmourType } from '../../Equipment/Armour';

const ArmourTypeDodgeMultiplier: { [type in ArmourType]: number } = {
    [ArmourType.Unarmoured]: 1,
    [ArmourType.Light]: 0.8,
    [ArmourType.Medium]: 0.5,
    [ArmourType.Heavy]: 0.25,
};

export default ArmourTypeDodgeMultiplier;