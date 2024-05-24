import type { AgentContext } from '../../../../agent';
import type { AgentMessage } from '../../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../../agent/FeatureRegistry';
import type { InboundMessageContext } from '../../../../agent/models/InboundMessageContext';
import type { DependencyManager } from '../../../../plugins';
import type { DeliverMessagesProtocolOptions, DeliverMessagesProtocolReturnType, PickupMessagesProtocolOptions, PickupMessagesProtocolReturnType, SetLiveDeliveryModeProtocolReturnType } from '../MessagePickupProtocolOptions';
import { OutboundMessageContext } from '../../../../agent/models';
import { BaseMessagePickupProtocol } from '../BaseMessagePickupProtocol';
import { V1BatchMessage, V1BatchPickupMessage } from './messages';
export declare class V1MessagePickupProtocol extends BaseMessagePickupProtocol {
    /**
     * The version of the message pickup protocol this class supports
     */
    readonly version: "v1";
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
    createPickupMessage(agentContext: AgentContext, options: PickupMessagesProtocolOptions): Promise<PickupMessagesProtocolReturnType<AgentMessage>>;
    createDeliveryMessage(agentContext: AgentContext, options: DeliverMessagesProtocolOptions): Promise<DeliverMessagesProtocolReturnType<AgentMessage> | void>;
    setLiveDeliveryMode(): Promise<SetLiveDeliveryModeProtocolReturnType<AgentMessage>>;
    processBatchPickup(messageContext: InboundMessageContext<V1BatchPickupMessage>): Promise<OutboundMessageContext<V1BatchMessage>>;
    processBatch(messageContext: InboundMessageContext<V1BatchMessage>): Promise<AgentMessage | null>;
}
