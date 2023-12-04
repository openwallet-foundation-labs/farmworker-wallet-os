import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V1MessagePickupProtocol } from '../V1MessagePickupProtocol';
import { V1BatchPickupMessage } from '../messages';
export declare class V1BatchPickupHandler implements MessageHandler {
    private messagePickupService;
    supportedMessages: (typeof V1BatchPickupMessage)[];
    constructor(messagePickupService: V1MessagePickupProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V1BatchPickupHandler>): Promise<import("../../../../..").OutboundMessageContext<import("../messages").V1BatchMessage>>;
}
