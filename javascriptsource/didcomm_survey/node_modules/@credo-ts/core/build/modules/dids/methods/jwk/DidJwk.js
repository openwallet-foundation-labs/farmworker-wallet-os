"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidJwk = void 0;
const jwk_1 = require("../../../../crypto/jose/jwk");
const utils_1 = require("../../../../utils");
const parse_1 = require("../../domain/parse");
const didJwkDidDocument_1 = require("./didJwkDidDocument");
class DidJwk {
    constructor(did) {
        this.did = did;
    }
    get allowsEncrypting() {
        return this.jwk.use === 'enc' || this.key.supportsEncrypting;
    }
    get allowsSigning() {
        return this.jwk.use === 'sig' || this.key.supportsSigning;
    }
    static fromDid(did) {
        const parsed = (0, parse_1.parseDid)(did);
        const jwkJson = utils_1.JsonEncoder.fromBase64(parsed.id);
        // This validates the jwk
        (0, jwk_1.getJwkFromJson)(jwkJson);
        return new DidJwk(did);
    }
    /**
     * A did:jwk DID can only have one verification method, and the verification method
     * id will always be `<did>#0`.
     */
    get verificationMethodId() {
        return `${this.did}#0`;
    }
    static fromJwk(jwk) {
        const did = `did:jwk:${utils_1.JsonEncoder.toBase64URL(jwk.toJson())}`;
        return new DidJwk(did);
    }
    get key() {
        return this.jwk.key;
    }
    get jwk() {
        const jwk = (0, jwk_1.getJwkFromJson)(this.jwkJson);
        return jwk;
    }
    get jwkJson() {
        const parsed = (0, parse_1.parseDid)(this.did);
        const jwkJson = utils_1.JsonEncoder.fromBase64(parsed.id);
        return jwkJson;
    }
    get didDocument() {
        return (0, didJwkDidDocument_1.getDidJwkDocument)(this);
    }
}
exports.DidJwk = DidJwk;
//# sourceMappingURL=DidJwk.js.map