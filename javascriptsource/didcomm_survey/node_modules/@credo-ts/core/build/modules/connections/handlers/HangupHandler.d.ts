import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidRotateService } from '../services';
import { HangupMessage } from '../messages';
export declare class HangupHandler implements MessageHandler {
    private didRotateService;
    supportedMessages: (typeof HangupMessage)[];
    constructor(didRotateService: DidRotateService);
    handle(inboundMessage: MessageHandlerInboundMessage<HangupHandler>): Promise<void>;
}
