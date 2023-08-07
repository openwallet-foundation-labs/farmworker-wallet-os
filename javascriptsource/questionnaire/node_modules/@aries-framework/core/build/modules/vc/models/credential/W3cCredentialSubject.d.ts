/**
 * TODO: check how to support arbitrary data in class
 * @see https://www.w3.org/TR/vc-data-model/#credential-subject
 */
export interface W3cCredentialSubjectOptions {
    id?: string;
}
export declare class W3cCredentialSubject {
    constructor(options: W3cCredentialSubjectOptions);
    id?: string;
}
export declare function W3cCredentialSubjectTransformer(): PropertyDecorator;
