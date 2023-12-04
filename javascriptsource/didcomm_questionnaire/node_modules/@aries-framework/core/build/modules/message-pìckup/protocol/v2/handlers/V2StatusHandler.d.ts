import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2MessagePickupProtocol } from '../V2MessagePickupProtocol';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2StatusMessage } from '../messages';
export declare class V2StatusHandler implements MessageHandler {
    supportedMessages: (typeof V2StatusMessage)[];
    private messagePickupService;
    constructor(messagePickupService: V2MessagePickupProtocol);
    handle(messageContext: InboundMessageContext<V2StatusMessage>): Promise<OutboundMessageContext<import("../messages").V2DeliveryRequestMessage> | undefined>;
}
