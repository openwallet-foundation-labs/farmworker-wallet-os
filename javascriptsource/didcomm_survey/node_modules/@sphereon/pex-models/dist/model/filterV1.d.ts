import { OneOfNumberString } from './oneOfNumberString';
import { OneOfNumberStringBoolean } from './oneOfNumberStringBoolean';
export interface FilterV1 {
    const?: OneOfNumberStringBoolean;
    enum?: Array<OneOfNumberStringBoolean>;
    exclusiveMinimum?: OneOfNumberString;
    exclusiveMaximum?: OneOfNumberString;
    format?: string;
    minLength?: number;
    maxLength?: number;
    minimum?: OneOfNumberString;
    maximum?: OneOfNumberString;
    not?: object;
    pattern?: string;
    type: string;
}
