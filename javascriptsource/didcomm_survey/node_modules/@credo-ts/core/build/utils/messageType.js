"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceNewDidCommPrefixWithLegacyDidSov = exports.replaceLegacyDidSovPrefix = exports.replaceNewDidCommPrefixWithLegacyDidSovOnMessage = exports.replaceLegacyDidSovPrefixOnMessage = exports.IsValidMessageType = exports.canHandleMessageType = exports.supportsIncomingMessageType = exports.supportsIncomingDidCommProtocolUri = exports.parseDidCommProtocolUri = exports.parseMessageType = void 0;
const class_validator_1 = require("class-validator");
const PROTOCOL_URI_REGEX = /^(.+)\/([^/\\]+)\/(\d+).(\d+)$/;
const MESSAGE_TYPE_REGEX = /^(.+)\/([^/\\]+)\/(\d+).(\d+)\/([^/\\]+)$/;
// TODO: rename to `parseDidCommMessageType` and `DidCommParsedProtocolUri`
// in the future
function parseMessageType(messageType) {
    const match = MESSAGE_TYPE_REGEX.exec(messageType);
    if (!match) {
        throw new Error(`Invalid message type: ${messageType}`);
    }
    const [, documentUri, protocolName, protocolVersionMajor, protocolVersionMinor, messageName] = match;
    return {
        documentUri,
        protocolName,
        protocolVersion: `${protocolVersionMajor}.${protocolVersionMinor}`,
        protocolMajorVersion: parseInt(protocolVersionMajor),
        protocolMinorVersion: parseInt(protocolVersionMinor),
        messageName,
        protocolUri: `${documentUri}/${protocolName}/${protocolVersionMajor}.${protocolVersionMinor}`,
        messageTypeUri: messageType,
    };
}
exports.parseMessageType = parseMessageType;
function parseDidCommProtocolUri(didCommProtocolUri) {
    const match = PROTOCOL_URI_REGEX.exec(didCommProtocolUri);
    if (!match) {
        throw new Error(`Invalid protocol uri: ${didCommProtocolUri}`);
    }
    const [, documentUri, protocolName, protocolVersionMajor, protocolVersionMinor] = match;
    return {
        documentUri,
        protocolName,
        protocolVersion: `${protocolVersionMajor}.${protocolVersionMinor}`,
        protocolMajorVersion: parseInt(protocolVersionMajor),
        protocolMinorVersion: parseInt(protocolVersionMinor),
        protocolUri: `${documentUri}/${protocolName}/${protocolVersionMajor}.${protocolVersionMinor}`,
    };
}
exports.parseDidCommProtocolUri = parseDidCommProtocolUri;
/**
 * Check whether the incoming didcomm protocol uri is a protocol uri that can be handled by comparing it to the expected didcomm protocol uri.
 * In this case the expected protocol uri is e.g. the handshake protocol supported (https://didcomm.org/connections/1.0), and the incoming protocol uri
 * is the uri that is parsed from the incoming out of band invitation handshake_protocols.
 *
 * The method will make sure the following fields are equal:
 *  - documentUri
 *  - protocolName
 *  - majorVersion
 *
 * If allowLegacyDidSovPrefixMismatch is true (default) it will allow for the case where the incoming protocol uri still has the legacy
 * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec did prefix, but the expected message type does not. This only works for incoming messages with a prefix
 * of did:sov:BzCbsNYhMrjHiqZDTUASHg;spec and the expected message type having a prefix value of https:/didcomm.org
 *
 * @example
 * const incomingProtocolUri = parseDidCommProtocolUri('https://didcomm.org/connections/1.0')
 * const expectedProtocolUri = parseDidCommProtocolUri('https://didcomm.org/connections/1.4')
 *
 * // Returns true because the incoming protocol uri is equal to the expected protocol uri, except for
 * // the minor version, which is lower
 * const isIncomingProtocolUriSupported = supportsIncomingDidCommProtocolUri(incomingProtocolUri, expectedProtocolUri)
 *
 * @example
 * const incomingProtocolUri = parseDidCommProtocolUri('did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0')
 * const expectedProtocolUri = parseDidCommProtocolUri('https://didcomm.org/connections/1.0')
 *
 * // Returns true because the incoming protocol uri is equal to the expected protocol uri, except for
 * // the legacy did sov prefix.
 * const isIncomingProtocolUriSupported = supportsIncomingDidCommProtocolUri(incomingProtocolUri, expectedProtocolUri)
 */
function supportsIncomingDidCommProtocolUri(incomingProtocolUri, expectedProtocolUri, { allowLegacyDidSovPrefixMismatch = true } = {}) {
    const incomingDocumentUri = allowLegacyDidSovPrefixMismatch
        ? replaceLegacyDidSovPrefix(incomingProtocolUri.documentUri)
        : incomingProtocolUri.documentUri;
    const documentUriMatches = expectedProtocolUri.documentUri === incomingDocumentUri;
    const protocolNameMatches = expectedProtocolUri.protocolName === incomingProtocolUri.protocolName;
    const majorVersionMatches = expectedProtocolUri.protocolMajorVersion === incomingProtocolUri.protocolMajorVersion;
    // Everything besides the minor version must match
    return documentUriMatches && protocolNameMatches && majorVersionMatches;
}
exports.supportsIncomingDidCommProtocolUri = supportsIncomingDidCommProtocolUri;
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