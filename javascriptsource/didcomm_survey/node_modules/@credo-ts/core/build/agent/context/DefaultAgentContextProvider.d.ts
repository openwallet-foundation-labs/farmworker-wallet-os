import type { AgentContextProvider } from './AgentContextProvider';
import { AgentContext } from './AgentContext';
/**
 * Default implementation of AgentContextProvider.
 *
 * Holds a single `AgentContext` instance that will be used for all messages, i.e. a
 * a single tenant agent.
 */
export declare class DefaultAgentContextProvider implements AgentContextProvider {
    private agentContext;
    constructor(agentContext: AgentContext);
    getAgentContextForContextCorrelationId(contextCorrelationId: string): Promise<AgentContext>;
    getContextForInboundMessage(_: unknown, options?: {
        contextCorrelationId?: string;
    }): Promise<AgentContext>;
    endSessionForAgentContext(agentContext: AgentContext): Promise<void>;
}
