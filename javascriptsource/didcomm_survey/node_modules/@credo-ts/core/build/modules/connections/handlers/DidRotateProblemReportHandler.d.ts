import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidRotateService } from '../services';
import { DidRotateProblemReportMessage } from '../messages';
export declare class DidRotateProblemReportHandler implements MessageHandler {
    private didRotateService;
    supportedMessages: (typeof DidRotateProblemReportMessage)[];
    constructor(didRotateService: DidRotateService);
    handle(messageContext: MessageHandlerInboundMessage<DidRotateProblemReportHandler>): Promise<void>;
}
