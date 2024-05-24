import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2CredentialProtocol } from '../V2CredentialProtocol';
import { V2CredentialProblemReportMessage } from '../messages/V2CredentialProblemReportMessage';
export declare class V2CredentialProblemReportHandler implements MessageHandler {
    private credentialProtocol;
    supportedMessages: (typeof V2CredentialProblemReportMessage)[];
    constructor(credentialProtocol: V2CredentialProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2CredentialProblemReportHandler>): Promise<void>;
}
