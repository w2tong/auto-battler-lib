import ArmourTypeDodgeMultiplier from './ArmourTypeDodgeMultiplier';
import Stats from './Stats';
import StatType from './StatType';

// TODO: fix null coalese (change to if shorthand)
const dodgeDescription: string = Object.entries(ArmourTypeDodgeMultiplier).reduce((str, curr) => str + `\n${curr[0]}: ${curr[1] * 100}%`, '\nThe character\'s dodge is multipled by value of the armour worn.');
const twoHandedMultiplier = Stats.TWO_HANDED_BONUS * 100;

const StatDescriptions: Record<StatType, (num?: number) => string> = {
    // Doesn't make sense in character sheet
    [StatType.MaxHealth]: () => 'Amount of health the character has at the start of combat.',
    [StatType.HealthPercent]: (num) => `Increases health by ${num ? `${num}%` : 'a percentage'}.`,
    [StatType.Armour]: (num) => `Reduces damage taken by ${num ? `${num}%` : 'a percentage'}.`,
    [StatType.Deflection]: (num) => `Reduces damage taken by ${num ?? 'a flat amount'}.`,
    [StatType.Dodge]: () => 'Affects the chance of avoiding an incoming attack. Dodge is affected by the type of armour the character is wearing.' + '\n' + dodgeDescription,
    [StatType.StatusResistance]: (num) => `Reduces the chance of receiving debuffs${num ? ` by ${num}%` : ''}.`,
    [StatType.Thorns]: (num) => `Attackers take ${num ? `${num} ` : ''}damage when hit.`,
    // Block
    [StatType.BlockChance]: (num) => `Grants the character a ${num ? `${num} ` : ''}chance to block attacks, reducing damage taken.`,
    [StatType.BlockPower]: (num) => `Reduces damage taken from attacks ${num} when blocking.`,

    // Accuracy
    [StatType.Accuracy]: () => 'Affects the chance of all attacks hitting the target.',
    [StatType.OffHandAccuracy]: () => 'Affects the chance of off-hand attacks hitting the target.',
    [StatType.MeleeAccuracy]: () => 'Affects the chance of melee attacks hitting the target.',
    [StatType.RangedAccuracy]: () => 'Affects the chance of ranged attacks hitting the target.',
    [StatType.SpellAccuracy]: () => 'Affects the chance of spell attacks hitting the target.',

    // Damage
    [StatType.Damage]: (num) => `Increases damage of attacks by ${num}. This value is increased by ${twoHandedMultiplier}% if using a two-handed weapon.`,
    [StatType.DamagePercent]: (num) => `Increases all damage dealt by ${num ? `${num}%` : 'a percentage'}.`,

    // Critical
    [StatType.CriticalChance]: (num) => `Grants attacks a ${num ? `${num}%` : ''} chance of dealing increased damage.`,
    [StatType.CriticalDamage]: (num) => `When an attack lands a critical hit, it deals ${num ? `${num}% of its normal damage` : 'increased damage'}.`,

    // Defense Reduction
    [StatType.ArmourPenetration]: (num) => `When dealing damage to the target, reduce the target's armour by ${num}, to a minimum of 0 armour.`,
    [StatType.DodgeReduction]: (num) => `When attacking, reduces dodge of the target by ${num}.`,

    // Spell
    [StatType.SpellPower]: () => 'Affects attacks, abilities and status effects that have spell power ratios.',
    [StatType.SpellPowerPercent]: (num) => `Increases spell power by ${num ? `${num}%` : 'a percentage'}.`,

    // Mana
    [StatType.ManaCost]: () => 'Determines the mana cost of abilities.',
    [StatType.StartingMana]: () => 'The amount of mana that the character has at the start of combat.',
    [StatType.ManaRegen]: (num) => `Gain ${num} mana on turn end.`,
    [StatType.ManaOnHit]: (num) => `When an attack hits the target, gain ${num} mana. This value is increased by ${twoHandedMultiplier}% if using a two-handed weapon.`,

    // Initiative
    [StatType.Initiative]: () => 'Used to determine who acts first in the turn order.',

    // Potion
    [StatType.PotionCharges]: (num) => `Increases number of potion charges by ${num}.`,
    [StatType.PotionHealing]: (num) => `Increases potion healing by ${num ? num : 'a flat amount'}.`,
    [StatType.PotionEffectiveness]: (num) => `Increases potion healing by ${num ? `${num}%` : 'a percentage'}.`,
} as const;

export default StatDescriptions;