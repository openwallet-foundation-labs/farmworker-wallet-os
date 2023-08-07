import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2DiscoverFeaturesService } from '../V2DiscoverFeaturesService';
import { V2DisclosuresMessage } from '../messages';
export declare class V2DisclosuresMessageHandler implements MessageHandler {
    private discoverFeaturesService;
    supportedMessages: (typeof V2DisclosuresMessage)[];
    constructor(discoverFeaturesService: V2DiscoverFeaturesService);
    handle(inboundMessage: MessageHandlerInboundMessage<V2DisclosuresMessageHandler>): Promise<void>;
}
