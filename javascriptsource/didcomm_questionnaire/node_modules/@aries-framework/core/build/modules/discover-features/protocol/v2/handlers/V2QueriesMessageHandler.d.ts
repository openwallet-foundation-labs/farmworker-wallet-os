import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2DiscoverFeaturesService } from '../V2DiscoverFeaturesService';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2QueriesMessage } from '../messages';
export declare class V2QueriesMessageHandler implements MessageHandler {
    private discoverFeaturesService;
    supportedMessages: (typeof V2QueriesMessage)[];
    constructor(discoverFeaturesService: V2DiscoverFeaturesService);
    handle(inboundMessage: MessageHandlerInboundMessage<V2QueriesMessageHandler>): Promise<OutboundMessageContext<import("../messages").V2DisclosuresMessage> | undefined>;
}
