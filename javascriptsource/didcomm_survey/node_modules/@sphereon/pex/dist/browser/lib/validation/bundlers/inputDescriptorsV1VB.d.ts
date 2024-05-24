import { ConstraintsV1, FieldV1, HolderSubject, InputDescriptorV1 } from '@sphereon/pex-models';
import { Validation, ValidationPredicate } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class InputDescriptorsV1VB extends ValidationBundler<InputDescriptorV1[]> {
    private readonly idMustBeNonEmptyStringMsg;
    private readonly nameShouldBeNonEmptyStringMsg;
    private readonly purposeShouldBeNonEmptyStringMsg;
    private readonly shouldHaveValidSchemaURIMsg;
    constructor(parentTag: string);
    getValidations(inputDescriptors: InputDescriptorV1[]): (Validation<InputDescriptorV1> | Validation<InputDescriptorV1[]> | Validation<ConstraintsV1> | Validation<FieldV1> | Validation<HolderSubject>)[];
    private getValidationFor;
    private shouldHaveUniqueFieldsIds;
    private shouldHaveUniqueIds;
    protected getMyTag(srInd: number): string;
    isValidSchema(): ValidationPredicate<InputDescriptorV1>;
    isAValidURI(uri: string): boolean;
    constraintsValidations(inputDescriptor: InputDescriptorV1, inDescInd: number): (Validation<ConstraintsV1> | Validation<FieldV1> | Validation<HolderSubject>)[];
}
