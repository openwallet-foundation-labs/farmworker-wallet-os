"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLinkedAttachment = exports.encodeAttachment = void 0;
const AriesFrameworkError_1 = require("../error/AriesFrameworkError");
const HashlinkEncoder_1 = require("./HashlinkEncoder");
const TypedArrayEncoder_1 = require("./TypedArrayEncoder");
/**
 * Encodes an attachment based on the `data` property
 *
 * @param attachment The attachment that needs to be encoded
 * @param hashAlgorithm The hashing algorithm that is going to be used
 * @param baseName The base encoding name that is going to be used
 * @returns A hashlink based on the attachment data
 */
function encodeAttachment(attachment, hashAlgorithm = 'sha2-256', baseName = 'base58btc') {
    if (attachment.data.sha256) {
        return `hl:${attachment.data.sha256}`;
    }
    else if (attachment.data.base64) {
        return HashlinkEncoder_1.HashlinkEncoder.encode(TypedArrayEncoder_1.TypedArrayEncoder.fromBase64(attachment.data.base64), hashAlgorithm, baseName);
    }
    else if (attachment.data.json) {
        throw new AriesFrameworkError_1.AriesFrameworkError(`Attachment: (${attachment.id}) has json encoded data. This is currently not supported`);
    }
    else {
        throw new AriesFrameworkError_1.AriesFrameworkError(`Attachment: (${attachment.id}) has no data to create a link with`);
    }
}
exports.encodeAttachment = encodeAttachment;
/**
 * Checks if an attachment is a linked Attachment
 *
 * @param attachment the attachment that has to be validated
 * @returns a boolean whether the attachment is a linkedAttachment
 */
function isLinkedAttachment(attachment) {
    return HashlinkEncoder_1.HashlinkEncoder.isValid(`hl:${attachment.id}`);
}
exports.isLinkedAttachment = isLinkedAttachment;
//# sourceMappingURL=attachment.js.map