import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2MessagePickupProtocol } from '../V2MessagePickupProtocol';
import { V2LiveDeliveryChangeMessage } from '../messages';
export declare class V2LiveDeliveryChangeHandler implements MessageHandler {
    supportedMessages: (typeof V2LiveDeliveryChangeMessage)[];
    private messagePickupService;
    constructor(messagePickupService: V2MessagePickupProtocol);
    handle(messageContext: InboundMessageContext<V2LiveDeliveryChangeMessage>): Promise<import("../../../../..").OutboundMessageContext<import("../messages").V2StatusMessage>>;
}
