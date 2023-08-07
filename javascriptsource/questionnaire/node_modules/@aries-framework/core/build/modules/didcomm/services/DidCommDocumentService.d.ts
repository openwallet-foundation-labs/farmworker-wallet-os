import type { AgentContext } from '../../../agent';
import type { ResolvedDidCommService } from '../types';
import { AgentConfig } from '../../../agent/AgentConfig';
import { DidResolverService } from '../../dids';
export declare class DidCommDocumentService {
    private logger;
    private didResolverService;
    constructor(agentConfig: AgentConfig, didResolverService: DidResolverService);
    resolveServicesFromDid(agentContext: AgentContext, did: string): Promise<ResolvedDidCommService[]>;
}
