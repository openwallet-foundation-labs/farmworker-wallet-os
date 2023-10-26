import type { W3cCredential } from '../models/credential/W3cCredential';
import { Jwt } from '../../../crypto/jose/jwt/Jwt';
import { ClaimFormat } from '../models/ClaimFormat';
export interface W3cJwtVerifiableCredentialOptions {
    jwt: Jwt;
}
export declare class W3cJwtVerifiableCredential {
    readonly jwt: Jwt;
    private _credential;
    constructor(options: W3cJwtVerifiableCredentialOptions);
    static fromSerializedJwt(serializedJwt: string): W3cJwtVerifiableCredential;
    /**
     * Get the W3cCredential from the JWT payload. This does not include the JWT wrapper,
     * and thus is not suitable for sharing. If you need a JWT, use the `serializedJwt` property.
     *
     * All properties and getters from the `W3cCredential` interface are implemented as getters
     * on the `W3cJwtVerifiableCredential` class itself, so you can also use this directly
     * instead of accessing the inner `credential` property.
     */
    get credential(): W3cCredential;
    get serializedJwt(): string;
    get context(): (string | import("../../..").JsonObject)[];
    get id(): string | undefined;
    get type(): string[];
    get issuer(): string | import("..").W3cIssuer;
    get issuanceDate(): string;
    get expirationDate(): string | undefined;
    get credentialSubject(): import("../../../utils").SingleOrArray<import("..").W3cCredentialSubject>;
    get credentialSchema(): import("../../../utils").SingleOrArray<import("..").W3cCredentialSchema> | undefined;
    get credentialStatus(): import("../models/credential/W3cCredentialStatus").W3cCredentialStatus | undefined;
    get issuerId(): string;
    get credentialSchemaIds(): string[];
    get credentialSubjectIds(): string[];
    get contexts(): (string | import("../../..").JsonObject)[];
    /**
     * The {@link ClaimFormat} of the credential. For JWT credentials this is always `jwt_vc`.
     */
    get claimFormat(): ClaimFormat.JwtVc;
    /**
     * Get the encoded variant of the W3C Verifiable Credential. For JWT credentials this is
     * a JWT string.
     */
    get encoded(): string;
}
