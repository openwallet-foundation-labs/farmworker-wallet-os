import { Status } from '../../ConstraintUtils';
import { Validated } from './validated';
export type ValidationPredicate<T> = (t: T) => boolean;
export interface Validation<T> {
    tag: string;
    target: T;
    predicate: ValidationPredicate<T>;
    message: string;
    status?: Status;
}
export type ValidateAll = <T>(validations: Validation<T>[]) => Validated;
export declare const validate: ValidateAll;
