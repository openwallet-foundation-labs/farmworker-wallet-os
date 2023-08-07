import type { MessageHandler } from '../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { OutOfBandService } from '../OutOfBandService';
import { HandshakeReuseAcceptedMessage } from '../messages/HandshakeReuseAcceptedMessage';
export declare class HandshakeReuseAcceptedHandler implements MessageHandler {
    supportedMessages: (typeof HandshakeReuseAcceptedMessage)[];
    private outOfBandService;
    constructor(outOfBandService: OutOfBandService);
    handle(messageContext: InboundMessageContext<HandshakeReuseAcceptedMessage>): Promise<void>;
}
