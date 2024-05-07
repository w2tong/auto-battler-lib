import { Equipment } from '../../Equipment/Equipment';
import { ItemAttributes } from '../../Equipment/Item';
import AttributeType from './AttributeType';

interface Attribute {
    base: number;
    bonus: number;
}

function calcTotalAttribute(attribute: Attribute) {
    return attribute.base + attribute.bonus;
}

const StartingAttributePoints = 10;
const AttributePointsPerLevel = 2;

type BaseAttributes = {[attr in AttributeType]?: number}

class Attributes {
    [AttributeType.WeaponSkill]: Attribute;
    [AttributeType.Strength]: Attribute;
    [AttributeType.Dexterity]: Attribute;
    [AttributeType.Perception]: Attribute;
    [AttributeType.Constitution]: Attribute;
    [AttributeType.Intelligence]: Attribute;
    [AttributeType.Wisdom]: Attribute;

    constructor(
        {
            [AttributeType.WeaponSkill]: weaponSkill = 0,
            [AttributeType.Strength]: strength = 0,
            [AttributeType.Dexterity]: dexterity = 0,
            [AttributeType.Perception]: perception = 0,
            [AttributeType.Constitution]: constitution = 0,
            [AttributeType.Intelligence]: intelligence = 0,
            [AttributeType.Wisdom]: wisdom = 0,
        }: BaseAttributes,
        equipment: Equipment
    ) {
        this[AttributeType.WeaponSkill] = { base: weaponSkill, bonus: 0 };
        this[AttributeType.Strength] = { base: strength, bonus: 0 };
        this[AttributeType.Dexterity] = { base: dexterity, bonus: 0 };
        this[AttributeType.Perception] = { base: perception, bonus: 0 };
        this[AttributeType.Constitution] = { base: constitution, bonus: 0 };
        this[AttributeType.Intelligence] = { base: intelligence, bonus: 0 };
        this[AttributeType.Wisdom] = { base: wisdom, bonus: 0 };

        if (equipment.armour) this.addItemAttributes(equipment.armour.attributes);
        if (equipment.belt) this.addItemAttributes(equipment.belt.attributes);
        if (equipment.hands) this.addItemAttributes(equipment.hands.attributes);
        if (equipment.head) this.addItemAttributes(equipment.head.attributes);
        if (equipment.ring1) this.addItemAttributes(equipment.ring1.attributes);
        if (equipment.ring2) this.addItemAttributes(equipment.ring2.attributes);
        if (equipment.mainHand) this.addItemAttributes(equipment.mainHand.attributes);
        if (equipment.offHandWeapon) this.addItemAttributes(equipment.offHandWeapon.attributes);
        else if (equipment.offHandShield) this.addItemAttributes(equipment.offHandShield.attributes);
    }

    get weaponSkill() {
        return calcTotalAttribute(this[AttributeType.WeaponSkill]);
    }
    get strength() {
        return calcTotalAttribute(this[AttributeType.Strength]);
    }
    get dexterity() {
        return calcTotalAttribute(this[AttributeType.Dexterity]);
    }
    get perception() {
        return calcTotalAttribute(this[AttributeType.Perception]);
    }
    get constitution() {
        return calcTotalAttribute(this[AttributeType.Constitution]);
    }
    get intelligence() {
        return calcTotalAttribute(this[AttributeType.Intelligence]);
    }
    get wisdom() {
        return calcTotalAttribute(this[AttributeType.Wisdom]);
    }

    addItemAttributes(itemAttributes?: ItemAttributes) {
        if (!itemAttributes) return;
        for (const [type, val] of Object.entries(itemAttributes)) {
            this[type as AttributeType].bonus += val;
        }
    }

    addBonus(type: AttributeType, num: number) {
        this[type].bonus += num;
    }
}

export { Attribute, AttributeType, BaseAttributes, Attributes, StartingAttributePoints, AttributePointsPerLevel };