import type { W3cPresentation } from '../models';
import { Jwt } from '../../../crypto/jose/jwt/Jwt';
import { ClaimFormat } from '../models';
export interface W3cJwtVerifiablePresentationOptions {
    jwt: Jwt;
}
export declare class W3cJwtVerifiablePresentation {
    readonly jwt: Jwt;
    private _presentation;
    constructor(options: W3cJwtVerifiablePresentationOptions);
    static fromSerializedJwt(serializedJwt: string): W3cJwtVerifiablePresentation;
    /**
     * Get the W3cPresentation from the JWT payload. This does not include the JWT wrapper,
     * and thus is not suitable for sharing. If you need a JWT, use the `serializedJwt` property.
     *
     * All properties and getters from the `W3cPresentation` interface are implemented as getters
     * on the `W3cJwtVerifiablePresentation` class itself, so you can also use this directly
     * instead of accessing the inner `presentation` property.
     */
    get presentation(): W3cPresentation;
    get serializedJwt(): string;
    get context(): (string | import("../../..").JsonObject)[];
    get id(): string | undefined;
    get type(): string[];
    get holder(): string | import("../models/presentation/W3cHolder").W3cHolder | undefined;
    get verifiableCredential(): import("../../../utils").SingleOrArray<import("..").W3cJsonLdVerifiableCredential | import("./W3cJwtVerifiableCredential").W3cJwtVerifiableCredential>;
    get holderId(): string | null;
    /**
     * The {@link ClaimFormat} of the presentation. For JWT presentations this is always `jwt_vp`.
     */
    get claimFormat(): ClaimFormat.JwtVp;
    /**
     * Get the encoded variant of the W3C Verifiable Presentation. For JWT presentations this is
     * a JWT string.
     */
    get encoded(): string;
}
