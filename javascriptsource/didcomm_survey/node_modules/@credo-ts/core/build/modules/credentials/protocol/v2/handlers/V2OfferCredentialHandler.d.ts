import type { MessageHandler } from '../../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../../agent/models/InboundMessageContext';
import type { V2CredentialProtocol } from '../V2CredentialProtocol';
import { V2OfferCredentialMessage } from '../messages/V2OfferCredentialMessage';
export declare class V2OfferCredentialHandler implements MessageHandler {
    private credentialProtocol;
    supportedMessages: (typeof V2OfferCredentialMessage)[];
    constructor(credentialProtocol: V2CredentialProtocol);
    handle(messageContext: InboundMessageContext<V2OfferCredentialMessage>): Promise<import("../../../../..").OutboundMessageContext<import("../../../../..").AgentMessage> | undefined>;
    private acceptOffer;
}
