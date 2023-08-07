import type { Key } from '../../crypto';
import type { ConnectionRecord } from '../../modules/connections';
import type { AgentMessage } from '../AgentMessage';
import type { AgentContext } from '../context';
export interface MessageContextParams {
    connection?: ConnectionRecord;
    sessionId?: string;
    senderKey?: Key;
    recipientKey?: Key;
    agentContext: AgentContext;
}
export declare class InboundMessageContext<T extends AgentMessage = AgentMessage> {
    message: T;
    connection?: ConnectionRecord;
    sessionId?: string;
    senderKey?: Key;
    recipientKey?: Key;
    readonly agentContext: AgentContext;
    constructor(message: T, context: MessageContextParams);
    /**
     * Assert the inbound message has a ready connection associated with it.
     *
     * @throws {AriesFrameworkError} if there is no connection or the connection is not ready
     */
    assertReadyConnection(): ConnectionRecord;
    toJSON(): {
        message: T;
        recipientKey: string | undefined;
        senderKey: string | undefined;
        sessionId: string | undefined;
        agentContext: {
            contextCorrelationId: string;
        };
    };
}
