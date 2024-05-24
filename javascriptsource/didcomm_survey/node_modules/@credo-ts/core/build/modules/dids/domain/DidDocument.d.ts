import type { DidDocumentService } from './service';
import { Key } from '../../../crypto/Key';
import { IndyAgentService, DidCommV1Service } from './service';
import { VerificationMethod } from './verificationMethod';
export type DidPurpose = 'authentication' | 'keyAgreement' | 'assertionMethod' | 'capabilityInvocation' | 'capabilityDelegation';
type DidVerificationMethods = DidPurpose | 'verificationMethod';
interface DidDocumentOptions {
    context?: string | string[];
    id: string;
    alsoKnownAs?: string[];
    controller?: string | string[];
    verificationMethod?: VerificationMethod[];
    service?: DidDocumentService[];
    authentication?: Array<string | VerificationMethod>;
    assertionMethod?: Array<string | VerificationMethod>;
    keyAgreement?: Array<string | VerificationMethod>;
    capabilityInvocation?: Array<string | VerificationMethod>;
    capabilityDelegation?: Array<string | VerificationMethod>;
}
export declare class DidDocument {
    context: string | string[];
    id: string;
    alsoKnownAs?: string[];
    controller?: string | string[];
    verificationMethod?: VerificationMethod[];
    service?: DidDocumentService[];
    authentication?: Array<string | VerificationMethod>;
    assertionMethod?: Array<string | VerificationMethod>;
    keyAgreement?: Array<string | VerificationMethod>;
    capabilityInvocation?: Array<string | VerificationMethod>;
    capabilityDelegation?: Array<string | VerificationMethod>;
    constructor(options: DidDocumentOptions);
    dereferenceVerificationMethod(keyId: string): VerificationMethod;
    dereferenceKey(keyId: string, allowedPurposes?: DidVerificationMethods[]): VerificationMethod;
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType<S extends DidDocumentService = DidDocumentService>(type: string): S[];
    /**
     * Returns all of the service endpoints matching the given class
     *
     * @param classType The class to query services.
     */
    getServicesByClassType<S extends DidDocumentService = DidDocumentService>(classType: new (...args: never[]) => S): S[];
    /**
     * Get all DIDComm services ordered by priority descending. This means the highest
     * priority will be the first entry.
     */
    get didCommServices(): Array<IndyAgentService | DidCommV1Service>;
    get recipientKeys(): Key[];
    toJSON(): Record<string, any>;
}
/**
 * Extracting the verification method for signature type
 * @param type Signature type
 * @param didDocument DidDocument
 * @returns verification method
 */
export declare function findVerificationMethodByKeyType(keyType: string, didDocument: DidDocument): Promise<VerificationMethod | null>;
export {};
