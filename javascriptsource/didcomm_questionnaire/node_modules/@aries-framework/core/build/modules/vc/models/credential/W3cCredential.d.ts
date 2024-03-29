import type { W3cCredentialSubjectOptions } from './W3cCredentialSubject';
import type { W3cIssuerOptions } from './W3cIssuer';
import type { JsonObject } from '../../../../types';
import type { ValidationOptions } from 'class-validator';
import { SingleOrArray } from '../../../../utils/type';
import { W3cCredentialSchema } from './W3cCredentialSchema';
import { W3cCredentialStatus } from './W3cCredentialStatus';
import { W3cCredentialSubject } from './W3cCredentialSubject';
import { W3cIssuer } from './W3cIssuer';
export interface W3cCredentialOptions {
    context?: Array<string | JsonObject>;
    id?: string;
    type: Array<string>;
    issuer: string | W3cIssuerOptions;
    issuanceDate: string;
    expirationDate?: string;
    credentialSubject: SingleOrArray<W3cCredentialSubjectOptions>;
    credentialStatus?: W3cCredentialStatus;
}
export declare class W3cCredential {
    constructor(options: W3cCredentialOptions);
    context: Array<string | JsonObject>;
    id?: string;
    type: Array<string>;
    issuer: string | W3cIssuer;
    issuanceDate: string;
    expirationDate?: string;
    credentialSubject: SingleOrArray<W3cCredentialSubject>;
    credentialSchema?: SingleOrArray<W3cCredentialSchema>;
    credentialStatus?: W3cCredentialStatus;
    get issuerId(): string;
    get credentialSchemaIds(): string[];
    get credentialSubjectIds(): string[];
    get contexts(): Array<string | JsonObject>;
    static fromJson(json: Record<string, unknown>): W3cCredential;
}
export declare function IsCredentialType(validationOptions?: ValidationOptions): PropertyDecorator;
