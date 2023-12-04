import type { AgentContext } from '../../../../agent';
import type { DidResolver } from '../../domain/DidResolver';
import type { DidResolutionResult } from '../../types';
export declare class KeyDidResolver implements DidResolver {
    readonly supportedMethods: string[];
    resolve(agentContext: AgentContext, did: string): Promise<DidResolutionResult>;
}
