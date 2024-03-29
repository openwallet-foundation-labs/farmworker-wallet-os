import type { ValidationOptions } from 'class-validator';
/**
 * Checks if a given value is a real string.
 */
declare function IsStringOrVerificationMethod(validationOptions?: ValidationOptions): PropertyDecorator;
/**
 * Decorator that transforms authentication json to corresponding class instances
 *
 * @example
 * class Example {
 *   VerificationMethodTransformer()
 *   private authentication: VerificationMethod
 * }
 */
declare function VerificationMethodTransformer(): PropertyDecorator;
export { IsStringOrVerificationMethod, VerificationMethodTransformer };
