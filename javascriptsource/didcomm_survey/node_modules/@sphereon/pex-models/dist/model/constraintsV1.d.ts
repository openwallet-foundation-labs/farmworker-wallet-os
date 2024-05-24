import { HolderSubject } from './holderSubject';
import { Statuses } from './statuses';
import { FieldV1 } from './fieldV1';
import { Optionality } from './optionality';
export interface ConstraintsV1 {
    limit_disclosure?: Optionality;
    statuses?: Statuses;
    fields?: Array<FieldV1>;
    subject_is_issuer?: Optionality;
    is_holder?: Array<HolderSubject>;
    same_subject?: Array<HolderSubject>;
}
export declare namespace ConstraintsV1 {
}
