import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidRotateService } from '../services';
import type { ConnectionService } from '../services/ConnectionService';
import { DidRotateMessage } from '../messages';
export declare class DidRotateHandler implements MessageHandler {
    private didRotateService;
    private connectionService;
    supportedMessages: (typeof DidRotateMessage)[];
    constructor(didRotateService: DidRotateService, connectionService: ConnectionService);
    handle(messageContext: MessageHandlerInboundMessage<DidRotateHandler>): Promise<import("../../..").OutboundMessageContext<import("../messages").DidRotateProblemReportMessage> | import("../../..").OutboundMessageContext<import("../messages").DidRotateAckMessage>>;
}
