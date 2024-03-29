"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashlinkEncoder = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ts is giving me headaches because this package has no types
const borc_1 = __importDefault(require("borc"));
const MultiBaseEncoder_1 = require("./MultiBaseEncoder");
const MultiHashEncoder_1 = require("./MultiHashEncoder");
const hexTable = {
    urls: 0x0f,
    contentType: 0x0e,
};
class HashlinkEncoder {
    /**
     * Encodes a buffer, with optional metadata, into a hashlink
     *
     * @param buffer the buffer to encode into a hashlink
     * @param hashAlgorithm the name of the hashing algorithm 'sha2-256'
     * @param baseEncoding the name of the base encoding algorithm 'base58btc'
     * @param metadata the optional metadata in the hashlink
     *
     * @returns hashlink hashlink with optional metadata
     */
    static encode(buffer, hashAlgorithm, baseEncoding = 'base58btc', metadata) {
        const checksum = this.encodeMultiHash(buffer, hashAlgorithm, baseEncoding);
        const mbMetadata = metadata && Object.keys(metadata).length > 0 ? this.encodeMetadata(metadata, baseEncoding) : null;
        return mbMetadata ? `hl:${checksum}:${mbMetadata}` : `hl:${checksum}`;
    }
    /**
     * Decodes a hashlink into HashlinkData object
     *
     * @param hashlink the hashlink that needs decoding
     *
     * @returns object the decoded hashlink
     */
    static decode(hashlink) {
        if (this.isValid(hashlink)) {
            const hashlinkList = hashlink.split(':');
            const [, checksum, encodedMetadata] = hashlinkList;
            return encodedMetadata ? { checksum, metadata: this.decodeMetadata(encodedMetadata) } : { checksum };
        }
        else {
            throw new Error(`Invalid hashlink: ${hashlink}`);
        }
    }
    /**
     * Validates a hashlink
     *
     * @param hashlink the hashlink that needs validating
     *
     * @returns a boolean whether the hashlink is valid
     *
     * */
    static isValid(hashlink) {
        const hashlinkList = hashlink.split(':');
        const validMultiBase = MultiBaseEncoder_1.MultiBaseEncoder.isValid(hashlinkList[1]);
        if (!validMultiBase) {
            return false;
        }
        const { data } = MultiBaseEncoder_1.MultiBaseEncoder.decode(hashlinkList[1]);
        const validMultiHash = MultiHashEncoder_1.MultiHashEncoder.isValid(data);
        return validMultiHash ? true : false;
    }
    static encodeMultiHash(data, hashName, baseEncoding = 'base58btc') {
        const mh = MultiHashEncoder_1.MultiHashEncoder.encode(data, hashName);
        const mb = MultiBaseEncoder_1.MultiBaseEncoder.encode(mh, baseEncoding);
        return mb;
    }
    static encodeMetadata(metadata, baseEncoding) {
        const metadataMap = new Map();
        for (const key of Object.keys(metadata)) {
            if (key === 'urls' || key === 'contentType') {
                metadataMap.set(hexTable[key], metadata[key]);
            }
            else {
                throw new Error(`Invalid metadata: ${metadata}`);
            }
        }
        const cborData = borc_1.default.encode(metadataMap);
        const multibaseMetadata = MultiBaseEncoder_1.MultiBaseEncoder.encode(cborData, baseEncoding);
        return multibaseMetadata;
    }
    static decodeMetadata(mb) {
        const obj = { urls: [], contentType: '' };
        const { data } = MultiBaseEncoder_1.MultiBaseEncoder.decode(mb);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cborData = borc_1.default.decode(data);
            cborData.forEach((value, key) => {
                if (key === hexTable.urls) {
                    obj.urls = value;
                }
                else if (key === hexTable.contentType) {
                    obj.contentType = value;
                }
                else {
                    throw new Error(`Invalid metadata property: ${key}:${value}`);
                }
            });
            return obj;
        }
        catch (error) {
            throw new Error(`Invalid metadata: ${mb}, ${error}`);
        }
    }
}
exports.HashlinkEncoder = HashlinkEncoder;
//# sourceMappingURL=HashlinkEncoder.js.map