import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { TrustPingService } from '../services/TrustPingService';
import { TrustPingResponseMessage } from '../messages';
export declare class TrustPingResponseMessageHandler implements MessageHandler {
    private trustPingService;
    supportedMessages: (typeof TrustPingResponseMessage)[];
    constructor(trustPingService: TrustPingService);
    handle(inboundMessage: MessageHandlerInboundMessage<TrustPingResponseMessageHandler>): Promise<void>;
}
