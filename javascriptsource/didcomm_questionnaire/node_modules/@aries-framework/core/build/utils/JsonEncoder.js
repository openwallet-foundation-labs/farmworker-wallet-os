"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonEncoder = void 0;
const base64_1 = require("./base64");
const buffer_1 = require("./buffer");
class JsonEncoder {
    /**
     * Encode json object into base64 string.
     *
     * @param json the json object to encode into base64 string
     */
    static toBase64(json) {
        return JsonEncoder.toBuffer(json).toString('base64');
    }
    /**
     * Encode json object into base64url string.
     *
     * @param json the json object to encode into base64url string
     */
    static toBase64URL(json) {
        return (0, base64_1.base64ToBase64URL)(JsonEncoder.toBase64(json));
    }
    /**
     * Decode base64 string into json object. Also supports base64url
     *
     * @param base64 the base64 or base64url string to decode into json
     */
    static fromBase64(base64) {
        return JsonEncoder.fromBuffer(buffer_1.Buffer.from(base64, 'base64'));
    }
    /**
     * Encode json object into string
     *
     * @param json the json object to encode into string
     */
    static toString(json) {
        return JSON.stringify(json);
    }
    /**
     * Decode string into json object
     *
     * @param string the string to decode into json
     */
    static fromString(string) {
        return JSON.parse(string);
    }
    /**
     * Encode json object into buffer
     *
     * @param json the json object to encode into buffer format
     */
    static toBuffer(json) {
        return buffer_1.Buffer.from(JsonEncoder.toString(json));
    }
    /**
     * Decode buffer into json object
     *
     * @param buffer the buffer to decode into json
     */
    static fromBuffer(buffer) {
        return JsonEncoder.fromString(buffer_1.Buffer.from(buffer).toString('utf-8'));
    }
}
exports.JsonEncoder = JsonEncoder;
//# sourceMappingURL=JsonEncoder.js.map