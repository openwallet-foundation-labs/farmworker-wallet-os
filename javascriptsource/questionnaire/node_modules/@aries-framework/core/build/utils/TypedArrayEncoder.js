"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedArrayEncoder = void 0;
const base58_1 = require("./base58");
const base64_1 = require("./base64");
const buffer_1 = require("./buffer");
class TypedArrayEncoder {
    /**
     * Encode buffer into base64 string.
     *
     * @param buffer the buffer to encode into base64 string
     */
    static toBase64(buffer) {
        return buffer_1.Buffer.from(buffer).toString('base64');
    }
    /**
     * Encode buffer into base64url string.
     *
     * @param buffer the buffer to encode into base64url string
     */
    static toBase64URL(buffer) {
        return (0, base64_1.base64ToBase64URL)(TypedArrayEncoder.toBase64(buffer));
    }
    /**
     * Encode buffer into base58 string.
     *
     * @param buffer the buffer to encode into base58 string
     */
    static toBase58(buffer) {
        return (0, base58_1.encodeToBase58)(buffer);
    }
    /**
     * Decode base64 string into buffer. Also supports base64url
     *
     * @param base64 the base64 or base64url string to decode into buffer format
     */
    static fromBase64(base64) {
        return buffer_1.Buffer.from(base64, 'base64');
    }
    /**
     * Decode base58 string into buffer
     *
     * @param base58 the base58 string to decode into buffer format
     */
    static fromBase58(base58) {
        return buffer_1.Buffer.from((0, base58_1.decodeFromBase58)(base58));
    }
    /**
     * Encode buffer into base64 string.
     *
     * @param buffer the buffer to encode into base64 string
     */
    static toHex(buffer) {
        return buffer_1.Buffer.from(buffer).toString('hex');
    }
    /**
     * Decode hex string into buffer
     *
     * @param hex the hex string to decode into buffer format
     */
    static fromHex(hex) {
        return buffer_1.Buffer.from(hex, 'hex');
    }
    /**
     * Decode string into buffer.
     *
     * @param str the string to decode into buffer format
     */
    static fromString(str) {
        return buffer_1.Buffer.from(str);
    }
    static toUtf8String(buffer) {
        return buffer_1.Buffer.from(buffer).toString();
    }
    /**
     * Check whether an array is byte, or typed, array
     *
     * @param array unknown The array that has to be checked
     *
     * @returns A boolean if the array is a byte array
     */
    static isTypedArray(array) {
        // Checks whether the static property 'BYTES_PER_ELEMENT' exists on the provided array.
        // This has to be done, since the TypedArrays, e.g. Uint8Array and Float32Array, do not
        // extend a single base class
        return 'BYTES_PER_ELEMENT' in array;
    }
}
exports.TypedArrayEncoder = TypedArrayEncoder;
//# sourceMappingURL=TypedArrayEncoder.js.map