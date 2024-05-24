"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const sha256_1 = require("@stablelib/sha256");
const TypedArrayEncoder_1 = require("./TypedArrayEncoder");
const hashingMap = {
    'sha-256': (data) => (0, sha256_1.hash)(data),
};
class Hasher {
    static hash(data, hashName) {
        const dataAsUint8Array = typeof data === 'string' ? TypedArrayEncoder_1.TypedArrayEncoder.fromString(data) : data;
        if (hashName in hashingMap) {
            const hashFn = hashingMap[hashName];
            return hashFn(dataAsUint8Array);
        }
        throw new Error(`Unsupported hash name '${hashName}'`);
    }
}
exports.Hasher = Hasher;
//# sourceMappingURL=Hasher.js.map