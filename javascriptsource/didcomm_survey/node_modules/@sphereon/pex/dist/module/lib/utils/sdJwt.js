import { getSDAlgAndPayload, unpackObj } from '@sd-jwt/decode';
import { createHashMappingForSerializedDisclosure, selectDisclosures } from '@sd-jwt/present';
import * as u8a from 'uint8arrays';
import { ObjectUtils } from './ObjectUtils';
export function calculateSdHash(compactSdJwtVc, alg, hasher) {
    const digest = hasher(compactSdJwtVc, alg);
    return u8a.toString(digest, 'base64url');
}
/**
 * Applies the presentation frame to the decoded sd-jwt vc and will update the
 * `decodedPayload`, `compactSdJwt` and `disclosures` properties.
 *
 * Both the input and output interfaces of this method are defined in `@sphereon/ssi-types`, so
 * this method hides the actual implementation of SD-JWT (which is currently based on @sd-jwt/*)
 */
export function applySdJwtLimitDisclosure(sdJwtDecodedVerifiableCredential, presentationFrame) {
    const SerializedDisclosures = sdJwtDecodedVerifiableCredential.disclosures.map((d) => ({
        digest: d.digest,
        encoded: d.encoded,
        salt: d.decoded[0],
        value: d.decoded.length === 3 ? d.decoded[2] : d.decoded[1],
        key: d.decoded.length === 3 ? d.decoded[1] : undefined,
    }));
    const requiredDisclosures = selectDisclosures(ObjectUtils.cloneDeep(sdJwtDecodedVerifiableCredential.signedPayload), 
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
    const { payload } = getSDAlgAndPayload(ObjectUtils.cloneDeep(sdJwtDecodedVerifiableCredential.signedPayload));
    const disclosureHashMap = createHashMappingForSerializedDisclosure(requiredDisclosures);
    const { unpackedObj: decodedPayload } = unpackObj(payload, disclosureHashMap);
    // Update the decoded / 'pretty' payload
    sdJwtDecodedVerifiableCredential.decodedPayload = decodedPayload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RKd3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbHMvc2RKd3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBUzlGLE9BQU8sS0FBSyxHQUFHLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUMsTUFBTSxVQUFVLGVBQWUsQ0FBQyxjQUFzQixFQUFFLEdBQVcsRUFBRSxNQUFjO0lBQ2pGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0MsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxnQ0FBa0UsRUFDbEUsaUJBQXlDO0lBRXpDLE1BQU0scUJBQXFCLEdBQUcsZ0NBQWdDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07UUFDaEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1FBQ2xCLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRCxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0tBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUosTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FDM0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQ0FBZ0MsQ0FBQyxhQUFhLENBQUM7SUFDckUsa0NBQWtDO0lBQ2xDLHFCQUFxQixFQUNyQixpQkFBK0QsQ0FDaEUsQ0FBQztJQUVGLGdDQUFnQyxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0UsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBMkI7UUFDekYsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO0tBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUosTUFBTSxtQkFBbUIsR0FBRyxnQ0FBZ0MsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0YsTUFBTSxVQUFVLEdBQUcsZ0NBQWdDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU5RSxnQ0FBZ0MsQ0FBQyxjQUFjLEdBQUcsVUFBVTtRQUMxRCwwRUFBMEU7U0FDekUsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUViLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDOUcsTUFBTSxpQkFBaUIsR0FBRyx3Q0FBd0MsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hGLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBRTlFLHdDQUF3QztJQUN4QyxnQ0FBZ0MsQ0FBQyxjQUFjLEdBQUcsY0FBeUQsQ0FBQztBQUM5RyxDQUFDIn0=