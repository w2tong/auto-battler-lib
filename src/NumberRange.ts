interface NumberRange {
    min: number;
    max: number;
    bonus: number;
}

function numberRoll({ min, max, bonus }: NumberRange): number {
    return min + Math.floor(Math.random() * (max - min + 1)) + bonus;
}

export default NumberRange;
export { numberRoll };