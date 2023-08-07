import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { MessageSender } from '../../../agent/MessageSender';
import type { ConnectionService } from '../../connections/services';
import type { MediatorService } from '../services';
import { ForwardMessage } from '../messages';
export declare class ForwardHandler implements MessageHandler {
    private mediatorService;
    private connectionService;
    private messageSender;
    supportedMessages: (typeof ForwardMessage)[];
    constructor(mediatorService: MediatorService, connectionService: ConnectionService, messageSender: MessageSender);
    handle(messageContext: MessageHandlerInboundMessage<ForwardHandler>): Promise<void>;
}
