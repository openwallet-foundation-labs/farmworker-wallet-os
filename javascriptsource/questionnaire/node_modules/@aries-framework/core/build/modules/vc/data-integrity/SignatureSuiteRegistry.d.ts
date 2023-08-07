import type { KeyType } from '../../../crypto';
declare const LinkedDataSignature: any;
export declare const SignatureSuiteToken: unique symbol;
export interface SuiteInfo {
    suiteClass: typeof LinkedDataSignature;
    proofType: string;
    verificationMethodTypes: string[];
    keyTypes: KeyType[];
}
export declare class SignatureSuiteRegistry {
    private suiteMapping;
    constructor(suites: SuiteInfo[]);
    get supportedProofTypes(): string[];
    getByVerificationMethodType(verificationMethodType: string): SuiteInfo | undefined;
    getByKeyType(keyType: KeyType): SuiteInfo | undefined;
    getByProofType(proofType: string): SuiteInfo;
    getVerificationMethodTypesByProofType(proofType: string): string[];
}
export {};
