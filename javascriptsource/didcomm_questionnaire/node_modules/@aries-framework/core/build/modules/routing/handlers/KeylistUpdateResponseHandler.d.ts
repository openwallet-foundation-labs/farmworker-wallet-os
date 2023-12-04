import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { MediationRecipientService } from '../services';
import { KeylistUpdateResponseMessage } from '../messages';
export declare class KeylistUpdateResponseHandler implements MessageHandler {
    mediationRecipientService: MediationRecipientService;
    supportedMessages: (typeof KeylistUpdateResponseMessage)[];
    constructor(mediationRecipientService: MediationRecipientService);
    handle(messageContext: MessageHandlerInboundMessage<KeylistUpdateResponseHandler>): Promise<void>;
}
