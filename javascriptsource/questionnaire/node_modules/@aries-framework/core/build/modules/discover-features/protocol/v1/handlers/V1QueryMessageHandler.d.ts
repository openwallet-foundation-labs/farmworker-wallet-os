import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V1DiscoverFeaturesService } from '../V1DiscoverFeaturesService';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V1QueryMessage } from '../messages';
export declare class V1QueryMessageHandler implements MessageHandler {
    private discoverFeaturesService;
    supportedMessages: (typeof V1QueryMessage)[];
    constructor(discoverFeaturesService: V1DiscoverFeaturesService);
    handle(inboundMessage: MessageHandlerInboundMessage<V1QueryMessageHandler>): Promise<OutboundMessageContext<import("../../../../..").AgentMessage> | undefined>;
}
