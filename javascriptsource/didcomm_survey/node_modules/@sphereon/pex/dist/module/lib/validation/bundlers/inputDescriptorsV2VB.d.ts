import { ConstraintsV2, FieldV2, HolderSubject, InputDescriptorV2 } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class InputDescriptorsV2VB extends ValidationBundler<InputDescriptorV2[]> {
    private readonly idMustBeNonEmptyStringMsg;
    private readonly nameShouldBeNonEmptyStringMsg;
    private readonly purposeShouldBeNonEmptyStringMsg;
    constructor(parentTag: string);
    getValidations(inputDescriptors: InputDescriptorV2[]): (Validation<InputDescriptorV2> | Validation<InputDescriptorV2[]> | Validation<ConstraintsV2> | Validation<FieldV2> | Validation<HolderSubject>)[];
    private getValidationFor;
    private shouldHaveUniqueFieldsIds;
    private shouldHaveUniqueIds;
    protected getMyTag(srInd: number): string;
    constraintsValidations(inputDescriptor: InputDescriptorV2, inDescInd: number): (Validation<ConstraintsV2> | Validation<FieldV2> | Validation<HolderSubject>)[];
    private shouldNotHaveSchema;
}
