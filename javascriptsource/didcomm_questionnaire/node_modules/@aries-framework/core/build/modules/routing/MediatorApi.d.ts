import type { MediationRecord } from './repository';
import type { EncryptedMessage } from '../../types';
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
    grantRequestedMediation(mediatorId: string): Promise<MediationRecord>;
    /**
     * @deprecated Use `MessagePickupApi.queueMessage` instead.
     * */
    queueMessage(connectionId: string, message: EncryptedMessage): Promise<void>;
    private registerMessageHandlers;
}
