import type { DiscloseFeaturesOptions, QueryFeaturesOptions } from './DiscoverFeaturesApiOptions';
import type { DiscoverFeaturesService } from './services';
import type { Feature } from '../../agent/models';
import { Subject } from 'rxjs';
import { AgentContext } from '../../agent';
import { EventEmitter } from '../../agent/EventEmitter';
import { MessageSender } from '../../agent/MessageSender';
import { ConnectionService } from '../connections/services';
import { DiscoverFeaturesModuleConfig } from './DiscoverFeaturesModuleConfig';
import { V1DiscoverFeaturesService, V2DiscoverFeaturesService } from './protocol';
export interface QueryFeaturesReturnType {
    features?: Feature[];
}
export interface DiscoverFeaturesApi<DFSs extends DiscoverFeaturesService[]> {
    queryFeatures(options: QueryFeaturesOptions<DFSs>): Promise<QueryFeaturesReturnType>;
    discloseFeatures(options: DiscloseFeaturesOptions<DFSs>): Promise<void>;
}
export declare class DiscoverFeaturesApi<DFSs extends DiscoverFeaturesService[] = [V1DiscoverFeaturesService, V2DiscoverFeaturesService]> implements DiscoverFeaturesApi<DFSs> {
    /**
     * Configuration for Discover Features module
     */
    readonly config: DiscoverFeaturesModuleConfig;
    private connectionService;
    private messageSender;
    private eventEmitter;
    private stop$;
    private agentContext;
    private serviceMap;
    constructor(connectionService: ConnectionService, messageSender: MessageSender, v1Service: V1DiscoverFeaturesService, v2Service: V2DiscoverFeaturesService, eventEmitter: EventEmitter, stop$: Subject<boolean>, agentContext: AgentContext, config: DiscoverFeaturesModuleConfig);
    getService<PVT extends DiscoverFeaturesService['version']>(protocolVersion: PVT): DiscoverFeaturesService;
}
