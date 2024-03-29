import type { JsonObject } from '../../../../types';
export interface VC {
    issue(options: any): Promise<Record<string, unknown>>;
    verifyCredential(options: any): Promise<W3cVerifyCredentialResult>;
    createPresentation(options: any): Promise<Record<string, unknown>>;
    signPresentation(options: any): Promise<Record<string, unknown>>;
    verify(options: any): Promise<W3cVerifyPresentationResult>;
}
interface W3cVerificationResult {
    isValid: boolean;
    error?: Error;
    verificationMethod?: JsonObject;
    proof?: JsonObject;
    purposeResult?: JsonObject;
}
export interface W3cVerifyCredentialResult {
    verified: boolean;
    error?: Error;
    results: W3cVerificationResult[];
}
export interface W3cVerifyPresentationResult {
    verified: boolean;
    error?: Error;
    presentationResult: W3cVerificationResult;
    credentialResults: W3cVerifyCredentialResult[];
}
declare const _default: VC;
export default _default;
