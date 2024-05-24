import { ConstraintsV1, ConstraintsV2, FieldV1, FieldV2, HolderSubject } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class ConstraintsVB extends ValidationBundler<FieldV1 | FieldV2 | HolderSubject | ConstraintsV1 | ConstraintsV2> {
    private readonly disclosureLimitShouldHaveKnownValueMsg;
    private readonly statusShouldHaveKnownValueMsg;
    private readonly statusDirectiveShouldHaveKnownValueMsg;
    private readonly subjectIsIssuerShouldBeKnownValueMsg;
    private readonly fieldIdIsMandatoryMsg;
    private readonly fieldIdMustBeArrayOfStringsMsg;
    private readonly fieldIdMustCorrespondToFieldIdMsg;
    private readonly directivePropertyIsMandatoryMsg;
    private readonly oneOfTheKnownDirectivePropertiesMandatoryMsg;
    constructor(parentTag: string);
    getValidations(constraints: ConstraintsV1 | ConstraintsV2): (Validation<ConstraintsV1> | Validation<ConstraintsV2> | Validation<FieldV1> | Validation<FieldV2> | Validation<HolderSubject>)[];
    private getFieldsValidations;
    private static disclosureLimitShouldHaveKnownValue;
    private static statusShouldHaveKnownValue;
    private static statusDirectiveShouldHaveKnownValue;
    private static pdStatusShouldBeKnown;
    private static shouldBeKnownOption;
    getSubjectsValidations(holderSubjects?: HolderSubject[]): Validation<HolderSubject>[];
    protected getMyTag(srInd: number): string;
    fieldIdInSubjectMustCorrespondToFieldId(constraints: ConstraintsV1 | ConstraintsV2, subjects?: HolderSubject[]): boolean;
    private static isValidFieldId;
}
