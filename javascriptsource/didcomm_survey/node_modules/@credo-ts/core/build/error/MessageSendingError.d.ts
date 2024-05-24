import type { OutboundMessageContext } from '../agent/models';
import { CredoError } from './CredoError';
export declare class MessageSendingError extends CredoError {
    outboundMessageContext: OutboundMessageContext;
    constructor(message: string, { outboundMessageContext, cause }: {
        outboundMessageContext: OutboundMessageContext;
        cause?: Error;
    });
}
