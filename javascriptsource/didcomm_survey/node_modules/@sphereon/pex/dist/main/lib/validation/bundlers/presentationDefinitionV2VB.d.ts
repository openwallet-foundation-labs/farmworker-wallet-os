import { ConstraintsV2, FieldV2, HolderSubject, InputDescriptorV2, PresentationDefinitionV2, SubmissionRequirement } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class PresentationDefinitionV2VB extends ValidationBundler<FieldV2 | HolderSubject | ConstraintsV2 | InputDescriptorV2 | PresentationDefinitionV2 | SubmissionRequirement> {
    constructor(parentTag: string);
    getValidations(pd: PresentationDefinitionV2): (Validation<FieldV2> | Validation<HolderSubject> | Validation<ConstraintsV2> | Validation<InputDescriptorV2> | Validation<InputDescriptorV2[]> | Validation<PresentationDefinitionV2> | Validation<SubmissionRequirement> | Validation<unknown>)[];
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
}
