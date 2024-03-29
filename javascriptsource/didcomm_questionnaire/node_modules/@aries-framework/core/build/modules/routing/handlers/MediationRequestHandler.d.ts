import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { MediatorModuleConfig } from '../MediatorModuleConfig';
import type { MediatorService } from '../services/MediatorService';
import { OutboundMessageContext } from '../../../agent/models';
import { MediationRequestMessage } from '../messages/MediationRequestMessage';
export declare class MediationRequestHandler implements MessageHandler {
    private mediatorService;
    private mediatorModuleConfig;
    supportedMessages: (typeof MediationRequestMessage)[];
    constructor(mediatorService: MediatorService, mediatorModuleConfig: MediatorModuleConfig);
    handle(messageContext: MessageHandlerInboundMessage<MediationRequestHandler>): Promise<OutboundMessageContext<import("..").MediationGrantMessage> | undefined>;
}
