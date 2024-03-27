interface Stat {
    base: number;
    bonus: number;
}

enum StatType {
    // Defensive Stats
    Health = 'Health',
    Armour = 'Armour',
    Deflection = 'Deflection',
    Dodge = 'Dodge',
    StatusResistance = 'StatusResistance',
    Thorns = 'Thorns',

    BlockChance = 'BlockChance',
    BlockPower = 'BlockPower',

    // Offensive Stats
    CriticalChance = 'CriticalChance',
    CriticalDamage = 'CriticalDamage',

    MeleeHitChance = 'MeleeHitChance',
    MeleeDamage = 'MeleeDamage',

    RangedHitChance = 'RangedHitChance',
    RangedDamage = 'RangedDamage',

    ArmourPenetration = 'ArmourPenetration',
    DodgeReduction = 'DodgeReduction',

    // Spell
    SpellPower = 'SpellPower',

    // Mana
    Mana = 'Mana',
    ManaRegen = 'ManaRegen',
    ManaOnHit = 'ManaOnHit',
    ManaCostReduction = 'ManaCostReduction',

    // Initiative
    Initiative = 'Initiative',

    // Potion
    PotionCharges = 'PotionCharges',
    PotionHealing = 'PotionHealing',
    PotionEffectiveness = 'PotionEffectiveness'
}

export { Stat, StatType };