import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { ProofProtocol } from '../../ProofProtocol';
import { V2PresentationAckMessage } from '../messages';
export declare class V2PresentationAckHandler implements MessageHandler {
    private proofProtocol;
    supportedMessages: (typeof V2PresentationAckMessage)[];
    constructor(proofProtocol: ProofProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2PresentationAckHandler>): Promise<void>;
}
