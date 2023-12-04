import type { ValidationOptions } from 'class-validator';
/**
 * TODO: check how to support arbitrary data in class
 */
export interface W3cHolderOptions {
    id: string;
}
export declare class W3cHolder {
    constructor(options: W3cHolderOptions);
    id: string;
}
export declare function W3cHolderTransformer(): PropertyDecorator;
export declare function IsW3cHolder(validationOptions?: ValidationOptions): PropertyDecorator;
