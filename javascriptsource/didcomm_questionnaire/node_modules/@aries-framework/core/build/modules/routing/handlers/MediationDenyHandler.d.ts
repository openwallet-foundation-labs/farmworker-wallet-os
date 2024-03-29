import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { MediationRecipientService } from '../services';
import { MediationDenyMessage } from '../messages';
export declare class MediationDenyHandler implements MessageHandler {
    private mediationRecipientService;
    supportedMessages: (typeof MediationDenyMessage)[];
    constructor(mediationRecipientService: MediationRecipientService);
    handle(messageContext: MessageHandlerInboundMessage<MediationDenyHandler>): Promise<void>;
}
