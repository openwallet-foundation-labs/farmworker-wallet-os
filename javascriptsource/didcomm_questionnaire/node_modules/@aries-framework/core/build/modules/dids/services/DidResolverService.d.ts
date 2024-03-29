import type { AgentContext } from '../../../agent';
import type { DidResolutionOptions, DidResolutionResult } from '../types';
import { Logger } from '../../../logger';
import { DidsModuleConfig } from '../DidsModuleConfig';
export declare class DidResolverService {
    private logger;
    private didsModuleConfig;
    constructor(logger: Logger, didsModuleConfig: DidsModuleConfig);
    resolve(agentContext: AgentContext, didUrl: string, options?: DidResolutionOptions): Promise<DidResolutionResult>;
    resolveDidDocument(agentContext: AgentContext, did: string): Promise<import("..").DidDocument>;
    private findResolver;
}
