"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiBaseEncoder = void 0;
const base58_1 = require("./base58");
const multibaseEncodingMap = {
    base58btc: (data) => `z${(0, base58_1.encodeToBase58)(data)}`,
};
const multibaseDecodingMap = {
    z: (data) => ({ data: (0, base58_1.decodeFromBase58)(data.substring(1)), baseName: 'base58btc' }),
};
class MultiBaseEncoder {
    /**
     *
     * Encodes a buffer into a multibase
     *
     * @param buffer the buffer that has to be encoded
     * @param baseName the encoding algorithm
     */
    static encode(buffer, baseName) {
        const encode = multibaseEncodingMap[baseName];
        if (!encode) {
            throw new Error(`Unsupported encoding '${baseName}'`);
        }
        return encode(buffer);
    }
    /**
     *
     * Decodes a multibase into a Uint8Array
     *
     * @param data the multibase that has to be decoded
     *
     * @returns decoded data and the multi base name
     */
    static decode(data) {
        const prefix = data[0];
        const decode = multibaseDecodingMap[prefix];
        if (!decode) {
            throw new Error(`No decoder found for multibase prefix '${prefix}'`);
        }
        return decode(data);
    }
    static isValid(data) {
        try {
            MultiBaseEncoder.decode(data);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.MultiBaseEncoder = MultiBaseEncoder;
//# sourceMappingURL=MultiBaseEncoder.js.map