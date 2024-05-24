"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cJwtVerifiablePresentation = void 0;
const Jwt_1 = require("../../../crypto/jose/jwt/Jwt");
const error_1 = require("../../../error");
const models_1 = require("../models");
const presentationTransformer_1 = require("./presentationTransformer");
class W3cJwtVerifiablePresentation {
    constructor(options) {
        this.jwt = options.jwt;
        this._presentation = (0, presentationTransformer_1.getPresentationFromJwtPayload)(this.jwt.payload);
    }
    static fromSerializedJwt(serializedJwt) {
        const jwt = Jwt_1.Jwt.fromSerializedJwt(serializedJwt);
        if (!jwt.payload.additionalClaims.nonce) {
            throw new error_1.CredoError(`JWT payload does not contain required claim 'nonce'`);
        }
        return new W3cJwtVerifiablePresentation({
            jwt,
        });
    }
    /**
     * Get the W3cPresentation from the JWT payload. This does not include the JWT wrapper,
     * and thus is not suitable for sharing. If you need a JWT, use the `serializedJwt` property.
     *
     * All properties and getters from the `W3cPresentation` interface are implemented as getters
     * on the `W3cJwtVerifiablePresentation` class itself, so you can also use this directly
     * instead of accessing the inner `presentation` property.
     */
    get presentation() {
        return this._presentation;
    }
    get serializedJwt() {
        return this.jwt.serializedJwt;
    }
    //
    // Below all properties from the `W3cPresentation` interface are implemented as getters
    // this is to make the interface compatible with the W3cJsonLdVerifiablePresentation interface
    // which makes using the different classes interchangeably from a user point of view.
    // This is 'easier' than extending the W3cPresentation class as it means we have to create the
    // instance based on JSON, but also add custom properties.
    //
    get context() {
        return this.presentation.context;
    }
    get id() {
        return this.presentation.id;
    }
    get type() {
        return this.presentation.type;
    }
    get holder() {
        return this.presentation.holder;
    }
    get verifiableCredential() {
        return this.presentation.verifiableCredential;
    }
    get holderId() {
        return this.presentation.holderId;
    }
    /**
     * The {@link ClaimFormat} of the presentation. For JWT presentations this is always `jwt_vp`.
     */
    get claimFormat() {
        return models_1.ClaimFormat.JwtVp;
    }
    /**
     * Get the encoded variant of the W3C Verifiable Presentation. For JWT presentations this is
     * a JWT string.
     */
    get encoded() {
        return this.serializedJwt;
    }
}
exports.W3cJwtVerifiablePresentation = W3cJwtVerifiablePresentation;
//# sourceMappingURL=W3cJwtVerifiablePresentation.js.map