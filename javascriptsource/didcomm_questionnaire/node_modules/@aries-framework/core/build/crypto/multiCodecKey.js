"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultiCodecPrefixByKeyType = exports.getKeyTypeByMultiCodecPrefix = void 0;
const KeyType_1 = require("./KeyType");
// based on https://github.com/multiformats/multicodec/blob/master/table.csv
const multiCodecPrefixMap = {
    234: KeyType_1.KeyType.Bls12381g1,
    235: KeyType_1.KeyType.Bls12381g2,
    236: KeyType_1.KeyType.X25519,
    237: KeyType_1.KeyType.Ed25519,
    238: KeyType_1.KeyType.Bls12381g1g2,
    4608: KeyType_1.KeyType.P256,
    4609: KeyType_1.KeyType.P384,
    4610: KeyType_1.KeyType.P521,
};
function getKeyTypeByMultiCodecPrefix(multiCodecPrefix) {
    const keyType = multiCodecPrefixMap[multiCodecPrefix];
    if (!keyType) {
        throw new Error(`Unsupported key type from multicodec code '${multiCodecPrefix}'`);
    }
    return keyType;
}
exports.getKeyTypeByMultiCodecPrefix = getKeyTypeByMultiCodecPrefix;
function getMultiCodecPrefixByKeyType(keyType) {
    const codes = Object.keys(multiCodecPrefixMap);
    const code = codes.find((key) => multiCodecPrefixMap[key] === keyType);
    if (!code) {
        throw new Error(`Could not find multicodec prefix for key type '${keyType}'`);
    }
    return Number(code);
}
exports.getMultiCodecPrefixByKeyType = getMultiCodecPrefixByKeyType;
//# sourceMappingURL=multiCodecKey.js.map