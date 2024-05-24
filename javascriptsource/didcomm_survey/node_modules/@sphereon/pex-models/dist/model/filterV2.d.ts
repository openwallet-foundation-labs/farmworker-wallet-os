import { OneOfNumberString } from './oneOfNumberString';
import { OneOfNumberStringBoolean } from './oneOfNumberStringBoolean';
import { FilterV2Base } from './filterV2Base';
import { FilterV2BaseItems } from './filterV2BaseItems';
export interface FilterV2 {
    const?: OneOfNumberStringBoolean;
    enum?: Array<OneOfNumberStringBoolean>;
    exclusiveMinimum?: OneOfNumberString;
    exclusiveMaximum?: OneOfNumberString;
    format?: string;
    formatMaximum?: string;
    formatMinimum?: string;
    formatExclusiveMaximum?: string;
    formatExclusiveMinimum?: string;
    minLength?: number;
    maxLength?: number;
    minimum?: OneOfNumberString;
    maximum?: OneOfNumberString;
    not?: object;
    pattern?: string;
    type: string;
    contains?: FilterV2Base;
    items?: FilterV2BaseItems;
}
