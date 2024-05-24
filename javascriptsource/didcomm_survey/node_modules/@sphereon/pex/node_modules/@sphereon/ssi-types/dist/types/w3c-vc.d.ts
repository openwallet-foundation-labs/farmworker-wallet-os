import { PresentationSubmission } from './pex';
import { IProofPurpose, IProofType } from './did';
import { OriginalType, WrappedVerifiableCredential, WrappedVerifiablePresentation } from './vc';
export type AdditionalClaims = Record<string, any>;
export type IIssuerId = string;
export interface ICredential {
    '@context': ICredentialContextType | ICredentialContextType[];
    type: string[];
    credentialSchema?: undefined | ICredentialSchemaType | ICredentialSchemaType[];
    issuer: IIssuerId | IIssuer;
    issuanceDate: string;
    credentialSubject: (ICredentialSubject & AdditionalClaims) | (ICredentialSubject & AdditionalClaims)[];
    expirationDate?: string;
    id?: string;
    credentialStatus?: ICredentialStatus;
    description?: string;
    name?: string;
    [x: string]: any;
}
export interface ICredentialSubject {
    id?: string;
}
export type ICredentialContextType = (ICredentialContext & AdditionalClaims) | string;
export interface ICredentialContext {
    name?: string;
    did?: string;
}
export type ICredentialSchemaType = ICredentialSchema | string;
export interface ICredentialSchema {
    id: string;
    type?: string;
}
export interface IProof {
    type: IProofType | string;
    created: string;
    proofPurpose: IProofPurpose | string;
    verificationMethod: string;
    challenge?: string;
    domain?: string;
    proofValue?: string;
    jws?: string;
    jwt?: string;
    nonce?: string;
    requiredRevealStatements?: string[];
    [x: string]: any;
}
export interface ICredentialStatus {
    id: string;
    type: string;
}
export interface IIssuer {
    id: string;
    [x: string]: any;
}
export interface IHasProof {
    proof: IProof | IProof[];
}
export type IVerifiableCredential = ICredential & IHasProof;
/**
 * Represents a Json Web Token in compact form.
 */
export type CompactJWT = string;
/**
 * Represents a signed Verifiable Credential (includes proof), in either JSON, compact JWT or compact SD-JWT VC format.
 * See {@link https://www.w3.org/TR/vc-data-model/#credentials | VC data model}
 * See {@link https://www.w3.org/TR/vc-data-model/#proof-formats | proof formats}
 */
export type W3CVerifiableCredential = IVerifiableCredential | CompactJWT;
export interface IPresentation {
    id?: string;
    '@context': ICredentialContextType | ICredentialContextType[];
    type?: string | string[];
    verifiableCredential?: W3CVerifiableCredential[];
    presentation_submission?: PresentationSubmission;
    holder?: string;
    verifier?: string;
    [x: string]: any;
}
export type IVerifiablePresentation = IPresentation & IHasProof;
/**
 * Represents a signed Verifiable Presentation (includes proof), in either JSON or compact JWT format.
 * See {@link https://www.w3.org/TR/vc-data-model/#presentations | VC data model}
 * See {@link https://www.w3.org/TR/vc-data-model/#proof-formats | proof formats}
 */
