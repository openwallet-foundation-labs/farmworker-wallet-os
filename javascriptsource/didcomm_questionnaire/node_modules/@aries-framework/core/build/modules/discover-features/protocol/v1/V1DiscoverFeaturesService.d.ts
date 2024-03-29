import type { AgentMessage } from '../../../../agent/AgentMessage';
import type { InboundMessageContext } from '../../../../agent/models/InboundMessageContext';
import type { CreateDisclosureOptions, CreateQueryOptions, DiscoverFeaturesProtocolMsgReturnType } from '../../DiscoverFeaturesServiceOptions';
import { EventEmitter } from '../../../../agent/EventEmitter';
import { FeatureRegistry } from '../../../../agent/FeatureRegistry';
import { MessageHandlerRegistry } from '../../../../agent/MessageHandlerRegistry';
import { Logger } from '../../../../logger';
import { DiscoverFeaturesModuleConfig } from '../../DiscoverFeaturesModuleConfig';
import { DiscoverFeaturesService } from '../../services';
import { V1QueryMessage, V1DiscloseMessage } from './messages';
export declare class V1DiscoverFeaturesService extends DiscoverFeaturesService {
    constructor(featureRegistry: FeatureRegistry, eventEmitter: EventEmitter, messageHandlerRegistry: MessageHandlerRegistry, logger: Logger, discoverFeaturesConfig: DiscoverFeaturesModuleConfig);
    /**
     * The version of the discover features protocol this service supports
     */
    readonly version = "v1";
    private registerMessageHandlers;
    createQuery(options: CreateQueryOptions): Promise<DiscoverFeaturesProtocolMsgReturnType<V1QueryMessage>>;
    processQuery(messageContext: InboundMessageContext<V1QueryMessage>): Promise<DiscoverFeaturesProtocolMsgReturnType<AgentMessage> | void>;
    createDisclosure(options: CreateDisclosureOptions): Promise<DiscoverFeaturesProtocolMsgReturnType<V1DiscloseMessage>>;
    processDisclosure(messageContext: InboundMessageContext<V1DiscloseMessage>): Promise<void>;
}
