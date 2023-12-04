import type { PlaintextMessage } from '../types';
import type { ValidationOptions } from 'class-validator';
export interface ParsedMessageType {
    /**
     * Message name
     *
     * @example request
     */
    messageName: string;
    /**
     * Version of the protocol
     *
     * @example 1.0
     */
    protocolVersion: string;
    /**
     * Major version of the protocol
     *
     * @example 1
     */
    protocolMajorVersion: number;
    /**
     * Minor version of the protocol
     *
     * @example 0
     */
    protocolMinorVersion: number;
    /**
     * Name of the protocol
     *
     * @example connections
     */
    protocolName: string;
    /**
     * Document uri of the message.
     *
     * @example https://didcomm.org
     */
    documentUri: string;
    /**
     * Uri identifier of the protocol. Includes the
     * documentUri, protocolName and protocolVersion.
     * Useful when working with feature discovery
     *
     * @example https://didcomm.org/connections/1.0
     */
    protocolUri: string;
    /**
     * Uri identifier of the message. Includes all parts
     * or the message type.
     *
     * @example https://didcomm.org/connections/1.0/request
     */
    messageTypeUri: string;
}
export declare function parseMessageType(messageType: string): ParsedMessageType;
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
export declare function supportsIncomingMessageType(incomingMessageType: ParsedMessageType, expectedMessageType: ParsedMessageType, { allowLegacyDidSovPrefixMismatch }?: {
    allowLegacyDidSovPrefixMismatch?: boolean;
}): boolean;
export declare function canHandleMessageType(messageClass: {
    type: ParsedMessageType;
}, messageType: ParsedMessageType): boolean;
/**
 * class-validator decorator to check if the string message type value matches with the
 * expected message type. This uses {@link supportsIncomingMessageType}.
 */
export declare function IsValidMessageType(messageType: ParsedMessageType, validationOptions?: ValidationOptions): PropertyDecorator;
export declare function replaceLegacyDidSovPrefixOnMessage(message: PlaintextMessage | Record<string, unknown>): void;
export declare function replaceNewDidCommPrefixWithLegacyDidSovOnMessage(message: Record<string, unknown>): void;
export declare function replaceLegacyDidSovPrefix(messageType: string): string;
export declare function replaceNewDidCommPrefixWithLegacyDidSov(messageType: string): string;
