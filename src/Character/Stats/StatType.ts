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
    HitChance = 'Hit Chance',
    OffHandHitChance = 'Off-Hand Hit Chance',
    MeleeHitChance = 'Melee Hit Chance',
    RangedHitChance = 'Ranged Hit Chance',

    Damage = 'Damage',
    OffHandDamage = 'Off-Hand Damage',
    MeleeDamage = 'Melee Damage',
    RangedDamage = 'Ranged Damage',
    DamagePercent = '% Damage',
    MeleeDamagePercent = '% Melee Damage',
    RangedDamagePercent = '% Ranged Damage',

    CriticalChance = 'Critical Chance',
    CriticalDamage = 'Critical Damage',

    ArmourPenetration = 'Armour Penetration',
    DodgeReduction = 'Dodge Reduction',

    // Spell
    SpellHitChance = 'Spell Hit Chance',
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