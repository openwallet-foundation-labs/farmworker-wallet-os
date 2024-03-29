import type { DependencyManager } from '../../plugins';
import type { Wallet } from '../../wallet';
import { AgentConfig } from '../AgentConfig';
export declare class AgentContext {
    /**
     * Dependency manager holds all dependencies for the current context. Possibly a child of a parent dependency manager,
     * in which case all singleton dependencies from the parent context are also available to this context.
     */
    readonly dependencyManager: DependencyManager;
    /**
     * An identifier that allows to correlate this context across sessions. This identifier is created by the `AgentContextProvider`
     * and should only be meaningful to the `AgentContextProvider`. The `contextCorrelationId` MUST uniquely identity the context and
     * should be enough to start a new session.
     *
     * An example of the `contextCorrelationId` is for example the id of the `TenantRecord` that is associated with this context when using the tenant module.
     * The `TenantAgentContextProvider` will set the `contextCorrelationId` to the `TenantRecord` id when creating the context, and will be able to create a context
     * for a specific tenant using the `contextCorrelationId`.
     */
    readonly contextCorrelationId: string;
    constructor({ dependencyManager, contextCorrelationId, }: {
        dependencyManager: DependencyManager;
        contextCorrelationId: string;
    });
    /**
     * Convenience method to access the agent config for the current context.
     */
    get config(): AgentConfig;
    /**
     * Convenience method to access the wallet for the current context.
     */
    get wallet(): Wallet;
    /**
     * End session the current agent context
     */
    endSession(): Promise<void>;
    toJSON(): {
        contextCorrelationId: string;
    };
}
