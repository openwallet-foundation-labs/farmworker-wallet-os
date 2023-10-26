import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2ProofProtocol } from '../V2ProofProtocol';
import { V2RequestPresentationMessage } from '../messages/V2RequestPresentationMessage';
export declare class V2RequestPresentationHandler implements MessageHandler {
    private proofProtocol;
    supportedMessages: (typeof V2RequestPresentationMessage)[];
    constructor(proofProtocol: V2ProofProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2RequestPresentationHandler>): Promise<import("../../../../..").OutboundMessageContext<import("../../../../..").AgentMessage> | undefined>;
    private acceptRequest;
}
