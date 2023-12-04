import type { AgentContext } from '../../../../agent';
import type { DidResolver } from '../../domain/DidResolver';
import type { DidResolutionResult } from '../../types';
export declare class PeerDidResolver implements DidResolver {
    readonly supportedMethods: string[];
    resolve(agentContext: AgentContext, did: string): Promise<DidResolutionResult>;
}
