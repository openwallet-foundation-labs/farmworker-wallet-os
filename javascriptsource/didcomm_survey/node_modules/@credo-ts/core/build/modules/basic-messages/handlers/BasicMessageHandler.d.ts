import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { BasicMessageService } from '../services/BasicMessageService';
import { BasicMessage } from '../messages';
export declare class BasicMessageHandler implements MessageHandler {
    private basicMessageService;
    supportedMessages: (typeof BasicMessage)[];
    constructor(basicMessageService: BasicMessageService);
    handle(messageContext: MessageHandlerInboundMessage<BasicMessageHandler>): Promise<void>;
}
