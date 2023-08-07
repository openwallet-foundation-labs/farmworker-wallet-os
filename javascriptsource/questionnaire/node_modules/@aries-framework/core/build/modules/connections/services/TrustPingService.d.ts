import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { TrustPingMessage } from '../messages';
import type { ConnectionRecord } from '../repository/ConnectionRecord';
import { EventEmitter } from '../../../agent/EventEmitter';
import { OutboundMessageContext } from '../../../agent/models';
import { TrustPingResponseMessage } from '../messages';
export declare class TrustPingService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter);
    processPing({ message, agentContext }: InboundMessageContext<TrustPingMessage>, connection: ConnectionRecord): OutboundMessageContext<TrustPingResponseMessage> | undefined;
    processPingResponse(inboundMessage: InboundMessageContext<TrustPingResponseMessage>): void;
}
