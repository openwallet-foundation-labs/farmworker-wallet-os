import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { UpdateConfig } from '../../updates';
export interface V0_1ToV0_2UpdateConfig {
    mediationRoleUpdateStrategy: 'allMediator' | 'allRecipient' | 'recipientIfEndpoint' | 'doNotChange';
}
export declare function updateV0_1ToV0_2<Agent extends BaseAgent>(agent: Agent, config: UpdateConfig): Promise<void>;
