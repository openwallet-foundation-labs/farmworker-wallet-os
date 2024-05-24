import type { W3cHolderOptions } from './W3cHolder';
import type { W3cJsonPresentation } from './W3cJsonPresentation';
import type { JsonObject } from '../../../../types';
import type { W3cVerifiableCredential } from '../credential/W3cVerifiableCredential';
import type { ValidationOptions } from 'class-validator';
import { SingleOrArray } from '../../../../utils/type';
import { W3cHolder } from './W3cHolder';
export interface W3cPresentationOptions {
    id?: string;
    context?: Array<string | JsonObject>;
    type?: Array<string>;
    verifiableCredential: SingleOrArray<W3cVerifiableCredential>;
    holder?: string | W3cHolderOptions;
}
export declare class W3cPresentation {
    constructor(options: W3cPresentationOptions);
    context: Array<string | JsonObject>;
    id?: string;
    type: Array<string>;
    holder?: string | W3cHolder;
    verifiableCredential: SingleOrArray<W3cVerifiableCredential>;
    get holderId(): string | null;
    toJSON(): W3cJsonPresentation;
}
export declare function IsVerifiablePresentationType(validationOptions?: ValidationOptions): PropertyDecorator;
