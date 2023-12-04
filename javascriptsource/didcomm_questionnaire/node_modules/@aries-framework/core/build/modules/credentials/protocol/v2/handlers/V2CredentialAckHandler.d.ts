import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import type { V2CredentialProtocol } from '../V2CredentialProtocol';
import { V2CredentialAckMessage } from '../messages/V2CredentialAckMessage';
export declare class V2CredentialAckHandler implements MessageHandler {
    private credentialProtocol;
    supportedMessages: (typeof V2CredentialAckMessage)[];
    constructor(credentialProtocol: V2CredentialProtocol);
    handle(messageContext: MessageHandlerInboundMessage<V2CredentialAckHandler>): Promise<void>;
}
