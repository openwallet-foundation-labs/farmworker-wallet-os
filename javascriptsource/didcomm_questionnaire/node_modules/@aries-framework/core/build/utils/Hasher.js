"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const sha256_1 = require("@stablelib/sha256");
const hashingMap = {
    'sha2-256': (data) => (0, sha256_1.hash)(data),
};
class Hasher {
    static hash(data, hashName) {
        const hashFn = hashingMap[hashName];
        if (!hashFn) {
            throw new Error(`Unsupported hash name '${hashName}'`);
        }
        return hashFn(data);
    }
}
exports.Hasher = Hasher;
//# sourceMappingURL=Hasher.js.map