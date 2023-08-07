import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2CredentialProtocol } from '../V2CredentialProtocol';
import { OutboundMessageContext } from '../../../../../agent/models';
import { V2ProposeCredentialMessage } from '../messages/V2ProposeCredentialMessage';
export declare class V2ProposeCredentialHandler implements MessageHandler {
    private credentialProtocol;
    supportedMessages: (typeof V2ProposeCredentialMessage)[];
    constructor(credentialProtocol: V2CredentialProtocol);
    handle(messageContext: InboundMessageContext<V2ProposeCredentialMessage>): Promise<OutboundMessageContext<import("..").V2OfferCredentialMessage> | undefined>;
    private acceptProposal;
}
