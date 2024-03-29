import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2CredentialProtocol } from '../V2CredentialProtocol';
import { V2RequestCredentialMessage } from '../messages/V2RequestCredentialMessage';
export declare class V2RequestCredentialHandler implements MessageHandler {
    private credentialProtocol;
    supportedMessages: (typeof V2RequestCredentialMessage)[];
    constructor(credentialProtocol: V2CredentialProtocol);
    handle(messageContext: InboundMessageContext<V2RequestCredentialMessage>): Promise<import("../../../../..").OutboundMessageContext<import("../../../../..").AgentMessage> | undefined>;
    private acceptRequest;
}
