export interface JwtPayloadJson {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    [key: string]: unknown;
}
export interface JwtPayloadOptions {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    additionalClaims?: Record<string, unknown>;
}
export declare class JwtPayload {
    constructor(options?: JwtPayloadOptions);
    /**
     * identifies the principal that issued the JWT.
     * The processing of this claim is generally application specific.
     * The "iss" value is a case-sensitive string containing a StringOrURI
     * value.
     */
    iss?: string;
    /**
     * identifies the principal that is the
     * subject of the JWT.  The Claims in a JWT are normally statements
     * about the subject.  The subject value MUST either be scoped to be
     * locally unique in the context of the issuer or be globally unique.
     * The processing of this claim is generally application specific.  The
     * "sub" value is a case-sensitive string containing a StringOrURI
     * value.
     */
    sub?: string;
    /**
     * identifies the recipients that the JWT is
     * intended for. Each principal intended to process the JWT MUST
     * identify itself with a value in the audience claim. If the principal
     * processing the claim does not identify itself with a value in the
     * "aud" claim when this claim is present, then the JWT MUST be
     * rejected.In the general case, the "aud" value is an array of case-
     * sensitive strings, each containing a StringOrURI value.  In the
     * special case when the JWT has one audience, the "aud" value MAY be a
     * single case-sensitive string containing a StringOrURI value.  The
     * interpretation of audience values is generally application specific.
     */
    aud?: string | string[];
    /**
     * identifies the expiration time on
     * or after which the JWT MUST NOT be accepted for processing.  The
     * processing of the "exp" claim requires that the current date/time
     * MUST be before the expiration date/time listed in the "exp" claim.
     * Implementers MAY provide for some small leeway, usually no more than
     * a few minutes, to account for clock skew.  Its value MUST be a number
     * containing a NumericDate value.
     */
    exp?: number;
    /**
     * identifies the time at which the JWT was
     * issued. This claim can be used to determine the age of the JWT.  Its
     * value MUST be a number containing a NumericDate value.
     */
    nbf?: number;
    /**
     * identifies the time at which the JWT was
     * issued. This claim can be used to determine the age of the JWT. Its
     * value MUST be a number containing a NumericDate value.
     */
    iat?: number;
    /**
     * provides a unique identifier for the JWT.
     * The identifier value MUST be assigned in a manner that ensures that
     * there is a negligible probability that the same value will be
     * accidentally assigned to a different data object; if the application
     * uses multiple issuers, collisions MUST be prevented among values
     * produced by different issuers as well. The "jti" claim can be used
     * to prevent the JWT from being replayed. The "jti" value is a case-
     * sensitive string.
     */
    jti?: string;
    additionalClaims: Record<string, unknown>;
    /**
     * Validate the JWT payload. This does not verify the signature of the JWT itself.
     *
     * The following validations are performed:
     *  - if `nbf` is present, it must be greater than now
     *  - if `iat` is present, it must be less than now
     *  - if `exp` is present, it must be greater than now
     */
    validate(options?: {
        skewTime?: number;
        now?: number;
    }): void;
    toJson(): JwtPayloadJson;
    static fromJson(jwtPayloadJson: JwtPayloadJson): JwtPayload;
}
