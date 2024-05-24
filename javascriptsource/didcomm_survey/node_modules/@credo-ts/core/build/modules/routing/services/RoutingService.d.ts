import type { AgentContext } from '../../../agent';
import type { Key } from '../../../crypto';
import type { Routing } from '../../connections';
import { EventEmitter } from '../../../agent/EventEmitter';
import { MediationRecipientService } from './MediationRecipientService';
export declare class RoutingService {
    private mediationRecipientService;
    private eventEmitter;
    constructor(mediationRecipientService: MediationRecipientService, eventEmitter: EventEmitter);
    getRouting(agentContext: AgentContext, { mediatorId, useDefaultMediator }?: GetRoutingOptions): Promise<Routing>;
    removeRouting(agentContext: AgentContext, options: RemoveRoutingOptions): Promise<void>;
}
export interface GetRoutingOptions {
    /**
     * Identifier of the mediator to use when setting up routing
     */
    mediatorId?: string;
    /**
     * Whether to use the default mediator if available and `mediatorId` has not been provided
     * @default true
     */
    useDefaultMediator?: boolean;
}
export interface RemoveRoutingOptions {
    /**
     * Keys to remove routing from
     */
    recipientKeys: Key[];
    /**
     * Identifier of the mediator used when routing has been set up
     */
    mediatorId: string;
}
