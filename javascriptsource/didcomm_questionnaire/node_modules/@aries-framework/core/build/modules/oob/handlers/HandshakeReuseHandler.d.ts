import type { MessageHandler } from '../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { OutOfBandService } from '../OutOfBandService';
import { OutboundMessageContext } from '../../../agent/models';
import { HandshakeReuseMessage } from '../messages/HandshakeReuseMessage';
export declare class HandshakeReuseHandler implements MessageHandler {
    supportedMessages: (typeof HandshakeReuseMessage)[];
    private outOfBandService;
    constructor(outOfBandService: OutOfBandService);
    handle(messageContext: InboundMessageContext<HandshakeReuseMessage>): Promise<OutboundMessageContext<import("../messages/HandshakeReuseAcceptedMessage").HandshakeReuseAcceptedMessage>>;
}
