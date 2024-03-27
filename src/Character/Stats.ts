interface Stat {
    base: number;
    bonus: number;
}

enum StatType {
    // Defensive
    Health = 'Health',
    Armour = 'Armour',
    Deflection = 'Deflection',
    Dodge = 'Dodge',
    StatusResistance = 'StatusResistance',
    Thorns = 'Thorns',

    // Block
    BlockChance = 'BlockChance',
    BlockPower = 'BlockPower',

    // Critical
    CriticalChance = 'CriticalChance',
    CriticalDamage = 'CriticalDamage',

    // Melee
    MeleeHitChance = 'MeleeHitChance',
    MeleeDamage = 'MeleeDamage',

    // Ranged
    RangedHitChance = 'RangedHitChance',
    RangedDamage = 'RangedDamage',

    // Spell
    SpellPower = 'SpellPower',

    // Mana
    Mana = 'Mana',
    ManaRegen = 'ManaRegen',
    ManaOnHit = 'ManaOnHit',
    ManaCostReduction = 'ManaCostReduction',

    // Initiative
    InitiativeBonus = 'InitiativeBonus',

    // Potion
    PotionCharges = 'PotionCharges',
    PotionHealing = 'PotionHealing',
    PotionEffectiveness = 'PotionEffectiveness'
}

export { Stat, StatType };