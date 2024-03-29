import type { OutboundMessageContext } from '../agent/models';
import { AriesFrameworkError } from './AriesFrameworkError';
export declare class MessageSendingError extends AriesFrameworkError {
    outboundMessageContext: OutboundMessageContext;
    constructor(message: string, { outboundMessageContext, cause }: {
        outboundMessageContext: OutboundMessageContext;
        cause?: Error;
    });
}
