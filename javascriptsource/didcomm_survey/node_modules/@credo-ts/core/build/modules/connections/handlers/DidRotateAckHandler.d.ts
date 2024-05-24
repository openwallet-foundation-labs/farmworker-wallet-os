import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidRotateService } from '../services';
import { DidRotateAckMessage } from '../messages';
export declare class DidRotateAckHandler implements MessageHandler {
    private didRotateService;
    supportedMessages: (typeof DidRotateAckMessage)[];
    constructor(didRotateService: DidRotateService);
    handle(inboundMessage: MessageHandlerInboundMessage<DidRotateAckHandler>): Promise<void>;
}
