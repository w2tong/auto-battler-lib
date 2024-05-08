import AttributeTemplate from '../Character/Attributes/AttributeTemplate';
import AttributeType from '../Character/Attributes/AttributeType';
import { BaseAttributes } from '../Character/Attributes/Attributes';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import StatType from '../Character/Stats/StatType';
import { BaseStats } from '../Character/Stats/Stats';

function calculateBaseAttributes(template: AttributeTemplate, level: number): BaseAttributes {
    const attributes: BaseAttributes = {};
    for (const [attr, {base, perLvl}] of Object.entries(template))
        attributes[attr as AttributeType] = base + (perLvl ? perLvl * level : 0);
    return attributes;
}

function calculateBaseStats(template: StatTemplate, level: number): BaseStats {
    const stats: BaseStats = {};
    for (const [stat, {base, perLvl}] of Object.entries(template))
        stats[stat as StatType] = base + (perLvl ? perLvl * level : 0);
    return stats;
}

export { calculateBaseAttributes, calculateBaseStats };