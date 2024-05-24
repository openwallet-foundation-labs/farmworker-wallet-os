import type { ValidationError } from 'class-validator';
import { CredoError } from './CredoError';
export declare class ClassValidationError extends CredoError {
    validationErrors: ValidationError[];
    validationErrorsToString(): string;
    constructor(message: string, { classType, cause, validationErrors }: {
        classType: string;
        cause?: Error;
        validationErrors?: ValidationError[];
    });
}
