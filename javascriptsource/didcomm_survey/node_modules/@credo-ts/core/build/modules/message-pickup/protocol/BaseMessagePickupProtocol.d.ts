import type { MessagePickupProtocol } from './MessagePickupProtocol';
import type { DeliverMessagesProtocolOptions, DeliverMessagesProtocolReturnType, PickupMessagesProtocolOptions, PickupMessagesProtocolReturnType, SetLiveDeliveryModeProtocolOptions, SetLiveDeliveryModeProtocolReturnType } from './MessagePickupProtocolOptions';
import type { AgentContext } from '../../../agent';
import type { AgentMessage } from '../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../agent/FeatureRegistry';
import type { DependencyManager } from '../../../plugins';
/**
 * Base implementation of the MessagePickupProtocol that can be used as a foundation for implementing
 * the MessagePickupProtocol interface.
 */
export declare abstract class BaseMessagePickupProtocol implements MessagePickupProtocol {
    abstract readonly version: string;
    abstract createPickupMessage(agentContext: AgentContext, options: PickupMessagesProtocolOptions): Promise<PickupMessagesProtocolReturnType<AgentMessage>>;
    abstract createDeliveryMessage(agentContext: AgentContext, options: DeliverMessagesProtocolOptions): Promise<DeliverMessagesProtocolReturnType<AgentMessage> | void>;
    abstract setLiveDeliveryMode(agentContext: AgentContext, options: SetLiveDeliveryModeProtocolOptions): Promise<SetLiveDeliveryModeProtocolReturnType<AgentMessage>>;
    abstract register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
