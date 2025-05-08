import { Equipment } from '../../Equipment/Equipment';
import { ItemAttributes } from '../../Equipment/Item';
import Attribute from './Attribute';
import AttributeType from './AttributeType';
import BaseAttributes from './BaseAttributes';

function calcTotalAttribute(attribute: Attribute) {
    return attribute.base + attribute.bonus;
}

class Attributes {
    static DEFAULT_VALUE = 10;
    static MIN_VALUE = 5;

    private [AttributeType.Strength]: Attribute;
    private [AttributeType.Dexterity]: Attribute;
    private [AttributeType.Perception]: Attribute;
    private [AttributeType.Constitution]: Attribute;
    private [AttributeType.Intelligence]: Attribute;
    private [AttributeType.Wisdom]: Attribute;

    constructor(
        {
            [AttributeType.Strength]: strength = Attributes.DEFAULT_VALUE,
            [AttributeType.Dexterity]: dexterity = Attributes.DEFAULT_VALUE,
            [AttributeType.Perception]: perception = Attributes.DEFAULT_VALUE,
            [AttributeType.Constitution]: constitution = Attributes.DEFAULT_VALUE,
            [AttributeType.Intelligence]: intelligence = Attributes.DEFAULT_VALUE,
            [AttributeType.Wisdom]: wisdom = Attributes.DEFAULT_VALUE,
        }: BaseAttributes,
        equipment: Equipment
    ) {
        this[AttributeType.Strength] = { base: strength, bonus: 0 };
        this[AttributeType.Dexterity] = { base: dexterity, bonus: 0 };
        this[AttributeType.Perception] = { base: perception, bonus: 0 };
        this[AttributeType.Constitution] = { base: constitution, bonus: 0 };
        this[AttributeType.Intelligence] = { base: intelligence, bonus: 0 };
        this[AttributeType.Wisdom] = { base: wisdom, bonus: 0 };

        if (equipment.armour) this.addItemAttributes(equipment.armour.attributes);
        if (equipment.waist) this.addItemAttributes(equipment.waist.attributes);
        if (equipment.hands) this.addItemAttributes(equipment.hands.attributes);
        if (equipment.head) this.addItemAttributes(equipment.head.attributes);
        if (equipment.ring1) this.addItemAttributes(equipment.ring1.attributes);
        if (equipment.ring2) this.addItemAttributes(equipment.ring2.attributes);
        if (equipment.mainHand) this.addItemAttributes(equipment.mainHand.attributes);
        if (equipment.offHandWeapon) this.addItemAttributes(equipment.offHandWeapon.attributes);
        else if (equipment.offHandShield) this.addItemAttributes(equipment.offHandShield.attributes);
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

export default Attributes;