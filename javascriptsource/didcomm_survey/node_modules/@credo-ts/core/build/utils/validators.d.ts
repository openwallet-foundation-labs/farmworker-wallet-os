import type { Constructor } from './mixins';
import type { SingleOrArray } from './type';
import type { ValidationOptions } from 'class-validator';
export interface IsInstanceOrArrayOfInstancesValidationOptions extends ValidationOptions {
    classType: SingleOrArray<new (...args: any[]) => any>;
    /**
     * Whether to allow empty arrays to pass validation
     * @default false
     */
    allowEmptyArray?: boolean;
}
/**
 * Checks if the value is a string or the specified instance
 */
export declare function IsStringOrInstance(targetType: Constructor, validationOptions?: ValidationOptions): PropertyDecorator;
export declare function IsInstanceOrArrayOfInstances(validationOptions: IsInstanceOrArrayOfInstancesValidationOptions): PropertyDecorator;
export declare function isStringArray(value: any): value is string[];
export declare const UriValidator: RegExp;
export declare function isUri(value: string): boolean;
export declare function IsUri(validationOptions?: ValidationOptions): PropertyDecorator;
