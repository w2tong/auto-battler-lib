import AttributeType from './AttributeType';

type AttributeTemplate = { [attr in AttributeType]?: { base?: number, perLvl?: number; } };

export default AttributeTemplate;