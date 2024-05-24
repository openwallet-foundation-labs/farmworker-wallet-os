import { PresentationSubmission } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class PresentationSubmissionVB extends ValidationBundler<PresentationSubmission> {
    constructor(parentTag: string);
    getValidations(ps: PresentationSubmission): Validation<PresentationSubmission>[];
    private static nonEmptyString;
    private static descriptorMapMustBePresent;
    private static idMustBeSameForEachLevelOfNesting;
    private static isIdSameForEachLevelOfNesting;
    private static formatsShouldBeKnown;
    private static formatShouldBeKnown;
    private static pathsShouldBeValidJsonPaths;
    private static pathShouldBeValid;
}
