import { Rules } from './rules';
export interface SubmissionRequirement {
    name?: string;
    purpose?: string;
    rule: Rules;
    count?: number;
    min?: number;
    max?: number;
    from?: string;
    from_nested?: Array<SubmissionRequirement>;
}
export declare namespace SubmissionRequirement {
}
