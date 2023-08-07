import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { RevocationNotificationService } from '../services';
import { V1RevocationNotificationMessage } from '../messages/V1RevocationNotificationMessage';
export declare class V1RevocationNotificationHandler implements MessageHandler {
    private revocationService;
    supportedMessages: (typeof V1RevocationNotificationMessage)[];
    constructor(revocationService: RevocationNotificationService);
    handle(messageContext: MessageHandlerInboundMessage<V1RevocationNotificationHandler>): Promise<void>;
}
