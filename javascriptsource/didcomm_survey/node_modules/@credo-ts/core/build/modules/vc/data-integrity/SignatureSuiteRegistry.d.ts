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
    constructor(suites: Array<SuiteInfo | 'default'>);
    get supportedProofTypes(): string[];
    /**
     * @deprecated recommended to always search by key type instead as that will have broader support
     */
    getByVerificationMethodType(verificationMethodType: string): SuiteInfo | undefined;
    getAllByKeyType(keyType: KeyType): SuiteInfo[];
    getByProofType(proofType: string): SuiteInfo;
    getVerificationMethodTypesByProofType(proofType: string): string[];
}
export {};
