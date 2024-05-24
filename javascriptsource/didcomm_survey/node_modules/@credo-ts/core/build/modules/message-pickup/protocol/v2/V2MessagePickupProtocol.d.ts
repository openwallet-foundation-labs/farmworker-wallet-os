import type { AgentContext } from '../../../../agent';
import type { AgentMessage } from '../../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../../agent/FeatureRegistry';
import type { InboundMessageContext } from '../../../../agent/models/InboundMessageContext';
import type { DependencyManager } from '../../../../plugins';
import type { DeliverMessagesProtocolOptions, DeliverMessagesProtocolReturnType, PickupMessagesProtocolOptions, PickupMessagesProtocolReturnType, SetLiveDeliveryModeProtocolOptions, SetLiveDeliveryModeProtocolReturnType } from '../MessagePickupProtocolOptions';
import { OutboundMessageContext } from '../../../../agent/models';
import { BaseMessagePickupProtocol } from '../BaseMessagePickupProtocol';
import { V2MessageDeliveryMessage, V2StatusMessage, V2DeliveryRequestMessage, V2MessagesReceivedMessage, V2StatusRequestMessage, V2LiveDeliveryChangeMessage } from './messages';
export declare class V2MessagePickupProtocol extends BaseMessagePickupProtocol {
    /**
     * The version of the message pickup protocol this class supports
     */
    readonly version: "v2";
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
    createPickupMessage(agentContext: AgentContext, options: PickupMessagesProtocolOptions): Promise<PickupMessagesProtocolReturnType<AgentMessage>>;
    createDeliveryMessage(agentContext: AgentContext, options: DeliverMessagesProtocolOptions): Promise<DeliverMessagesProtocolReturnType<AgentMessage> | void>;
    setLiveDeliveryMode(agentContext: AgentContext, options: SetLiveDeliveryModeProtocolOptions): Promise<SetLiveDeliveryModeProtocolReturnType<AgentMessage>>;
    processStatusRequest(messageContext: InboundMessageContext<V2StatusRequestMessage>): Promise<OutboundMessageContext<V2StatusMessage>>;
    processDeliveryRequest(messageContext: InboundMessageContext<V2DeliveryRequestMessage>): Promise<OutboundMessageContext<V2MessageDeliveryMessage | V2StatusMessage>>;
    processMessagesReceived(messageContext: InboundMessageContext<V2MessagesReceivedMessage>): Promise<OutboundMessageContext<V2StatusMessage>>;
    processStatus(messageContext: InboundMessageContext<V2StatusMessage>): Promise<V2DeliveryRequestMessage | null>;
    processLiveDeliveryChange(messageContext: InboundMessageContext<V2LiveDeliveryChangeMessage>): Promise<OutboundMessageContext<V2StatusMessage>>;
    processDelivery(messageContext: InboundMessageContext<V2MessageDeliveryMessage>): Promise<V2MessagesReceivedMessage>;
}
