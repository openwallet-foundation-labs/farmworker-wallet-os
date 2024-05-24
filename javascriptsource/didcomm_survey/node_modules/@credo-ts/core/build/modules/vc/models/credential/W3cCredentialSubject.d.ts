import type { ValidationOptions } from 'class-validator';
/**
 * @see https://www.w3.org/TR/vc-data-model/#credential-subject
 */
export interface W3cCredentialSubjectOptions {
    id?: string;
    claims?: Record<string, unknown>;
}
export declare class W3cCredentialSubject {
    constructor(options: W3cCredentialSubjectOptions);
    id?: string;
    claims?: Record<string, unknown>;
}
export declare function W3cCredentialSubjectTransformer(): PropertyDecorator;
export declare function IsW3cCredentialSubject(validationOptions?: ValidationOptions): PropertyDecorator;
