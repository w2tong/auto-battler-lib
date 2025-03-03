interface DamageRange {
    min: number;
    max: number;
    bonus: number;
}

function damageRoll({min, max, bonus}: DamageRange): number {
    return min + Math.floor(Math.random() * (max - min + 1)) + bonus;
}

export default DamageRange;
export { damageRoll };