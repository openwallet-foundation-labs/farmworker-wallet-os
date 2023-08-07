import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2MessagePickupProtocol } from '../V2MessagePickupProtocol';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2MessageDeliveryMessage } from '../messages/V2MessageDeliveryMessage';
export declare class V2MessageDeliveryHandler implements MessageHandler {
    supportedMessages: (typeof V2MessageDeliveryMessage)[];
    private messagePickupService;
    constructor(messagePickupService: V2MessagePickupProtocol);
    handle(messageContext: InboundMessageContext<V2MessageDeliveryMessage>): Promise<OutboundMessageContext<import("..").V2MessagesReceivedMessage> | undefined>;
}
