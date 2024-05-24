import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2ProofProtocol } from '../V2ProofProtocol';
import { V2PresentationProblemReportMessage } from '../messages';
export declare class V2PresentationProblemReportHandler implements MessageHandler {
    private proofService;
    supportedMessages: (typeof V2PresentationProblemReportMessage)[];
    constructor(proofService: V2ProofProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2PresentationProblemReportHandler>): Promise<void>;
}
