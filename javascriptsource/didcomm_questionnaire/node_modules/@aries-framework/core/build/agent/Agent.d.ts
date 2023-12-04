import type { AgentDependencies } from './AgentDependencies';
import type { AgentModulesInput } from './AgentModules';
import type { InboundTransport } from '../transport/InboundTransport';
import type { OutboundTransport } from '../transport/OutboundTransport';
import type { InitConfig } from '../types';
import { DependencyManager } from '../plugins';
import { BaseAgent } from './BaseAgent';
import { EventEmitter } from './EventEmitter';
import { FeatureRegistry } from './FeatureRegistry';
interface AgentOptions<AgentModules extends AgentModulesInput> {
    config: InitConfig;
    modules?: AgentModules;
    dependencies: AgentDependencies;
}
export declare class Agent<AgentModules extends AgentModulesInput = any> extends BaseAgent<AgentModules> {
    private messageSubscription?;
    constructor(options: AgentOptions<AgentModules>, dependencyManager?: DependencyManager);
    registerInboundTransport(inboundTransport: InboundTransport): void;
    unregisterInboundTransport(inboundTransport: InboundTransport): Promise<void>;
    get inboundTransports(): InboundTransport[];
    registerOutboundTransport(outboundTransport: OutboundTransport): void;
    unregisterOutboundTransport(outboundTransport: OutboundTransport): Promise<void>;
    get outboundTransports(): OutboundTransport[];
    get events(): EventEmitter;
    /**
     * Agent's feature registry
     */
    get features(): FeatureRegistry;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    protected getMediationConnection(mediatorInvitationUrl: string): Promise<import("..").ConnectionRecord>;
}
export {};
