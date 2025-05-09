import StatType from './StatType';

const StatDescriptions: Record<StatType, (num?: number) => string> = {
    [StatType.MaxHealth]: (num) => `Increases health by ${num ?? 'a flat amount'}.`,
    [StatType.HealthPercent]: (num) => `Increases health by ${num ? `${num}%` : 'a percentage'}.`,
    [StatType.Armour]: (num) => `Reduces damage taken by ${num ? `${num}%` : 'a percentage'}.`,
    [StatType.Deflection]: (num) => `Reduces damage taken by ${num ?? 'a flat amount'}.`,
    [StatType.Dodge]: () => 'Affects the chance of avoiding an incoming attack.',
    [StatType.StatusResistance]: (num) => `Reduces the chance of receiving debuffs${num ? ` by ${num}%` : ''}.`,
    [StatType.Thorns]: (num) => `Attackers take ${num ? `${num} ` : ''}damage when hit.`,
    // Block
    [StatType.BlockChance]: () => 'Chance to block an attack.',
    [StatType.BlockPower]: (num) => `Reduces damage taken from attacks ${num} when blocking.`,

    // Accuracy
    [StatType.Accuracy]: () => 'Affects the chance of all attacks hitting the target.',
    [StatType.OffHandAccuracy]: () => 'Affects the chance of off-hand attacks hitting the target.',
    [StatType.MeleeAccuracy]: () => 'Affects the chance of melee attacks hitting the target.',
    [StatType.RangedAccuracy]: () => 'Affects the chance of ranged attacks hitting the target.',
    [StatType.SpellAccuracy]: () => 'Affects the chance of spell attacks hitting the target.',

    // Damage
    [StatType.Damage]: (num) => `Increases damage of attacks by ${num}.`,
    [StatType.DamagePercent]: (num) => `Increases all damage dealt by ${num ? `${num}%` : 'a percentage'}.`,

    // Critical
    [StatType.CriticalChance]: (num) => `Grants attacks a ${num ? `${num}%` : ''} chance of dealing increased damage.`,
    [StatType.CriticalDamage]: (num) => `When an attack lands a critical hit, it deals ${num ? `${num}% of its normal damage` : 'increased damage'}.`,

    // Defense Reduction
    [StatType.ArmourPenetration]: (num) => `When dealing damage to the target, reduce the target's armour by ${num}, to a minimum of 0 armour.`,
    [StatType.DodgeReduction]: (num) => `When attacking, reduces dodge of the target by ${num}`,

    // Spell
    [StatType.SpellPower]: () => 'Affects attacks, abilities and status effects that have spell power ratios.',
    [StatType.SpellPowerPercent]: (num) => `Increases spell power by ${num ? `${num}%` : 'a percentage'}.`,

    // Mana
    [StatType.ManaCost]: () => 'Determines the mana cost of abilities.',
    [StatType.StartingMana]: () => 'The amount of mana that the character has at the start of combat.',
    [StatType.ManaRegen]: (num) => `Gain ${num} mana on turn end.`,
    [StatType.ManaOnHit]: (num) => `When an attack hits the target, gain ${num} mana.`,

    // Initiative
    [StatType.Initiative]: () => 'Used to determine who acts first in the turn order.',

    // Potion
    [StatType.PotionCharges]: (num) => `Increases number of potion charges by ${num}.`,
    [StatType.PotionHealing]: (num) => `Increases potion healing by ${num ?? 'a flat amount'}.`,
    [StatType.PotionEffectiveness]: (num) => `Increases potion healing by ${num ? `${num}%` : 'a percentage'}.`,
} as const;

export default StatDescriptions;