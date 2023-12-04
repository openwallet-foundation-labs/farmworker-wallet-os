import type { ValidationOptions } from 'class-validator';
/**
 * TODO: check how to support arbitrary data in class
 * @see https://www.w3.org/TR/vc-data-model/#credential-subject
 */
export interface W3cIssuerOptions {
    id: string;
}
export declare class W3cIssuer {
    constructor(options: W3cIssuerOptions);
    id: string;
}
export declare function W3cIssuerTransformer(): PropertyDecorator;
export declare function IsW3cIssuer(validationOptions?: ValidationOptions): PropertyDecorator;
