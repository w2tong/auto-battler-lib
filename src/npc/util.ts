import Attributes from '../Character/Attributes/Attributes';
import type AttributeTemplate from '../Character/Attributes/AttributeTemplate';
import type AttributeType from '../Character/Attributes/AttributeType';
import type BaseAttributes from '../Character/Attributes/BaseAttributes';
import type BaseStats from '../Character/Stats/BaseStats';
import type { StatTemplate } from '../Character/Stats/StatTemplate';
import type StatType from '../Character/Stats/StatType';

function calculateBaseAttributes(template: AttributeTemplate, level: number): BaseAttributes {
    const attributes: BaseAttributes = {};
    for (const [attr, { base, perLvl }] of Object.entries(template))
        attributes[attr as AttributeType] = Math.floor((base ? base : Attributes.DEFAULT_VALUE) + (perLvl ? (perLvl) * (level - 1) : 0));
    return attributes;
}

function calculateBaseStats(template: StatTemplate, level: number): BaseStats {
    const stats: BaseStats = {};
    for (const [stat, { base, perLvl }] of Object.entries(template))
        stats[stat as StatType] = (base ?? 0) + (perLvl ? perLvl * (level - 1) : 0);
    return stats;
}

export { calculateBaseAttributes, calculateBaseStats };