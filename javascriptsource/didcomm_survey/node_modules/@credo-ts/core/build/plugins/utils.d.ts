import type { ApiModule, Module } from './Module';
import type { AgentContext } from '../agent';
export declare function getRegisteredModuleByInstance<M extends Module>(agentContext: AgentContext, moduleType: {
    new (...args: unknown[]): M;
}): M | undefined;
export declare function getRegisteredModuleByName<M extends Module>(agentContext: AgentContext, constructorName: string): M | undefined;
export declare function getApiForModuleByName<M extends ApiModule>(agentContext: AgentContext, constructorName: string): InstanceType<M['api']> | undefined;
