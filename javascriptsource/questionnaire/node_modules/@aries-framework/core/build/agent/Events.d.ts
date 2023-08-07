import type { AgentMessage } from './AgentMessage';
import type { OutboundMessageContext, OutboundMessageSendStatus } from './models';
import type { ConnectionRecord } from '../modules/connections';
import type { Observable } from 'rxjs';
export declare function filterContextCorrelationId(contextCorrelationId: string): <T extends BaseEvent>(source: Observable<T>) => Observable<T>;
export declare enum AgentEventTypes {
    AgentMessageReceived = "AgentMessageReceived",
    AgentMessageProcessed = "AgentMessageProcessed",
    AgentMessageSent = "AgentMessageSent"
}
export interface EventMetadata {
    contextCorrelationId: string;
}
export interface BaseEvent {
    type: string;
    payload: Record<string, unknown>;
    metadata: EventMetadata;
}
export interface AgentMessageReceivedEvent extends BaseEvent {
    type: typeof AgentEventTypes.AgentMessageReceived;
    payload: {
        message: unknown;
        connection?: ConnectionRecord;
        contextCorrelationId?: string;
    };
}
export interface AgentMessageProcessedEvent extends BaseEvent {
    type: typeof AgentEventTypes.AgentMessageProcessed;
    payload: {
        message: AgentMessage;
        connection?: ConnectionRecord;
    };
}
export interface AgentMessageSentEvent extends BaseEvent {
    type: typeof AgentEventTypes.AgentMessageSent;
    payload: {
        message: OutboundMessageContext;
        status: OutboundMessageSendStatus;
    };
}
