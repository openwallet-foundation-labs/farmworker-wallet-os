import { FieldV2 } from './fieldV2';
import { HolderSubject } from './holderSubject';
import { Statuses } from './statuses';
import { Optionality } from './optionality';
export interface ConstraintsV2 {
    limit_disclosure?: Optionality;
    statuses?: Statuses;
    fields?: Array<FieldV2>;
    subject_is_issuer?: Optionality;
    is_holder?: Array<HolderSubject>;
    same_subject?: Array<HolderSubject>;
}
export declare namespace ConstraintsV2 {
}