export type W3CVerifiablePresentation = IVerifiablePresentation | CompactJWT;
export interface WrappedW3CVerifiableCredential {
    /**
     * Original VC that we've received
     */
    original: W3CVerifiableCredential | JwtDecodedVerifiableCredential;
    /**
     * In case of JWT credential it will be the decoded version. In other cases it will be the same as original one
     */
    decoded: JwtDecodedVerifiableCredential | IVerifiableCredential;
    /**
     * Type of this credential. Supported types are json-ld, jwt (decoded/encoded)
     */
    type: OriginalType.JSONLD | OriginalType.JWT_ENCODED | OriginalType.JWT_DECODED;
    /**
     * The claim format, typically used during exchange transport protocols
     */
    format: 'jwt_vc' | 'ldp_vc' | 'ldp' | 'jwt';
    /**
     * Internal stable representation of a Credential
     */
    credential: IVerifiableCredential;
}
export interface WrappedW3CVerifiablePresentation {
    /**
     * Original VP that we've received
     */
    original: W3CVerifiablePresentation | JwtDecodedVerifiablePresentation;
    /**
     * In case of JWT VP it will be the decoded version. In other cases it will be the same as original one
     */
    decoded: JwtDecodedVerifiablePresentation | IVerifiablePresentation;
    /**
     * Type of this Presentation. Supported types are json-ld and jwt (decoded/encoded) and sd-jwt-vc (decoded/encoded)
     */
    type: OriginalType.JSONLD | OriginalType.JWT_ENCODED | OriginalType.JWT_DECODED;
    /**
     * The claim format, typically used during exchange transport protocols
     */
    format: 'jwt_vp' | 'ldp_vp';
    /**
     * Internal stable representation of a Presentation without proofs, created based on https://www.w3.org/TR/vc-data-model/#jwt-decoding
     */
    presentation: UniformVerifiablePresentation;
    /**
     * Wrapped Verifiable Credentials belonging to the Presentation
     */
    vcs: WrappedW3CVerifiableCredential[];
}
export interface UniformVerifiablePresentation {
    '@context': ICredentialContextType | ICredentialContextType[];
    type: string | string[];
    verifiableCredential: WrappedW3CVerifiableCredential[];
    presentation_submission?: PresentationSubmission;
    holder?: string;
}
export interface JwtDecodedVerifiableCredential {
    vc: IVerifiableCredential;
    exp: string;
    iss: string;
    nbf: string;
    sub: string;
    jti: string;
    [x: string]: any;
}
export interface JwtDecodedVerifiablePresentation {
    vp: IVerifiablePresentation;
    exp: string;
    iss: string;
    nbf: string;
    sub: string;
    jti: string;
    aud: string;
    iat: string;
    [x: string]: any;
}
export declare const JWT_PROOF_TYPE_2020 = "JwtProof2020";
export interface IVerifyStatusResult {
    verified: boolean;
    /**
     * Optional Error object for the
     * but currently the machine readable errors are not exported from DID-JWT package to be imported here
     */
    error?: IError | undefined;
    /**
     * Other options can be specified for verification.
     * They will be forwarded to the lower level modules. that performt the checks
     */
    [x: string]: any;
}
export interface IVerifyResult {
    /**
     * This value is used to transmit the global result of verification.
     */
    verified: boolean;
    results?: [
        {
            credential?: ICredential;
            presentation?: IPresentation;
            verified: boolean;
            error?: IError;
            log: [{
                id: string;
                valid: boolean;
            }];
        }
    ];
    statusResult?: IVerifyStatusResult;
    /**
     * Optional Error object for the
     * but currently the machine readable errors are not exported from DID-JWT package to be imported here
     */
    error?: IError | undefined;
    /**
     * Other options can be specified for verification.
     * They will be forwarded to the lower level modules. that performt the checks
     */
    [x: string]: any;
}
/**
 * An error object, which can contain a code.
 * @beta
 */
export interface IError {
    name?: string;
    errors?: IError[];
    /**
     * The details of the error being thrown or forwarded
     */
    message?: string;
    /**
     * The stack of the error
     */
    stack?: string | string[];
    details?: IErrorDetails;
    /**
     * The code for the error being throw
     */
    errorCode?: string;
}
export interface IErrorDetails {
    code?: string;
    url?: string;
    cause?: IError;
}
export declare enum StatusListType {
    StatusList2021 = "StatusList2021"
}
export type StatusPurpose2021 = 'revocation' | 'suspension' | string;
export declare enum StatusListCredentialIdMode {
    ISSUANCE = "ISSUANCE",
    PERSISTENCE = "PERSISTENCE",
    NEVER = "NEVER"
}
export type StatusListIndexingDirection = 'rightToLeft';
export declare enum StatusListDriverType {
    AGENT_TYPEORM = "agent_typeorm",
    AGENT_KV_STORE = "agent_kv_store",
    GITHUB = "github",
    AGENT_FILESYSTEM = "agent_filesystem"
}
export declare function isWrappedW3CVerifiableCredential(vc: WrappedVerifiableCredential): vc is WrappedW3CVerifiableCredential;
export declare function isWrappedW3CVerifiablePresentation(vp: WrappedVerifiablePresentation): vp is WrappedW3CVerifiablePresentation;
//# sourceMappingURL=w3c-vc.d.ts.map