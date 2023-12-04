import type { ValidationOptions } from 'class-validator';
export declare function MetadataTransformer(): PropertyDecorator;
/**
 * Decorator that transforms to and from a date instance.
 */
export declare function DateTransformer(): PropertyDecorator;
export declare function DateParser(value: string): Date;
/**
 * Checks if a given value is a Map
 */
export declare function IsMap(validationOptions?: ValidationOptions): PropertyDecorator;
/**
 * Checks if a given value is a string or string array.
 */
export declare function IsStringOrStringArray(validationOptions?: Omit<ValidationOptions, 'each'>): PropertyDecorator;
