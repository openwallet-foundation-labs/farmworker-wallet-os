import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { MediatorService } from '../services/MediatorService';
import { OutboundMessageContext } from '../../../agent/models';
import { KeylistUpdateMessage } from '../messages';
export declare class KeylistUpdateHandler implements MessageHandler {
    private mediatorService;
    supportedMessages: (typeof KeylistUpdateMessage)[];
    constructor(mediatorService: MediatorService);
    handle(messageContext: MessageHandlerInboundMessage<KeylistUpdateHandler>): Promise<OutboundMessageContext<import("../messages").KeylistUpdateResponseMessage>>;
}
