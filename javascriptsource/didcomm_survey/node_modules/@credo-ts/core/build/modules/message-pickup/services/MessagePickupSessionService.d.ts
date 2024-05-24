import type { AgentContext } from '../../../agent';
import type { MessagePickupSession, MessagePickupSessionRole } from '../MessagePickupSession';
/**
 * @internal
 * The Message Pickup session service keeps track of all {@link MessagePickupSession}
 *
 * It is initially intended for Message Holder/Mediator role, where only Live Mode sessions are
 * considered.
 */
export declare class MessagePickupSessionService {
    private sessions;
    constructor();
    start(agentContext: AgentContext): void;
    getLiveSession(agentContext: AgentContext, sessionId: string): MessagePickupSession<import("../protocol/MessagePickupProtocol").MessagePickupProtocol[]> | undefined;
    getLiveSessionByConnectionId(agentContext: AgentContext, options: {
        connectionId: string;
        role?: MessagePickupSessionRole;
    }): MessagePickupSession<import("../protocol/MessagePickupProtocol").MessagePickupProtocol[]> | undefined;
    saveLiveSession(agentContext: AgentContext, options: {
        connectionId: string;
        protocolVersion: string;
        role: MessagePickupSessionRole;
    }): void;
    removeLiveSession(agentContext: AgentContext, options: {
        connectionId: string;
    }): void;
}
