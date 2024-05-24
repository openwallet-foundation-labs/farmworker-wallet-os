"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationRecipientService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const EventEmitter_1 = require("../../../agent/EventEmitter");
const Events_1 = require("../../../agent/Events");
const MessageSender_1 = require("../../../agent/MessageSender");
const models_1 = require("../../../agent/models");
const crypto_1 = require("../../../crypto");
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const ConnectionType_1 = require("../../connections/models/ConnectionType");
const ConnectionMetadataTypes_1 = require("../../connections/repository/ConnectionMetadataTypes");
const ConnectionService_1 = require("../../connections/services/ConnectionService");
const dids_1 = require("../../dids");
const helpers_1 = require("../../dids/helpers");
const RoutingEvents_1 = require("../RoutingEvents");
const messages_1 = require("../messages");
const KeylistUpdateMessage_1 = require("../messages/KeylistUpdateMessage");
const models_2 = require("../models");
const MediationRecord_1 = require("../repository/MediationRecord");
const MediationRepository_1 = require("../repository/MediationRepository");
let MediationRecipientService = class MediationRecipientService {
    constructor(connectionService, messageSender, mediatorRepository, eventEmitter) {
        this.mediationRepository = mediatorRepository;
        this.eventEmitter = eventEmitter;
        this.connectionService = connectionService;
        this.messageSender = messageSender;
    }
    async createRequest(agentContext, connection) {
        const message = new messages_1.MediationRequestMessage({});
        const mediationRecord = new MediationRecord_1.MediationRecord({
            threadId: message.threadId,
            state: models_2.MediationState.Requested,
            role: models_2.MediationRole.Recipient,
            connectionId: connection.id,
        });
        await this.connectionService.addConnectionType(agentContext, connection, ConnectionType_1.ConnectionType.Mediator);
        await this.mediationRepository.save(agentContext, mediationRecord);
        this.emitStateChangedEvent(agentContext, mediationRecord, null);
        return { mediationRecord, message };
    }
    async processMediationGrant(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        // Mediation record must already exists to be updated to granted status
        const mediationRecord = await this.mediationRepository.getByConnectionId(messageContext.agentContext, connection.id);
        // Assert
        mediationRecord.assertState(models_2.MediationState.Requested);
        mediationRecord.assertRole(models_2.MediationRole.Recipient);
        // Update record
        mediationRecord.endpoint = messageContext.message.endpoint;
        // Update connection metadata to use their key format in further protocol messages
        const connectionUsesDidKey = messageContext.message.routingKeys.some(helpers_1.isDidKey);
        await this.updateUseDidKeysFlag(messageContext.agentContext, connection, messages_1.MediationGrantMessage.type.protocolUri, connectionUsesDidKey);
        // According to RFC 0211 keys should be a did key, but base58 encoded verkey was used before
        // RFC was accepted. This converts the key to a public key base58 if it is a did key.
        mediationRecord.routingKeys = messageContext.message.routingKeys.map(helpers_1.didKeyToVerkey);
        return await this.updateState(messageContext.agentContext, mediationRecord, models_2.MediationState.Granted);
    }
    async processKeylistUpdateResults(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        const mediationRecord = await this.mediationRepository.getByConnectionId(messageContext.agentContext, connection.id);
        // Assert
        mediationRecord.assertReady();
        mediationRecord.assertRole(models_2.MediationRole.Recipient);
        const keylist = messageContext.message.updated;
        // Update connection metadata to use their key format in further protocol messages
        const connectionUsesDidKey = keylist.some((key) => (0, helpers_1.isDidKey)(key.recipientKey));
        await this.updateUseDidKeysFlag(messageContext.agentContext, connection, messages_1.KeylistUpdateResponseMessage.type.protocolUri, connectionUsesDidKey);
        // update keylist in mediationRecord
        for (const update of keylist) {
            if (update.action === messages_1.KeylistUpdateAction.add) {
                mediationRecord.addRecipientKey((0, helpers_1.didKeyToVerkey)(update.recipientKey));
            }
            else if (update.action === messages_1.KeylistUpdateAction.remove) {
                mediationRecord.removeRecipientKey((0, helpers_1.didKeyToVerkey)(update.recipientKey));
            }
        }
        await this.mediationRepository.update(messageContext.agentContext, mediationRecord);
        this.eventEmitter.emit(messageContext.agentContext, {
            type: RoutingEvents_1.RoutingEventTypes.RecipientKeylistUpdated,
            payload: {
                mediationRecord,
                keylist,
            },
        });
    }
    async keylistUpdateAndAwait(agentContext, mediationRecord, updates, timeoutMs = 15000 // TODO: this should be a configurable value in agent config
    ) {
        var _a;
        const connection = await this.connectionService.getById(agentContext, mediationRecord.connectionId);
        // Use our useDidKey configuration unless we know the key formatting other party is using
        let useDidKey = agentContext.config.useDidKeyInProtocols;
        const useDidKeysConnectionMetadata = connection.metadata.get(ConnectionMetadataTypes_1.ConnectionMetadataKeys.UseDidKeysForProtocol);
        if (useDidKeysConnectionMetadata) {
            useDidKey = (_a = useDidKeysConnectionMetadata[KeylistUpdateMessage_1.KeylistUpdateMessage.type.protocolUri]) !== null && _a !== void 0 ? _a : useDidKey;
        }
        const message = this.createKeylistUpdateMessage(updates.map((item) => new KeylistUpdateMessage_1.KeylistUpdate({
            action: item.action,
            recipientKey: useDidKey ? new dids_1.DidKey(item.recipientKey).did : item.recipientKey.publicKeyBase58,
        })));
        mediationRecord.assertReady();
        mediationRecord.assertRole(models_2.MediationRole.Recipient);
        // Create observable for event
        const observable = this.eventEmitter.observable(RoutingEvents_1.RoutingEventTypes.RecipientKeylistUpdated);
        const subject = new rxjs_1.ReplaySubject(1);
        // Apply required filters to observable stream and create promise to subscribe to observable
        observable
            .pipe((0, Events_1.filterContextCorrelationId)(agentContext.contextCorrelationId), 
        // Only take event for current mediation record
        (0, operators_1.filter)((event) => mediationRecord.id === event.payload.mediationRecord.id), 
        // Only wait for first event that matches the criteria
        (0, operators_1.first)(), 
        // Do not wait for longer than specified timeout
        (0, operators_1.timeout)({
            first: timeoutMs,
            meta: 'MediationRecipientService.keylistUpdateAndAwait',
        }))
            .subscribe(subject);
        const outboundMessageContext = new models_1.OutboundMessageContext(message, { agentContext, connection });
        await this.messageSender.sendMessage(outboundMessageContext);
        const keylistUpdate = await (0, rxjs_1.firstValueFrom)(subject);
        return keylistUpdate.payload.mediationRecord;
    }
    createKeylistUpdateMessage(updates) {
        const keylistUpdateMessage = new KeylistUpdateMessage_1.KeylistUpdateMessage({
            updates,
        });
        return keylistUpdateMessage;
    }
    async addMediationRouting(agentContext, routing, { mediatorId, useDefaultMediator = true } = {}) {
        let mediationRecord = null;
        if (mediatorId) {
            mediationRecord = await this.getById(agentContext, mediatorId);
        }
        else if (useDefaultMediator) {
            // If no mediatorId is provided, and useDefaultMediator is true (default)
            // We use the default mediator if available
            mediationRecord = await this.findDefaultMediator(agentContext);
        }
        // Return early if no mediation record
        if (!mediationRecord)
            return routing;
        // new did has been created and mediator needs to be updated with the public key.
        mediationRecord = await this.keylistUpdateAndAwait(agentContext, mediationRecord, [
            {
                recipientKey: routing.recipientKey,
                action: messages_1.KeylistUpdateAction.add,
            },
        ]);
        return Object.assign(Object.assign({}, routing), { mediatorId: mediationRecord.id, endpoints: mediationRecord.endpoint ? [mediationRecord.endpoint] : routing.endpoints, routingKeys: mediationRecord.routingKeys.map((key) => crypto_1.Key.fromPublicKeyBase58(key, crypto_1.KeyType.Ed25519)) });
    }
    async removeMediationRouting(agentContext, { recipientKeys, mediatorId }) {
        const mediationRecord = await this.getById(agentContext, mediatorId);
        if (!mediationRecord) {
            throw new error_1.CredoError('No mediation record to remove routing from has been found');
        }
        await this.keylistUpdateAndAwait(agentContext, mediationRecord, recipientKeys.map((item) => {
            return {
                recipientKey: item,
                action: messages_1.KeylistUpdateAction.remove,
            };
        }));
    }
    async processMediationDeny(messageContext) {
        const connection = messageContext.assertReadyConnection();
        // Mediation record already exists
        const mediationRecord = await this.findByConnectionId(messageContext.agentContext, connection.id);
        if (!mediationRecord) {
            throw new Error(`No mediation has been requested for this connection id: ${connection.id}`);
        }
        // Assert
        mediationRecord.assertRole(models_2.MediationRole.Recipient);
        mediationRecord.assertState(models_2.MediationState.Requested);
        // Update record
        await this.updateState(messageContext.agentContext, mediationRecord, models_2.MediationState.Denied);
        return mediationRecord;
    }
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param MediationRecord The proof record to update the state for
     * @param newState The state to update to
     *
     */
    async updateState(agentContext, mediationRecord, newState) {
        const previousState = mediationRecord.state;
        mediationRecord.state = newState;
        await this.mediationRepository.update(agentContext, mediationRecord);
        this.emitStateChangedEvent(agentContext, mediationRecord, previousState);
        return mediationRecord;
    }
    emitStateChangedEvent(agentContext, mediationRecord, previousState) {
        this.eventEmitter.emit(agentContext, {
            type: RoutingEvents_1.RoutingEventTypes.MediationStateChanged,
            payload: {
                mediationRecord: mediationRecord.clone(),
                previousState,
            },
        });
    }
    async getById(agentContext, id) {
        return this.mediationRepository.getById(agentContext, id);
    }
    async findByConnectionId(agentContext, connectionId) {
        return this.mediationRepository.findSingleByQuery(agentContext, { connectionId });
    }
    async getMediators(agentContext) {
        return this.mediationRepository.getAll(agentContext);
    }
    async findAllMediatorsByQuery(agentContext, query) {
        return await this.mediationRepository.findByQuery(agentContext, query);
    }
    async findDefaultMediator(agentContext) {
        return this.mediationRepository.findSingleByQuery(agentContext, { default: true });
    }
    async discoverMediation(agentContext, mediatorId) {
        // If mediatorId is passed, always use it (and error if it is not found)
        if (mediatorId) {
            return this.mediationRepository.getById(agentContext, mediatorId);
        }
        const defaultMediator = await this.findDefaultMediator(agentContext);
        if (defaultMediator) {
            if (defaultMediator.state !== models_2.MediationState.Granted) {
                throw new error_1.CredoError(`Mediation State for ${defaultMediator.id} is not granted, but is set as default mediator!`);
            }
            return defaultMediator;
        }
    }
    async setDefaultMediator(agentContext, mediator) {
        const mediationRecords = await this.mediationRepository.findByQuery(agentContext, { default: true });
        for (const record of mediationRecords) {
            record.setTag('default', false);
            await this.mediationRepository.update(agentContext, record);
        }
        // Set record coming in tag to true and then update.
        mediator.setTag('default', true);
        await this.mediationRepository.update(agentContext, mediator);
    }
    async clearDefaultMediator(agentContext) {
        const mediationRecord = await this.findDefaultMediator(agentContext);
        if (mediationRecord) {
            mediationRecord.setTag('default', false);
            await this.mediationRepository.update(agentContext, mediationRecord);
        }
    }
    async updateUseDidKeysFlag(agentContext, connection, protocolUri, connectionUsesDidKey) {
        var _a;
        const useDidKeysForProtocol = (_a = connection.metadata.get(ConnectionMetadataTypes_1.ConnectionMetadataKeys.UseDidKeysForProtocol)) !== null && _a !== void 0 ? _a : {};
        useDidKeysForProtocol[protocolUri] = connectionUsesDidKey;
        connection.metadata.set(ConnectionMetadataTypes_1.ConnectionMetadataKeys.UseDidKeysForProtocol, useDidKeysForProtocol);
        await this.connectionService.update(agentContext, connection);
    }
};
MediationRecipientService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [ConnectionService_1.ConnectionService,
        MessageSender_1.MessageSender,
        MediationRepository_1.MediationRepository,
        EventEmitter_1.EventEmitter])
], MediationRecipientService);
exports.MediationRecipientService = MediationRecipientService;
//# sourceMappingURL=MediationRecipientService.js.map