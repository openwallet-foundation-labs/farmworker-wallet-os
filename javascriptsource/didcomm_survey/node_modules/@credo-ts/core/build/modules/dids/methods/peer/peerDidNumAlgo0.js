"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.didToNumAlgo0DidDocument = exports.keyToNumAlgo0DidDocument = void 0;
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const keyDidDocument_1 = require("../../domain/keyDidDocument");
const parse_1 = require("../../domain/parse");
const didPeer_1 = require("./didPeer");
function keyToNumAlgo0DidDocument(key) {
    const did = `did:peer:0${key.fingerprint}`;
    return (0, keyDidDocument_1.getDidDocumentForKey)(did, key);
}
exports.keyToNumAlgo0DidDocument = keyToNumAlgo0DidDocument;
function didToNumAlgo0DidDocument(did) {
    const parsed = (0, parse_1.parseDid)(did);
    const numAlgo = (0, didPeer_1.getNumAlgoFromPeerDid)(did);
    if (!(0, didPeer_1.isValidPeerDid)(did)) {
        throw new error_1.CredoError(`Invalid peer did '${did}'`);
    }
    if (numAlgo !== didPeer_1.PeerDidNumAlgo.InceptionKeyWithoutDoc) {
        throw new error_1.CredoError(`Invalid numAlgo ${numAlgo}, expected ${didPeer_1.PeerDidNumAlgo.InceptionKeyWithoutDoc}`);
    }
    const key = Key_1.Key.fromFingerprint(parsed.id.substring(1));
    return (0, keyDidDocument_1.getDidDocumentForKey)(did, key);
}
exports.didToNumAlgo0DidDocument = didToNumAlgo0DidDocument;
//# sourceMappingURL=peerDidNumAlgo0.js.map