import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { ConnectionService } from '../services/ConnectionService';
import { AckMessage } from '../../common';
export declare class AckMessageHandler implements MessageHandler {
    private connectionService;
    supportedMessages: (typeof AckMessage)[];
    constructor(connectionService: ConnectionService);
    handle(inboundMessage: MessageHandlerInboundMessage<AckMessageHandler>): Promise<void>;
}
