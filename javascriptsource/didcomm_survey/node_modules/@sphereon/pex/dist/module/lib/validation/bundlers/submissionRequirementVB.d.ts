import { SubmissionRequirement } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class SubmissionRequirementVB extends ValidationBundler<SubmissionRequirement> {
    private readonly ruleIsMandatoryMsg;
    private readonly needsOneFromOrFromNestedMsg;
    private readonly fromNestedShouldBeArrayMsg;
    private readonly isCountPositiveIntMsg;
    private readonly isMinPositiveIntMsg;
    private readonly isMaxPositiveIntMsg;
    private readonly ruleShouldBePickOrAllMsg;
    constructor(parentTag: string);
    getValidations(srs: SubmissionRequirement[]): Validation<SubmissionRequirement>[];
    private getMyValidations;
    protected getMyTag(srInd: number): string;
    private getSubValidations;
    private getFromNestedTag;
    isCountPositiveInt(sr: SubmissionRequirement): boolean;
    isMinPositiveInt(sr: SubmissionRequirement): boolean;
    isMaxPositiveInt(sr: SubmissionRequirement): boolean;
    private static ruleIsMandatory;
    private static needsOneFromOrFromNested;
    private static fromNestedShouldBeArray;
    private static ruleShouldBePickOrAll;
}
