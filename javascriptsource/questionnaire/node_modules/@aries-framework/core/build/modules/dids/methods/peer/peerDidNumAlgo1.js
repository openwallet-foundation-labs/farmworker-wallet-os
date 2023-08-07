"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.didDocumentJsonToNumAlgo1Did = void 0;
const utils_1 = require("../../../../utils");
function didDocumentJsonToNumAlgo1Did(didDocumentJson) {
    // We need to remove the id property before hashing
    const didDocumentBuffer = utils_1.JsonEncoder.toBuffer(Object.assign(Object.assign({}, didDocumentJson), { id: undefined }));
    const didIdentifier = utils_1.MultiBaseEncoder.encode(utils_1.MultiHashEncoder.encode(didDocumentBuffer, 'sha2-256'), 'base58btc');
    const did = `did:peer:1${didIdentifier}`;
    return did;
}
exports.didDocumentJsonToNumAlgo1Did = didDocumentJsonToNumAlgo1Did;
//# sourceMappingURL=peerDidNumAlgo1.js.map