import { Issuance } from './issuance';
import { Schema } from './schema';
import { ConstraintsV1 } from './constraintsV1';
export interface InputDescriptorV1 {
    id: string;
    name?: string;
    purpose?: string;
    group?: Array<string>;
    schema: Array<Schema>;
    issuance?: Array<Issuance>;
    constraints?: ConstraintsV1;
}
