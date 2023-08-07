import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2ProofProtocol } from '../V2ProofProtocol';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2PresentationMessage } from '../messages';
export declare class V2PresentationHandler implements MessageHandler {
    private proofProtocol;
    supportedMessages: (typeof V2PresentationMessage)[];
    constructor(proofProtocol: V2ProofProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2PresentationHandler>): Promise<OutboundMessageContext<import("../messages").V2PresentationAckMessage> | undefined>;
    private acceptPresentation;
}
