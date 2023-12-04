import type { InboundMessageContext } from '../../../../agent/models/InboundMessageContext';
import type { CreateQueryOptions, DiscoverFeaturesProtocolMsgReturnType, CreateDisclosureOptions } from '../../DiscoverFeaturesServiceOptions';
import { EventEmitter } from '../../../../agent/EventEmitter';
import { FeatureRegistry } from '../../../../agent/FeatureRegistry';
import { MessageHandlerRegistry } from '../../../../agent/MessageHandlerRegistry';
import { Logger } from '../../../../logger';
import { DiscoverFeaturesModuleConfig } from '../../DiscoverFeaturesModuleConfig';
import { DiscoverFeaturesService } from '../../services';
import { V2QueriesMessage, V2DisclosuresMessage } from './messages';
export declare class V2DiscoverFeaturesService extends DiscoverFeaturesService {
    constructor(featureRegistry: FeatureRegistry, eventEmitter: EventEmitter, messageHandlerRegistry: MessageHandlerRegistry, logger: Logger, discoverFeaturesModuleConfig: DiscoverFeaturesModuleConfig);
    /**
     * The version of the discover features protocol this service supports
     */
    readonly version = "v2";
    private registerMessageHandlers;
    createQuery(options: CreateQueryOptions): Promise<DiscoverFeaturesProtocolMsgReturnType<V2QueriesMessage>>;
    processQuery(messageContext: InboundMessageContext<V2QueriesMessage>): Promise<DiscoverFeaturesProtocolMsgReturnType<V2DisclosuresMessage> | void>;
    createDisclosure(options: CreateDisclosureOptions): Promise<DiscoverFeaturesProtocolMsgReturnType<V2DisclosuresMessage>>;
    processDisclosure(messageContext: InboundMessageContext<V2DisclosuresMessage>): Promise<void>;
}
