import { ArmourType } from '../../Equipment/Armour';

const ArmourTypeDodgeMultiplier: { [type in ArmourType]: number } = {
    [ArmourType.Unarmoured]: 1,
    [ArmourType.Light]: 0.8,
    [ArmourType.Medium]: 0.4,
    [ArmourType.Heavy]: 0.2,
};

export default ArmourTypeDodgeMultiplier;