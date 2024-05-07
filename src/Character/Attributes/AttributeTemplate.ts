import { AttributeType } from './Attributes';

type AttributeTemplate = {[attr in AttributeType]?: {base: number, perLvl?: number}};

export default AttributeTemplate;