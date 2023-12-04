import type { AgentMessage } from './AgentMessage';
import type { AgentContext } from './context';
import type { ConnectionRecord } from '../modules/connections';
import type { BaseRecordAny } from '../storage/BaseRecord';
import { OutboundMessageContext } from './models';
/**
 * Maybe these methods should be moved to a service, but that would require
 * extra injection in the sender functions, and I'm not 100% sure what would
 * be the best place to host these.
 */
/**
 * Get the outbound message context for a message. Will use the connection record if available,
 * and otherwise try to create a connectionless message context.
 */
export declare function getOutboundMessageContext(agentContext: AgentContext, { message, connectionRecord, associatedRecord, lastReceivedMessage, lastSentMessage, }: {
    connectionRecord?: ConnectionRecord;
    associatedRecord?: BaseRecordAny;
    message: AgentMessage;
    lastReceivedMessage?: AgentMessage;
    lastSentMessage?: AgentMessage;
}): Promise<OutboundMessageContext<AgentMessage>>;
export declare function getConnectionlessOutboundMessageContext(agentContext: AgentContext, { message, lastReceivedMessage, lastSentMessage, associatedRecord, }: {
    message: AgentMessage;
    associatedRecord: BaseRecordAny;
    lastReceivedMessage: AgentMessage;
    lastSentMessage?: AgentMessage;
}): Promise<OutboundMessageContext<AgentMessage>>;
