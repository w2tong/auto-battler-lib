import type AttributeType from './AttributeType';

type BaseAttributes = { [attr in AttributeType]?: number };

export default BaseAttributes;