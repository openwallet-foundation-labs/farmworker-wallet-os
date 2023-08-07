import type { MediationRecord } from './repository';
import type { GetRoutingOptions } from './services/RoutingService';
import type { ConnectionRecord } from '../connections';
import { Subject } from 'rxjs';
import { AgentContext } from '../../agent';
import { EventEmitter } from '../../agent/EventEmitter';
import { MessageHandlerRegistry } from '../../agent/MessageHandlerRegistry';
import { MessageSender } from '../../agent/MessageSender';
import { Logger } from '../../logger';
import { ConnectionService } from '../connections/services';
import { DidsApi } from '../dids';
import { DiscoverFeaturesApi } from '../discover-features';
import { MessagePickupApi } from '../message-pìckup/MessagePickupApi';
import { MediationRecipientModuleConfig } from './MediationRecipientModuleConfig';
import { MediatorPickupStrategy } from './MediatorPickupStrategy';
import { KeylistUpdateAction } from './messages';
import { MediationRepository } from './repository';
import { MediationRecipientService } from './services/MediationRecipientService';
import { RoutingService } from './services/RoutingService';
export declare class MediationRecipientApi {
    config: MediationRecipientModuleConfig;
    private mediationRecipientService;
    private connectionService;
    private dids;
    private messageSender;
    private eventEmitter;
    private logger;
    private discoverFeaturesApi;
    private messagePickupApi;
    private mediationRepository;
    private routingService;
    private agentContext;
    private stop$;
    private readonly stopMessagePickup$;
    constructor(messageHandlerRegistry: MessageHandlerRegistry, mediationRecipientService: MediationRecipientService, connectionService: ConnectionService, dids: DidsApi, messageSender: MessageSender, eventEmitter: EventEmitter, discoverFeaturesApi: DiscoverFeaturesApi, messagePickupApi: MessagePickupApi, mediationRepository: MediationRepository, routingService: RoutingService, logger: Logger, agentContext: AgentContext, stop$: Subject<boolean>, mediationRecipientModuleConfig: MediationRecipientModuleConfig);
    initialize(): Promise<void>;
    private sendMessage;
    private openMediationWebSocket;
    private openWebSocketAndPickUp;
    /**
     * Start a Message Pickup flow with a registered Mediator.
     *
     * @param mediator optional {MediationRecord} corresponding to the mediator to pick messages from. It will use
     * default mediator otherwise
     * @param pickupStrategy optional {MediatorPickupStrategy} to use in the loop. It will use Agent's default
     * strategy or attempt to find it by Discover Features otherwise
     * @returns
     */
    initiateMessagePickup(mediator?: MediationRecord, pickupStrategy?: MediatorPickupStrategy): Promise<import("rxjs").Subscription | undefined>;
    /**
     * Terminate all ongoing Message Pickup loops
     */
    stopMessagePickup(): Promise<void>;
    private getPickupStrategyForMediator;
    discoverMediation(): Promise<MediationRecord | undefined>;
    /**
     * @deprecated Use `MessagePickupApi.pickupMessages` instead.
     * */
    pickupMessages(mediatorConnection: ConnectionRecord, pickupStrategy?: MediatorPickupStrategy): Promise<void>;
    setDefaultMediator(mediatorRecord: MediationRecord): Promise<void>;
    requestMediation(connection: ConnectionRecord): Promise<MediationRecord>;
    notifyKeylistUpdate(connection: ConnectionRecord, verkey: string, action?: KeylistUpdateAction): Promise<void>;
    findByConnectionId(connectionId: string): Promise<MediationRecord | null>;
    getMediators(): Promise<MediationRecord[]>;
    findDefaultMediator(): Promise<MediationRecord | null>;
    findDefaultMediatorConnection(): Promise<ConnectionRecord | null>;
    requestAndAwaitGrant(connection: ConnectionRecord, timeoutMs?: number): Promise<MediationRecord>;
    /**
     * Requests mediation for a given connection and sets that as default mediator.
     *
     * @param connection connection record which will be used for mediation
     * @returns mediation record
     */
    provision(connection: ConnectionRecord): Promise<MediationRecord>;
    getRouting(options: GetRoutingOptions): Promise<import("../connections").Routing>;
    private registerMessageHandlers;
}
