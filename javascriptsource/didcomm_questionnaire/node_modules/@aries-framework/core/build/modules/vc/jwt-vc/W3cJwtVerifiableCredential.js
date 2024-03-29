"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cJwtVerifiableCredential = void 0;
const Jwt_1 = require("../../../crypto/jose/jwt/Jwt");
const ClaimFormat_1 = require("../models/ClaimFormat");
const credentialTransformer_1 = require("./credentialTransformer");
class W3cJwtVerifiableCredential {
    constructor(options) {
        this.jwt = options.jwt;
        this._credential = (0, credentialTransformer_1.getCredentialFromJwtPayload)(this.jwt.payload);
    }
    static fromSerializedJwt(serializedJwt) {
        const jwt = Jwt_1.Jwt.fromSerializedJwt(serializedJwt);
        return new W3cJwtVerifiableCredential({
            jwt,
        });
    }
    /**
     * Get the W3cCredential from the JWT payload. This does not include the JWT wrapper,
     * and thus is not suitable for sharing. If you need a JWT, use the `serializedJwt` property.
     *
     * All properties and getters from the `W3cCredential` interface are implemented as getters
     * on the `W3cJwtVerifiableCredential` class itself, so you can also use this directly
     * instead of accessing the inner `credential` property.
     */
    get credential() {
        return this._credential;
    }
    get serializedJwt() {
        return this.jwt.serializedJwt;
    }
    //
    // Below all properties from the `W3cCredential` interface are implemented as getters
    // this is to make the interface compatible with the W3cJsonLdVerifiableCredential interface
    // which makes using the different classes interchangeably from a user point of view.
    // This is 'easier' than extending the W3cCredential class as it means we have to create the
    // instance based on JSON, but also add custom properties.
    //
    get context() {
        return this.credential.context;
    }
    get id() {
        return this.credential.id;
    }
    get type() {
        return this.credential.type;
    }
    get issuer() {
        return this.credential.issuer;
    }
    get issuanceDate() {
        return this.credential.issuanceDate;
    }
    get expirationDate() {
        return this.credential.expirationDate;
    }
    get credentialSubject() {
        return this.credential.credentialSubject;
    }
    get credentialSchema() {
        return this.credential.credentialSchema;
    }
    get credentialStatus() {
        return this.credential.credentialStatus;
    }
    get issuerId() {
        return this.credential.issuerId;
    }
    get credentialSchemaIds() {
        return this.credential.credentialSchemaIds;
    }
    get credentialSubjectIds() {
        return this.credential.credentialSubjectIds;
    }
    get contexts() {
        return this.credential.contexts;
    }
    /**
     * The {@link ClaimFormat} of the credential. For JWT credentials this is always `jwt_vc`.
     */
    get claimFormat() {
        return ClaimFormat_1.ClaimFormat.JwtVc;
    }
    /**
     * Get the encoded variant of the W3C Verifiable Credential. For JWT credentials this is
     * a JWT string.
     */
    get encoded() {
        return this.serializedJwt;
    }
}
exports.W3cJwtVerifiableCredential = W3cJwtVerifiableCredential;
//# sourceMappingURL=W3cJwtVerifiableCredential.js.map