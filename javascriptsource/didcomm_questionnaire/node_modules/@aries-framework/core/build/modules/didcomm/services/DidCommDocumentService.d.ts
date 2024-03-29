import type { AgentContext } from '../../../agent';
import type { ResolvedDidCommService } from '../types';
import { DidResolverService } from '../../dids';
export declare class DidCommDocumentService {
    private didResolverService;
    constructor(didResolverService: DidResolverService);
    resolveServicesFromDid(agentContext: AgentContext, did: string): Promise<ResolvedDidCommService[]>;
}
