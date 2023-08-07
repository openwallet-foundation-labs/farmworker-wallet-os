import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2CredentialProtocol } from '../V2CredentialProtocol';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2IssueCredentialMessage } from '../messages/V2IssueCredentialMessage';
export declare class V2IssueCredentialHandler implements MessageHandler {
    private credentialProtocol;
    supportedMessages: (typeof V2IssueCredentialMessage)[];
    constructor(credentialProtocol: V2CredentialProtocol);
    handle(messageContext: InboundMessageContext<V2IssueCredentialMessage>): Promise<OutboundMessageContext<import("..").V2CredentialAckMessage> | undefined>;
    private acceptCredential;
}
