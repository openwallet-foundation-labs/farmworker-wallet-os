import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { ConnectionService } from '../services/ConnectionService';
import type { TrustPingService } from '../services/TrustPingService';
import { TrustPingMessage } from '../messages';
export declare class TrustPingMessageHandler implements MessageHandler {
    private trustPingService;
    private connectionService;
    supportedMessages: (typeof TrustPingMessage)[];
    constructor(trustPingService: TrustPingService, connectionService: ConnectionService);
    handle(messageContext: MessageHandlerInboundMessage<TrustPingMessageHandler>): Promise<import("../../..").OutboundMessageContext<import("../messages").TrustPingResponseMessage> | undefined>;
}
