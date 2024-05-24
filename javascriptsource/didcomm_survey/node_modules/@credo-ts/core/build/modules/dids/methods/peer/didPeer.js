"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlternativeDidsForPeerDid = exports.getNumAlgoFromPeerDid = exports.PeerDidNumAlgo = exports.isValidPeerDid = void 0;
const error_1 = require("../../../../error");
const peerDidNumAlgo4_1 = require("./peerDidNumAlgo4");
const PEER_DID_REGEX = new RegExp('^did:peer:(([01](z)([1-9a-km-zA-HJ-NP-Z]{5,200}))|(2((.[AEVID](z)([1-9a-km-zA-HJ-NP-Z]{5,200}))+(.(S)[0-9a-zA-Z=]*)?))|([4](z[1-9a-km-zA-HJ-NP-Z]{46})(:z[1-9a-km-zA-HJ-NP-Z]{6,}){0,1}))$');
function isValidPeerDid(did) {
    const isValid = PEER_DID_REGEX.test(did);
    return isValid;
}
exports.isValidPeerDid = isValidPeerDid;
var PeerDidNumAlgo;
(function (PeerDidNumAlgo) {
    PeerDidNumAlgo[PeerDidNumAlgo["InceptionKeyWithoutDoc"] = 0] = "InceptionKeyWithoutDoc";
    PeerDidNumAlgo[PeerDidNumAlgo["GenesisDoc"] = 1] = "GenesisDoc";
    PeerDidNumAlgo[PeerDidNumAlgo["MultipleInceptionKeyWithoutDoc"] = 2] = "MultipleInceptionKeyWithoutDoc";
    PeerDidNumAlgo[PeerDidNumAlgo["ShortFormAndLongForm"] = 4] = "ShortFormAndLongForm";
})(PeerDidNumAlgo = exports.PeerDidNumAlgo || (exports.PeerDidNumAlgo = {}));
function getNumAlgoFromPeerDid(did) {
    const numAlgo = Number(did[9]);
    if (numAlgo !== PeerDidNumAlgo.InceptionKeyWithoutDoc &&
        numAlgo !== PeerDidNumAlgo.GenesisDoc &&
        numAlgo !== PeerDidNumAlgo.MultipleInceptionKeyWithoutDoc &&
        numAlgo !== PeerDidNumAlgo.ShortFormAndLongForm) {
        throw new error_1.CredoError(`Invalid peer did numAlgo: ${numAlgo}`);
    }
    return numAlgo;
}
exports.getNumAlgoFromPeerDid = getNumAlgoFromPeerDid;
/**
 * Given a peer did, returns any alternative forms equivalent to it.
 *
 * @param did
 * @returns array of alternative dids or undefined if not applicable
 */
function getAlternativeDidsForPeerDid(did) {
    if (getNumAlgoFromPeerDid(did) === PeerDidNumAlgo.ShortFormAndLongForm) {
        return (0, peerDidNumAlgo4_1.getAlternativeDidsForNumAlgo4Did)(did);
    }
}
exports.getAlternativeDidsForPeerDid = getAlternativeDidsForPeerDid;
//# sourceMappingURL=didPeer.js.map