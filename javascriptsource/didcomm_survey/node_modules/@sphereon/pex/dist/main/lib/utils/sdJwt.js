"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySdJwtLimitDisclosure = exports.calculateSdHash = void 0;
const decode_1 = require("@sd-jwt/decode");
const present_1 = require("@sd-jwt/present");
const u8a = __importStar(require("uint8arrays"));
const ObjectUtils_1 = require("./ObjectUtils");
function calculateSdHash(compactSdJwtVc, alg, hasher) {
    const digest = hasher(compactSdJwtVc, alg);
    return u8a.toString(digest, 'base64url');
}
exports.calculateSdHash = calculateSdHash;
/**
 * Applies the presentation frame to the decoded sd-jwt vc and will update the
 * `decodedPayload`, `compactSdJwt` and `disclosures` properties.
 *
 * Both the input and output interfaces of this method are defined in `@sphereon/ssi-types`, so
 * this method hides the actual implementation of SD-JWT (which is currently based on @sd-jwt/*)
 */
function applySdJwtLimitDisclosure(sdJwtDecodedVerifiableCredential, presentationFrame) {
    const SerializedDisclosures = sdJwtDecodedVerifiableCredential.disclosures.map((d) => ({
        digest: d.digest,
        encoded: d.encoded,
        salt: d.decoded[0],
        value: d.decoded.length === 3 ? d.decoded[2] : d.decoded[1],
        key: d.decoded.length === 3 ? d.decoded[1] : undefined,
    }));
    const requiredDisclosures = (0, present_1.selectDisclosures)(ObjectUtils_1.ObjectUtils.cloneDeep(sdJwtDecodedVerifiableCredential.signedPayload), 
    // Map to sd-jwt disclosure format
    SerializedDisclosures, presentationFrame);
    sdJwtDecodedVerifiableCredential.disclosures = requiredDisclosures.map((d) => ({
        encoded: d.encoded,
        decoded: (d.key ? [d.salt, d.key, d.value] : [d.salt, d.value]),
        digest: d.digest,
    }));
    const includedDisclosures = sdJwtDecodedVerifiableCredential.disclosures.map((d) => d.encoded);
    const sdJwtParts = sdJwtDecodedVerifiableCredential.compactSdJwtVc.split('~');
    sdJwtDecodedVerifiableCredential.compactSdJwtVc = sdJwtParts
        // We want to keep first item (sd-jwt), last item (kb-jwt) and the digests
        .filter((item, index) => index === 0 || index === sdJwtParts.length - 1 || includedDisclosures.includes(item))
        .join('~');
    const { payload } = (0, decode_1.getSDAlgAndPayload)(ObjectUtils_1.ObjectUtils.cloneDeep(sdJwtDecodedVerifiableCredential.signedPayload));
    const disclosureHashMap = (0, present_1.createHashMappingForSerializedDisclosure)(requiredDisclosures);
    const { unpackedObj: decodedPayload } = (0, decode_1.unpackObj)(payload, disclosureHashMap);
    // Update the decoded / 'pretty' payload
    sdJwtDecodedVerifiableCredential.decodedPayload = decodedPayload;
}
exports.applySdJwtLimitDisclosure = applySdJwtLimitDisclosure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RKd3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbHMvc2RKd3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0Q7QUFDL0QsNkNBQThGO0FBUzlGLGlEQUFtQztBQUVuQywrQ0FBNEM7QUFFNUMsU0FBZ0IsZUFBZSxDQUFDLGNBQXNCLEVBQUUsR0FBVyxFQUFFLE1BQWM7SUFDakYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFIRCwwQ0FHQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLHlCQUF5QixDQUN2QyxnQ0FBa0UsRUFDbEUsaUJBQXlDO0lBRXpDLE1BQU0scUJBQXFCLEdBQUcsZ0NBQWdDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07UUFDaEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1FBQ2xCLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRCxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0tBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUosTUFBTSxtQkFBbUIsR0FBRyxJQUFBLDJCQUFpQixFQUMzQyx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxnQ0FBZ0MsQ0FBQyxhQUFhLENBQUM7SUFDckUsa0NBQWtDO0lBQ2xDLHFCQUFxQixFQUNyQixpQkFBK0QsQ0FDaEUsQ0FBQztJQUVGLGdDQUFnQyxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0UsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBMkI7UUFDekYsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO0tBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUosTUFBTSxtQkFBbUIsR0FBRyxnQ0FBZ0MsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0YsTUFBTSxVQUFVLEdBQUcsZ0NBQWdDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU5RSxnQ0FBZ0MsQ0FBQyxjQUFjLEdBQUcsVUFBVTtRQUMxRCwwRUFBMEU7U0FDekUsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUViLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLDJCQUFrQixFQUFDLHlCQUFXLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDOUcsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLGtEQUF3QyxFQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEYsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsR0FBRyxJQUFBLGtCQUFTLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFFOUUsd0NBQXdDO0lBQ3hDLGdDQUFnQyxDQUFDLGNBQWMsR0FBRyxjQUF5RCxDQUFDO0FBQzlHLENBQUM7QUF2Q0QsOERBdUNDIn0=