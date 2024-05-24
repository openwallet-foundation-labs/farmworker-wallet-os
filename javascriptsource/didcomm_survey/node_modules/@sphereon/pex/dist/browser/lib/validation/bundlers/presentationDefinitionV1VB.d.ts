import { ConstraintsV1, FieldV1, HolderSubject, InputDescriptorV1, PresentationDefinitionV1, SubmissionRequirement } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class PresentationDefinitionV1VB extends ValidationBundler<FieldV1 | HolderSubject | ConstraintsV1 | InputDescriptorV1 | PresentationDefinitionV1 | SubmissionRequirement> {
    constructor(parentTag: string);
    getValidations(pd: PresentationDefinitionV1): (Validation<FieldV1> | Validation<HolderSubject> | Validation<ConstraintsV1> | Validation<InputDescriptorV1> | Validation<InputDescriptorV1[]> | Validation<PresentationDefinitionV1> | Validation<SubmissionRequirement>)[];
    private myValidations;
    private static optionalNonEmptyString;
    private static nonEmptyString;
    private static formatValuesShouldNotBeEmpty;
    private static formatValuesShouldBeAmongKnownValues;
    private static isJWTAlgoKnown;
    private static isLDPProofKnown;
    private static groupShouldMatchSubmissionRequirements;
    private static flatten;
    private shouldBeAsPerJsonSchema;
    private static shouldNotHaveFrameProperty;
}
