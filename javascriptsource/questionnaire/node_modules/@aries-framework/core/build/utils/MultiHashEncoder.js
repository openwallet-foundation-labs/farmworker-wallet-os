"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiHashEncoder = void 0;
const Hasher_1 = require("./Hasher");
const VarintEncoder_1 = require("./VarintEncoder");
const buffer_1 = require("./buffer");
const multiHashNameMap = {
    'sha2-256': 0x12,
};
const multiHashCodeMap = Object.entries(multiHashNameMap).reduce((map, [hashName, hashCode]) => (Object.assign(Object.assign({}, map), { [hashCode]: hashName })), {});
class MultiHashEncoder {
    /**
     *
     * Encodes a buffer into a hash
     *
     * @param buffer the buffer that has to be encoded
     * @param hashName the hashing algorithm, 'sha2-256'
     *
     * @returns a multihash
     */
    static encode(data, hashName) {
        const hash = Hasher_1.Hasher.hash(data, hashName);
        const hashCode = multiHashNameMap[hashName];
        const hashPrefix = VarintEncoder_1.VarintEncoder.encode(hashCode);
        const hashLengthPrefix = VarintEncoder_1.VarintEncoder.encode(hash.length);
        return buffer_1.Buffer.concat([hashPrefix, hashLengthPrefix, hash]);
    }
    /**
     *
     * Decodes the multihash
     *
     * @param data the multihash that has to be decoded
     *
     * @returns object with the data and the hashing algorithm
     */
    static decode(data) {
        const [hashPrefix, hashPrefixByteLength] = VarintEncoder_1.VarintEncoder.decode(data);
        const withoutHashPrefix = data.slice(hashPrefixByteLength);
        const [, lengthPrefixByteLength] = VarintEncoder_1.VarintEncoder.decode(withoutHashPrefix);
        const withoutLengthPrefix = withoutHashPrefix.slice(lengthPrefixByteLength);
        const hashName = multiHashCodeMap[hashPrefix];
        if (!hashName) {
            throw new Error(`Unsupported hash code 0x${hashPrefix.toString(16)}`);
        }
        return {
            data: buffer_1.Buffer.from(withoutLengthPrefix),
            hashName: multiHashCodeMap[hashPrefix],
        };
    }
    /**
     *
     * Validates if it is a valid mulithash
     *
     * @param data the multihash that needs to be validated
     *
     * @returns a boolean whether the multihash is valid
     */
    static isValid(data) {
        try {
            MultiHashEncoder.decode(data);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.MultiHashEncoder = MultiHashEncoder;
//# sourceMappingURL=MultiHashEncoder.js.map