import type { DidDocumentService } from './service';
import { DidDocument } from './DidDocument';
import { VerificationMethod } from './verificationMethod';
export declare class DidDocumentBuilder {
    private didDocument;
    constructor(id: string);
    addContext(context: string): this;
    addService(service: DidDocumentService): this;
    addVerificationMethod(verificationMethod: VerificationMethod): this;
    addAuthentication(authentication: string | VerificationMethod): this;
    addAssertionMethod(assertionMethod: string | VerificationMethod): this;
    addCapabilityDelegation(capabilityDelegation: string | VerificationMethod): this;
    addCapabilityInvocation(capabilityInvocation: string | VerificationMethod): this;
    addKeyAgreement(keyAgreement: string | VerificationMethod): this;
    build(): DidDocument;
}
