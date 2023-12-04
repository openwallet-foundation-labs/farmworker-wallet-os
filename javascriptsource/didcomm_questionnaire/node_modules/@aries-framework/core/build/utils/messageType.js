"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceNewDidCommPrefixWithLegacyDidSov = exports.replaceLegacyDidSovPrefix = exports.replaceNewDidCommPrefixWithLegacyDidSovOnMessage = exports.replaceLegacyDidSovPrefixOnMessage = exports.IsValidMessageType = exports.canHandleMessageType = exports.supportsIncomingMessageType = exports.parseMessageType = void 0;
const class_validator_1 = require("class-validator");
const string_1 = require("./string");
const version_1 = require("./version");
function parseMessageType(messageType) {
    const [documentUri, protocolName, protocolVersion, messageName] = (0, string_1.rightSplit)(messageType, '/', 3);
    const [protocolMajorVersion, protocolMinorVersion] = (0, version_1.parseVersionString)(protocolVersion);
    return {
        documentUri,
        protocolName,
        protocolVersion,
        protocolMajorVersion,
        protocolMinorVersion,
        messageName,
        protocolUri: `${documentUri}/${protocolName}/${protocolVersion}`,
        messageTypeUri: messageType,
    };
}
exports.parseMessageType = parseMessageType;
/**
 * Check whether the incoming message type is a message type that can be handled by comparing it to the expected message type.
 * In this case the expected message type is e.g. the type declared on an agent message class, and the incoming message type is the type
 * that is parsed from the incoming JSON.
 *
 * The method will make sure the following fields are equal:
 *  - documentUri
 *  - protocolName
 *  - majorVersion
 *  - messageName
 *
 * If allowLegacyDidSovPrefixMismatch is true (default) it will allow for the case where the incoming message type still has the legacy
 * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec did prefix, but the expected message type does not. This only works for incoming messages with a prefix
 * of did:sov:BzCbsNYhMrjHiqZDTUASHg;spec and the expected message type having a prefix value of https:/didcomm.org
 *
 * @example
 * const incomingMessageType = parseMessageType('https://didcomm.org/connections/1.0/request')
 * const expectedMessageType = parseMessageType('https://didcomm.org/connections/1.4/request')
 *
 * // Returns true because the incoming message type is equal to the expected message type, except for
 * // the minor version, which is lower
 * const isIncomingMessageTypeSupported = supportsIncomingMessageType(incomingMessageType, expectedMessageType)
 *
 * @example
 * const incomingMessageType = parseMessageType('did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/request')
 * const expectedMessageType = parseMessageType('https://didcomm.org/connections/1.0/request')
 *
 * // Returns true because the incoming message type is equal to the expected message type, except for
 * // the legacy did sov prefix.
 * const isIncomingMessageTypeSupported = supportsIncomingMessageType(incomingMessageType, expectedMessageType)
 */
function supportsIncomingMessageType(incomingMessageType, expectedMessageType, { allowLegacyDidSovPrefixMismatch = true } = {}) {
    const incomingDocumentUri = allowLegacyDidSovPrefixMismatch
        ? replaceLegacyDidSovPrefix(incomingMessageType.documentUri)
        : incomingMessageType.documentUri;
    const documentUriMatches = expectedMessageType.documentUri === incomingDocumentUri;
    const protocolNameMatches = expectedMessageType.protocolName === incomingMessageType.protocolName;
    const majorVersionMatches = expectedMessageType.protocolMajorVersion === incomingMessageType.protocolMajorVersion;
    const messageNameMatches = expectedMessageType.messageName === incomingMessageType.messageName;
    // Everything besides the minor version must match
    return documentUriMatches && protocolNameMatches && majorVersionMatches && messageNameMatches;
}
exports.supportsIncomingMessageType = supportsIncomingMessageType;
function canHandleMessageType(messageClass, messageType) {
    return supportsIncomingMessageType(messageClass.type, messageType);
}
exports.canHandleMessageType = canHandleMessageType;
/**
 * class-validator decorator to check if the string message type value matches with the
 * expected message type. This uses {@link supportsIncomingMessageType}.
 */
function IsValidMessageType(messageType, validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isValidMessageType',
        constraints: [messageType],
        validator: {
            validate: (value, args) => {
                const [expectedMessageType] = args.constraints;
                // Type must be string
                if (typeof value !== 'string') {
                    return false;
                }
                const incomingMessageType = parseMessageType(value);
                return supportsIncomingMessageType(incomingMessageType, expectedMessageType);
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property does not match the expected message type (only minor version may be lower)', validationOptions),
        },
    }, validationOptions);
}
exports.IsValidMessageType = IsValidMessageType;
function replaceLegacyDidSovPrefixOnMessage(message) {
    message['@type'] = replaceLegacyDidSovPrefix(message['@type']);
}
exports.replaceLegacyDidSovPrefixOnMessage = replaceLegacyDidSovPrefixOnMessage;
function replaceNewDidCommPrefixWithLegacyDidSovOnMessage(message) {
    message['@type'] = replaceNewDidCommPrefixWithLegacyDidSov(message['@type']);
}
exports.replaceNewDidCommPrefixWithLegacyDidSovOnMessage = replaceNewDidCommPrefixWithLegacyDidSovOnMessage;
function replaceLegacyDidSovPrefix(messageType) {
    const didSovPrefix = 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec';
    const didCommPrefix = 'https://didcomm.org';
    if (messageType.startsWith(didSovPrefix)) {
        return messageType.replace(didSovPrefix, didCommPrefix);
    }
    return messageType;
}
exports.replaceLegacyDidSovPrefix = replaceLegacyDidSovPrefix;
function replaceNewDidCommPrefixWithLegacyDidSov(messageType) {
    const didSovPrefix = 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec';
    const didCommPrefix = 'https://didcomm.org';
    if (messageType.startsWith(didCommPrefix)) {
        return messageType.replace(didCommPrefix, didSovPrefix);
    }
    return messageType;
}
exports.replaceNewDidCommPrefixWithLegacyDidSov = replaceNewDidCommPrefixWithLegacyDidSov;
//# sourceMappingURL=messageType.js.map