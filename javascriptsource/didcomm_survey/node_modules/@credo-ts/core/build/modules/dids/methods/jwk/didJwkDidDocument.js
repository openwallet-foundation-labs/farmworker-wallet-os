"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDidJwkDocument = void 0;
const error_1 = require("../../../../error");
const utils_1 = require("../../../../utils");
const constants_1 = require("../../../vc/constants");
const domain_1 = require("../../domain");
const parse_1 = require("../../domain/parse");
function getDidJwkDocument(didJwk) {
    if (!didJwk.allowsEncrypting && !didJwk.allowsSigning) {
        throw new error_1.CredoError('At least one of allowsSigning or allowsEncrypting must be enabled');
    }
    const parsed = (0, parse_1.parseDid)(didJwk.did);
    const jwkJson = utils_1.JsonEncoder.fromBase64(parsed.id);
    const verificationMethod = (0, domain_1.getJsonWebKey2020)({
        did: didJwk.did,
        jwk: jwkJson,
        verificationMethodId: didJwk.verificationMethodId,
    });
    const didDocumentBuilder = new domain_1.DidDocumentBuilder(didJwk.did)
        .addContext(constants_1.SECURITY_JWS_CONTEXT_URL)
        .addVerificationMethod(verificationMethod);
    if (didJwk.allowsSigning) {
        didDocumentBuilder
            .addAuthentication(verificationMethod.id)
            .addAssertionMethod(verificationMethod.id)
            .addCapabilityDelegation(verificationMethod.id)
            .addCapabilityInvocation(verificationMethod.id);
    }
    if (didJwk.allowsEncrypting) {
        didDocumentBuilder.addKeyAgreement(verificationMethod.id);
    }
    return didDocumentBuilder.build();
}
exports.getDidJwkDocument = getDidJwkDocument;
//# sourceMappingURL=didJwkDidDocument.js.map