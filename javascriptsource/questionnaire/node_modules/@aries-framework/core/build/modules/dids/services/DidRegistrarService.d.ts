import type { AgentContext } from '../../../agent';
import type { DidCreateOptions, DidCreateResult, DidDeactivateOptions, DidDeactivateResult, DidUpdateOptions, DidUpdateResult } from '../types';
import { Logger } from '../../../logger';
import { DidsModuleConfig } from '../DidsModuleConfig';
export declare class DidRegistrarService {
    private logger;
    private didsModuleConfig;
    constructor(logger: Logger, didsModuleConfig: DidsModuleConfig);
    create<CreateOptions extends DidCreateOptions = DidCreateOptions>(agentContext: AgentContext, options: CreateOptions): Promise<DidCreateResult>;
    update(agentContext: AgentContext, options: DidUpdateOptions): Promise<DidUpdateResult>;
    deactivate(agentContext: AgentContext, options: DidDeactivateOptions): Promise<DidDeactivateResult>;
    private findRegistrarForMethod;
}
