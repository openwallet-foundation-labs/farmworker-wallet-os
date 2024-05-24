"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSdJwtVcAsync = exports.decodeSdJwtVc = exports.isWrappedSdJwtVerifiablePresentation = exports.isWrappedSdJwtVerifiableCredential = void 0;
const decode_1 = require("@sd-jwt/decode");
function isWrappedSdJwtVerifiableCredential(vc) {
    return vc.format === 'vc+sd-jwt';
}
exports.isWrappedSdJwtVerifiableCredential = isWrappedSdJwtVerifiableCredential;
function isWrappedSdJwtVerifiablePresentation(vp) {
    return vp.format === 'vc+sd-jwt';
}
exports.isWrappedSdJwtVerifiablePresentation = isWrappedSdJwtVerifiablePresentation;
/**
 * Decode an SD-JWT vc from its compact format (string) to an object containing the disclosures,
 * signed payload, decoded payload and the compact SD-JWT vc.
 *
 * Both the input and output interfaces of this method are defined in `@sphereon/ssi-types`, so
 * this method hides the actual implementation of SD-JWT (which is currently based on @sd-jwt/core)
 */
function decodeSdJwtVc(compactSdJwtVc, hasher) {
    const { jwt, disclosures } = (0, decode_1.decodeSdJwtSync)(compactSdJwtVc, hasher);
    const signedPayload = jwt.payload;
    const decodedPayload = (0, decode_1.getClaimsSync)(signedPayload, disclosures, hasher);
    return {
        compactSdJwtVc,
        decodedPayload: decodedPayload,
        disclosures: disclosures.map((d) => {
            const decoded = d.key ? [d.salt, d.key, d.value] : [d.salt, d.value];
            if (!d._digest)
                throw new Error('Implementation error: digest not present in disclosure');
            return {
                decoded: decoded,
                digest: d._digest,
                encoded: d.encode(),
            };
        }),
        signedPayload: signedPayload,
    };
}
exports.decodeSdJwtVc = decodeSdJwtVc;
/**
 * Decode an SD-JWT vc from its compact format (string) to an object containing the disclosures,
 * signed payload, decoded payload and the compact SD-JWT vc.
 *
 * Both the input and output interfaces of this method are defined in `@sphereon/ssi-types`, so
 * this method hides the actual implementation of SD-JWT (which is currently based on @sd-jwt/core)
 */
function decodeSdJwtVcAsync(compactSdJwtVc, hasher) {
    return __awaiter(this, void 0, void 0, function* () {
        const { jwt, disclosures } = yield (0, decode_1.decodeSdJwt)(compactSdJwtVc, hasher);
        const signedPayload = jwt.payload;
        const decodedPayload = yield (0, decode_1.getClaims)(signedPayload, disclosures, hasher);
        return {
            compactSdJwtVc,
            decodedPayload: decodedPayload,
            disclosures: disclosures.map((d) => {
                const decoded = d.key ? [d.salt, d.key, d.value] : [d.salt, d.value];
                if (!d._digest)
                    throw new Error('Implementation error: digest not present in disclosure');
                return {
                    decoded: decoded,
                    digest: d._digest,
                    encoded: d.encode(),
                };
            }),
            signedPayload: signedPayload,
        };
    });
}
exports.decodeSdJwtVcAsync = decodeSdJwtVcAsync;
//# sourceMappingURL=sd-jwt-vc.js.map