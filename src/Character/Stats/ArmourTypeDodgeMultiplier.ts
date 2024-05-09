import ArmourType from '../../ArmourType';

const ArmourTypeDodgeMultiplier: {[type in ArmourType]: number} = {
    [ArmourType.Unarmoured]: 1,
    [ArmourType.Light]: 0.9,
    [ArmourType.Medium]: 0.6,
    [ArmourType.Heavy]: 0.4,
};

export default ArmourTypeDodgeMultiplier;