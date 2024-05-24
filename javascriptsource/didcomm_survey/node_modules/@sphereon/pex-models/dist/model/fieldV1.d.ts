import { Optionality } from './optionality';
import { FilterV1 } from './filterV1';
export interface FieldV1 {
    id?: string;
    path: Array<string>;
    purpose?: string;
    filter?: FilterV1;
    predicate?: Optionality;
}
export declare namespace FieldV1 {
}
