import { FieldV1, FieldV2 } from '@sphereon/pex-models';
import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class FieldsVB extends ValidationBundler<FieldV1[] | FieldV2[]> {
    private readonly mustHaveValidJsonPathsMsg;
    private readonly pathObjMustHaveValidJsonPathMsg;
    private readonly filterMustBeValidJsonSchemaMsg;
    private readonly filterIsMustInPresenceOfPredicateMsg;
    private readonly filterIsNotValidJsonSchemaDescriptorMsg;
    private readonly purposeShouldBeANonEmptyStringMsg;
    private readonly shouldBeKnownOptionMsg;
    constructor(parentTag: string);
    getValidations(fields: FieldV1[] | FieldV2[]): Validation<FieldV1 | FieldV2>[];
    getValidationsFor(field: FieldV1 | FieldV2, indx: number): Validation<FieldV1 | FieldV2>[];
    protected getMyTag(srInd: number): string;
    private mustHaveValidJsonPaths;
    private _validateJsonPaths;
    private filterMustBeValidJsonSchema;
    private _validateFilter;
    private filterIsMustInPresenceOfPredicate;
    private static optionalNonEmptyString;
    private static shouldBeKnownOption;
}
