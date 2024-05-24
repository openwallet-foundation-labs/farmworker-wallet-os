"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresentationsToCreate = void 0;
const vc_1 = require("../../vc");
// FIXME: we should extract supported format form top-level presentation definition, and input_descriptor as well
// to make sure the presentation we are going to create is a presentation format supported by the verifier.
// In addition we should allow to pass an override 'format' object, as specification like OID4VP do not use the
// PD formats, but define their own.
function getPresentationsToCreate(credentialsForInputDescriptor) {
    const presentationsToCreate = [];
    // We map all credentials for a input descriptor to the different subject ids. Each subjectId will need
    // to create a separate proof (either on the same presentation or if not allowed by proof format on separate)
    // presentations
    for (const [inputDescriptorId, credentials] of Object.entries(credentialsForInputDescriptor)) {
        for (const credential of credentials) {
            if (credential instanceof vc_1.W3cCredentialRecord) {
                const subjectId = credential.credential.credentialSubjectIds[0];
                // NOTE: we only support one subjectId per VP -- once we have proper support
                // for multiple proofs on an LDP-VP we can add multiple subjectIds to a single VP for LDP-vp only
                const expectedClaimFormat = credential.credential.claimFormat === vc_1.ClaimFormat.LdpVc ? vc_1.ClaimFormat.LdpVp : vc_1.ClaimFormat.JwtVp;
                const matchingClaimFormatAndSubject = presentationsToCreate.find((p) => { var _a; return p.claimFormat === expectedClaimFormat && Boolean((_a = p.subjectIds) === null || _a === void 0 ? void 0 : _a.includes(subjectId)); });
                if (matchingClaimFormatAndSubject) {
                    matchingClaimFormatAndSubject.verifiableCredentials.push({ inputDescriptorId, credential });
                }
                else {
                    presentationsToCreate.push({
                        claimFormat: expectedClaimFormat,
                        subjectIds: [subjectId],
                        verifiableCredentials: [{ credential, inputDescriptorId }],
                    });
                }
            }
            else {
                // SD-JWT-VC always needs it's own presentation
                presentationsToCreate.push({
                    claimFormat: vc_1.ClaimFormat.SdJwtVc,
                    subjectIds: [],
                    verifiableCredentials: [{ inputDescriptorId, credential }],
                });
            }
        }
    }
    return presentationsToCreate;
}
exports.getPresentationsToCreate = getPresentationsToCreate;
//# sourceMappingURL=presentationsToCreate.js.map