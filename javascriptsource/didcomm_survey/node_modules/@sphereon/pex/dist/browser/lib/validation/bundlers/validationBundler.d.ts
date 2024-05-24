import { Status } from '../../ConstraintUtils';
import { Validation } from '../core';
export declare abstract class ValidationBundler<T> {
    parentTag: string;
    myTag: string;
    protected constructor(parentTag: string, myTag: string);
    abstract getValidations(t: T | T[]): Validation<any>[];
    protected getTag(): string;
    protected toChecked(message: string): {
        tag: string;
        status: Status;
        message?: string | undefined;
    };
}
