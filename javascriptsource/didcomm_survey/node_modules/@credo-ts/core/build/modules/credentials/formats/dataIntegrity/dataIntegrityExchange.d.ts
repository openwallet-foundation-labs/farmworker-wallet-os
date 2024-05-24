import { JsonObject } from '../../../../types';
import { W3cCredential } from '../../../vc';
declare const SUPPORTED_W3C_VC_DATA_MODEL_VERSIONS: readonly ["1.1", "2.0"];
export type W3C_VC_DATA_MODEL_VERSION = (typeof SUPPORTED_W3C_VC_DATA_MODEL_VERSIONS)[number];
export interface AnonCredsLinkSecretBindingMethodOptions {
    credentialDefinitionId: string;
    nonce: string;
    keyCorrectnessProof: Record<string, unknown>;
}
export declare class AnonCredsLinkSecretBindingMethod {
    constructor(options: AnonCredsLinkSecretBindingMethodOptions);
    credentialDefinitionId: string;
    nonce: string;
    keyCorrectnessProof: Record<string, unknown>;
}
export interface DidCommSignedAttachmentBindingMethodOptions {
    algSupported: string[];
    didMethodsSupported: string[];
    nonce: string;
}
export declare class DidCommSignedAttachmentBindingMethod {
    constructor(options: DidCommSignedAttachmentBindingMethodOptions);
    algsSupported: string[];
    didMethodsSupported: string[];
    nonce: string;
}
export interface DataIntegrityBindingMethodsOptions {
    anonCredsLinkSecret?: AnonCredsLinkSecretBindingMethod;
    didcommSignedAttachment?: DidCommSignedAttachmentBindingMethod;
}
export declare class DataIntegrityBindingMethods {
    constructor(options: DataIntegrityBindingMethodsOptions);
    anoncredsLinkSecret?: AnonCredsLinkSecretBindingMethod;
    didcommSignedAttachment?: DidCommSignedAttachmentBindingMethod;
}
export interface DataIntegrityCredentialOfferOptions {
    dataModelVersionsSupported: W3C_VC_DATA_MODEL_VERSION[];
    bindingRequired?: boolean;
    bindingMethod?: DataIntegrityBindingMethods;
    credential: W3cCredential | JsonObject;
}
export declare class DataIntegrityCredentialOffer {
    constructor(options: DataIntegrityCredentialOfferOptions);
    dataModelVersionsSupported: W3C_VC_DATA_MODEL_VERSION[];
    bindingRequired?: boolean;
    bindingMethod?: DataIntegrityBindingMethods;
    credential: JsonObject;
}
export interface AnonCredsLinkSecretDataIntegrityBindingProof {
    cred_def_id: string;
    entropy: string;
    blinded_ms: Record<string, unknown>;
    blinded_ms_correctness_proof: Record<string, unknown>;
    nonce: string;
}
export interface DidCommSignedAttachmentDataIntegrityBindingProof {
    attachment_id: string;
}
export interface DataIntegrityCredentialRequestBindingProof {
    anoncreds_link_secret?: AnonCredsLinkSecretDataIntegrityBindingProof;
    didcomm_signed_attachment?: DidCommSignedAttachmentDataIntegrityBindingProof;
}
export interface DataIntegrityCredentialRequest {
    data_model_version: W3C_VC_DATA_MODEL_VERSION;
    binding_proof?: DataIntegrityCredentialRequestBindingProof;
}
export interface AnonCredsLinkSecretCredentialRequestOptions {
    linkSecretId?: string;
}
export interface DidCommSignedAttachmentCredentialRequestOptions {
    kid: string;
    alg?: string;
}
export interface DataIntegrityCredential {
    credential: JsonObject;
}
export {};
