import { Format } from './format';
import { Issuance } from './issuance';
import { ConstraintsV2 } from './constraintsV2';
export interface InputDescriptorV2 {
    id: string;
    name?: string;
    purpose?: string;
    format?: Format;
    group?: Array<string>;
    issuance?: Array<Issuance>;
    constraints: ConstraintsV2;
}
