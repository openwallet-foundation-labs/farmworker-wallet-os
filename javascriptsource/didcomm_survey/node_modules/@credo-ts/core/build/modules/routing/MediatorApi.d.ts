import type { MediationRecord } from './repository';
import { AgentContext } from '../../agent';
import { MessageHandlerRegistry } from '../../agent/MessageHandlerRegistry';
import { MessageSender } from '../../agent/MessageSender';
import { ConnectionService } from '../connections/services';
import { MediatorModuleConfig } from './MediatorModuleConfig';
import { MediatorService } from './services/MediatorService';
export declare class MediatorApi {
    config: MediatorModuleConfig;
    private mediatorService;
    private messageSender;
    private agentContext;
    private connectionService;
    constructor(messageHandlerRegistry: MessageHandlerRegistry, mediationService: MediatorService, messageSender: MessageSender, agentContext: AgentContext, connectionService: ConnectionService, config: MediatorModuleConfig);
    initialize(): Promise<void>;
    grantRequestedMediation(mediationRecordId: string): Promise<MediationRecord>;
    private registerMessageHandlers;
}
