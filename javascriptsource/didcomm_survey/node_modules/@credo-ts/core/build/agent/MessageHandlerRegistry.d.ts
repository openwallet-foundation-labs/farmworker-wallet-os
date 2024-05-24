import type { AgentMessage } from './AgentMessage';
import type { MessageHandler } from './MessageHandler';
import type { ParsedDidCommProtocolUri } from '../utils/messageType';
export declare class MessageHandlerRegistry {
    private messageHandlers;
    registerMessageHandler(messageHandler: MessageHandler): void;
    getHandlerForMessageType(messageType: string): MessageHandler | undefined;
    getMessageClassForMessageType(messageType: string): typeof AgentMessage | undefined;
    /**
     * Returns array of message types that dispatcher is able to handle.
     * Message type format is MTURI specified at https://github.com/hyperledger/aries-rfcs/blob/main/concepts/0003-protocols/README.md#mturi.
     */
    get supportedMessageTypes(): import("../utils/messageType").ParsedMessageType[];
    /**
     * Returns array of protocol IDs that dispatcher is able to handle.
     * Protocol ID format is PIURI specified at https://github.com/hyperledger/aries-rfcs/blob/main/concepts/0003-protocols/README.md#piuri.
     */
    get supportedProtocolUris(): ParsedDidCommProtocolUri[];
    filterSupportedProtocolsByProtocolUris(parsedProtocolUris: ParsedDidCommProtocolUri[]): ParsedDidCommProtocolUri[];
}
