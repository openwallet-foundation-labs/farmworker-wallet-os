"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidDocumentBuilder = void 0;
const DidDocument_1 = require("./DidDocument");
const verificationMethod_1 = require("./verificationMethod");
class DidDocumentBuilder {
    constructor(id) {
        this.didDocument = new DidDocument_1.DidDocument({
            id,
        });
    }
    addContext(context) {
        if (typeof this.didDocument.context === 'string') {
            this.didDocument.context = [this.didDocument.context, context];
        }
        else {
            this.didDocument.context.push(context);
        }
        return this;
    }
    addService(service) {
        if (!this.didDocument.service) {
            this.didDocument.service = [];
        }
        this.didDocument.service.push(service);
        return this;
    }
    addVerificationMethod(verificationMethod) {
        if (!this.didDocument.verificationMethod) {
            this.didDocument.verificationMethod = [];
        }
        this.didDocument.verificationMethod.push(verificationMethod instanceof verificationMethod_1.VerificationMethod ? verificationMethod : new verificationMethod_1.VerificationMethod(verificationMethod));
        return this;
    }
    addAuthentication(authentication) {
        if (!this.didDocument.authentication) {
            this.didDocument.authentication = [];
        }
        const verificationMethod = authentication instanceof verificationMethod_1.VerificationMethod || typeof authentication === 'string'
            ? authentication
            : new verificationMethod_1.VerificationMethod(authentication);
        this.didDocument.authentication.push(verificationMethod);
        return this;
    }
    addAssertionMethod(assertionMethod) {
        if (!this.didDocument.assertionMethod) {
            this.didDocument.assertionMethod = [];
        }
        const verificationMethod = assertionMethod instanceof verificationMethod_1.VerificationMethod || typeof assertionMethod === 'string'
            ? assertionMethod
            : new verificationMethod_1.VerificationMethod(assertionMethod);
        this.didDocument.assertionMethod.push(verificationMethod);
        return this;
    }
    addCapabilityDelegation(capabilityDelegation) {
        if (!this.didDocument.capabilityDelegation) {
            this.didDocument.capabilityDelegation = [];
        }
        const verificationMethod = capabilityDelegation instanceof verificationMethod_1.VerificationMethod || typeof capabilityDelegation === 'string'
            ? capabilityDelegation
            : new verificationMethod_1.VerificationMethod(capabilityDelegation);
        this.didDocument.capabilityDelegation.push(verificationMethod);
        return this;
    }
    addCapabilityInvocation(capabilityInvocation) {
        if (!this.didDocument.capabilityInvocation) {
            this.didDocument.capabilityInvocation = [];
        }
        const verificationMethod = capabilityInvocation instanceof verificationMethod_1.VerificationMethod || typeof capabilityInvocation === 'string'
            ? capabilityInvocation
            : new verificationMethod_1.VerificationMethod(capabilityInvocation);
        this.didDocument.capabilityInvocation.push(verificationMethod);
        return this;
    }
    addKeyAgreement(keyAgreement) {
        if (!this.didDocument.keyAgreement) {
            this.didDocument.keyAgreement = [];
        }
        const verificationMethod = keyAgreement instanceof verificationMethod_1.VerificationMethod || typeof keyAgreement === 'string'
            ? keyAgreement
            : new verificationMethod_1.VerificationMethod(keyAgreement);
        this.didDocument.keyAgreement.push(verificationMethod);
        return this;
    }
    build() {
        return this.didDocument;
    }
}
exports.DidDocumentBuilder = DidDocumentBuilder;
//# sourceMappingURL=DidDocumentBuilder.js.map