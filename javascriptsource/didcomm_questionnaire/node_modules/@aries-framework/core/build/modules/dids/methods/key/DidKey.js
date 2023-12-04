"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidKey = void 0;
const Key_1 = require("../../../../crypto/Key");
const keyDidDocument_1 = require("../../domain/keyDidDocument");
const parse_1 = require("../../domain/parse");
class DidKey {
    constructor(key) {
        this.key = key;
    }
    static fromDid(did) {
        const parsed = (0, parse_1.parseDid)(did);
        const key = Key_1.Key.fromFingerprint(parsed.id);
        return new DidKey(key);
    }
    get did() {
        return `did:key:${this.key.fingerprint}`;
    }
    get didDocument() {
        return (0, keyDidDocument_1.getDidDocumentForKey)(this.did, this.key);
    }
}
exports.DidKey = DidKey;
//# sourceMappingURL=DidKey.js.map