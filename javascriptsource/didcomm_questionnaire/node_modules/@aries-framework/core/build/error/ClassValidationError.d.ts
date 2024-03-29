import type { ValidationError } from 'class-validator';
import { AriesFrameworkError } from './AriesFrameworkError';
export declare class ClassValidationError extends AriesFrameworkError {
    validationErrors: ValidationError[];
    validationErrorsToString(): string;
    constructor(message: string, { classType, cause, validationErrors }: {
        classType: string;
        cause?: Error;
        validationErrors?: ValidationError[];
    });
}
