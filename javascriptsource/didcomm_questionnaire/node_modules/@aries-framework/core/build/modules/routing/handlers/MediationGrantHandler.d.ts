import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { MediationRecipientService } from '../services/MediationRecipientService';
import { MediationGrantMessage } from '../messages';
export declare class MediationGrantHandler implements MessageHandler {
    private mediationRecipientService;
    supportedMessages: (typeof MediationGrantMessage)[];
    constructor(mediationRecipientService: MediationRecipientService);
    handle(messageContext: MessageHandlerInboundMessage<MediationGrantHandler>): Promise<void>;
}
