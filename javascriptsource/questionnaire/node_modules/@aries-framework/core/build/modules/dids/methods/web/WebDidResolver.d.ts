import type { AgentContext } from '../../../../agent';
import type { DidResolver } from '../../domain/DidResolver';
import type { ParsedDid, DidResolutionResult, DidResolutionOptions } from '../../types';
export declare class WebDidResolver implements DidResolver {
    readonly supportedMethods: string[];
    private _resolverInstance;
    private resolver;
    constructor();
    resolve(agentContext: AgentContext, did: string, parsed: ParsedDid, didResolutionOptions: DidResolutionOptions): Promise<DidResolutionResult>;
}
