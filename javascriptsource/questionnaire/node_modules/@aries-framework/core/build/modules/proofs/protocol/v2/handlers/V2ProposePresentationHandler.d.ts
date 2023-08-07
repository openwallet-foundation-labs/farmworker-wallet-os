import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2ProofProtocol } from '../V2ProofProtocol';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2ProposePresentationMessage } from '../messages/V2ProposePresentationMessage';
export declare class V2ProposePresentationHandler implements MessageHandler {
    private proofProtocol;
    supportedMessages: (typeof V2ProposePresentationMessage)[];
    constructor(proofProtocol: V2ProofProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2ProposePresentationHandler>): Promise<OutboundMessageContext<import("..").V2RequestPresentationMessage> | undefined>;
    private acceptProposal;
}
