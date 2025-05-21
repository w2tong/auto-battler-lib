enum StatType {
    // Defensive Stats
    MaxHealth = 'Max Health',
    HealthPercent = '% Health',
    Armour = 'Armour',
    Deflection = 'Deflection',
    Dodge = 'Dodge',
    StatusResistance = 'Status Resistance',
    Thorns = 'Thorns',

    BlockChance = 'Block Chance',
    BlockPower = 'Block Power',

    // Offensive Stats
    Accuracy = 'Accuracy',
    OffHandAccuracy = 'Off-Hand Accuracy',
    MeleeAccuracy = 'Melee Accuracy',
    RangedAccuracy = 'Ranged Accuracy',

    Damage = 'Damage',
    DamagePercent = '% Damage',

    CriticalChance = 'Critical Chance',
    CriticalDamage = 'Critical Damage',

    ArmourPenetration = 'Armour Penetration',
    DodgeReduction = 'Dodge Reduction',

    // Spell
    SpellAccuracy = 'Spell Accuracy',
    SpellPower = 'Spell Power',
    SpellPowerPercent = '% Spell Power',

    // Mana
    ManaCost = 'Mana Cost',
    StartingMana = 'Starting Mana',
    ManaRegen = 'Mana Regen',
    ManaOnHit = 'Mana On Hit',

    // Initiative
    Initiative = 'Initiative',

    // Potion
    PotionCharges = 'Potion Charges',
    PotionHealing = 'Potion Healing',
    PotionEffectiveness = 'Potion Effectiveness'
}

export default StatType;