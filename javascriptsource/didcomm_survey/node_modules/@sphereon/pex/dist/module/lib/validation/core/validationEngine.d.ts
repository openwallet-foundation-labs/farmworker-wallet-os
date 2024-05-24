import { ValidationBundler } from '../bundlers';
import { Validated } from './index';
export interface Validator<T> {
    bundler: ValidationBundler<T>;
    target: T;
}
export declare class ValidationEngine<T> {
    validate(validators: Validator<T>[]): Validated;
}
