"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifiablePresentationFromEncoded = exports.getSphereonOriginalVerifiablePresentation = exports.getSphereonOriginalVerifiableCredential = void 0;
const error_1 = require("../../../error");
const utils_1 = require("../../../utils");
const sd_jwt_vc_1 = require("../../sd-jwt-vc");
const vc_1 = require("../../vc");
function getSphereonOriginalVerifiableCredential(credentialRecord) {
    if (credentialRecord instanceof vc_1.W3cCredentialRecord) {
        return credentialRecord.credential.encoded;
    }
    else {
        return credentialRecord.compactSdJwtVc;
    }
}
exports.getSphereonOriginalVerifiableCredential = getSphereonOriginalVerifiableCredential;
function getSphereonOriginalVerifiablePresentation(verifiablePresentation) {
    if (verifiablePresentation instanceof vc_1.W3cJwtVerifiablePresentation ||
        verifiablePresentation instanceof vc_1.W3cJsonLdVerifiablePresentation) {
        return verifiablePresentation.encoded;
    }
    else {
        return verifiablePresentation.compact;
    }
}
exports.getSphereonOriginalVerifiablePresentation = getSphereonOriginalVerifiablePresentation;
// TODO: we might want to move this to some generic vc transformation util
function getVerifiablePresentationFromEncoded(agentContext, encodedVerifiablePresentation) {
    if (typeof encodedVerifiablePresentation === 'string' && encodedVerifiablePresentation.includes('~')) {
        const sdJwtVcApi = agentContext.dependencyManager.resolve(sd_jwt_vc_1.SdJwtVcApi);
        return sdJwtVcApi.fromCompact(encodedVerifiablePresentation);
    }
    else if (typeof encodedVerifiablePresentation === 'string') {
        return vc_1.W3cJwtVerifiablePresentation.fromSerializedJwt(encodedVerifiablePresentation);
    }
    else if (typeof encodedVerifiablePresentation === 'object' && '@context' in encodedVerifiablePresentation) {
        return utils_1.JsonTransformer.fromJSON(encodedVerifiablePresentation, vc_1.W3cJsonLdVerifiablePresentation);
    }
    else {
        throw new error_1.CredoError('Unsupported verifiable presentation format');
    }
}
exports.getVerifiablePresentationFromEncoded = getVerifiablePresentationFromEncoded;
//# sourceMappingURL=transform.js.map