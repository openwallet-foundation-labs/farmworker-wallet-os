import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V1DiscoverFeaturesService } from '../V1DiscoverFeaturesService';
import { V1DiscloseMessage } from '../messages';
export declare class V1DiscloseMessageHandler implements MessageHandler {
    supportedMessages: (typeof V1DiscloseMessage)[];
    private discoverFeaturesService;
    constructor(discoverFeaturesService: V1DiscoverFeaturesService);
    handle(inboundMessage: MessageHandlerInboundMessage<V1DiscloseMessageHandler>): Promise<void>;
}
