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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidRotateService = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const models_1 = require("../../../agent/models");
const constants_1 = require("../../../constants");
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const common_1 = require("../../common");
const dids_1 = require("../../dids");
const helpers_1 = require("../../routing/services/helpers");
const ConnectionEvents_1 = require("../ConnectionEvents");
const ConnectionsModuleConfig_1 = require("../ConnectionsModuleConfig");
const messages_1 = require("../messages");
const ConnectionMetadataTypes_1 = require("../repository/ConnectionMetadataTypes");
const ConnectionService_1 = require("./ConnectionService");
const helpers_2 = require("./helpers");
let DidRotateService = class DidRotateService {
    constructor(didResolverService, logger, eventEmitter) {
        this.didResolverService = didResolverService;
        this.logger = logger;
        this.eventEmitter = eventEmitter;
    }
    async createRotate(agentContext, options) {
        var _a;
        const { connection, toDid, routing } = options;
        const config = agentContext.dependencyManager.resolve(ConnectionsModuleConfig_1.ConnectionsModuleConfig);
        // Do not allow to receive concurrent did rotation flows
        const didRotateMetadata = connection.metadata.get(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        if (didRotateMetadata) {
            throw new error_1.CredoError(`There is already an existing opened did rotation flow for connection id ${connection.id}`);
        }
        let didDocument, mediatorId;
        // If did is specified, make sure we have all key material for it
        if (toDid) {
            didDocument = await (0, helpers_2.getDidDocumentForCreatedDid)(agentContext, toDid);
            mediatorId = (_a = (await (0, helpers_1.getMediationRecordForDidDocument)(agentContext, didDocument))) === null || _a === void 0 ? void 0 : _a.id;
            // Otherwise, create a did:peer based on the provided routing
        }
        else {
            if (!routing) {
                throw new error_1.CredoError('Routing configuration must be defined when rotating to a new peer did');
            }
            didDocument = await (0, helpers_2.createPeerDidFromServices)(agentContext, (0, helpers_2.routingToServices)(routing), config.peerNumAlgoForDidRotation);
            mediatorId = routing.mediatorId;
        }
        const message = new messages_1.DidRotateMessage({ toDid: didDocument.id });
        // We set new info into connection metadata for further 'sealing' it once we receive an acknowledge
        // All messages sent in-between will be using previous connection information
        connection.metadata.set(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate, {
            threadId: message.threadId,
            did: didDocument.id,
            mediatorId,
        });
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
        return message;
    }
    async createHangup(agentContext, options) {
        const { connection } = options;
        const message = new messages_1.HangupMessage({});
        // Remove did to indicate termination status for this connection
        if (connection.did) {
            connection.previousDids = [...connection.previousDids, connection.did];
        }
        connection.did = undefined;
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
        return message;
    }
    /**
     * Process a Hangup message and mark connection's theirDid as undefined so it is effectively terminated.
     * Connection Record itself is not deleted (TODO: config parameter to automatically do so)
     *
     * Its previous did will be stored in record in order to be able to recognize any message received
     * afterwards.
     *
     * @param messageContext
     */
    async processHangup(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const { agentContext } = messageContext;
        if (connection.theirDid) {
            connection.previousTheirDids = [...connection.previousTheirDids, connection.theirDid];
        }
        connection.theirDid = undefined;
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
    }
    /**
     * Process an incoming DID Rotate message and update connection if success. Any acknowledge
     * or problem report will be sent to the prior DID, so the created context will take former
     * connection record data
     *
     * @param param
     * @param connection
     * @returns
     */
    async processRotate(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const { message, agentContext } = messageContext;
        // Check and store their new did
        const newDid = message.toDid;
        // DID Rotation not supported for peer:1 dids, as we need explicit did document information
        if ((0, dids_1.isValidPeerDid)(newDid) && (0, dids_1.getNumAlgoFromPeerDid)(newDid) === dids_1.PeerDidNumAlgo.GenesisDoc) {
            this.logger.error(`Unable to resolve DID Document for '${newDid}`);
            const response = new messages_1.DidRotateProblemReportMessage({
                description: { en: 'DID Method Unsupported', code: 'e.did.method_unsupported' },
            });
            return new models_1.OutboundMessageContext(response, { agentContext, connection });
        }
        const didDocument = (await this.didResolverService.resolve(agentContext, newDid)).didDocument;
        // Cannot resolve did
        if (!didDocument) {
            this.logger.error(`Unable to resolve DID Document for '${newDid}`);
            const response = new messages_1.DidRotateProblemReportMessage({
                description: { en: 'DID Unresolvable', code: 'e.did.unresolvable' },
            });
            return new models_1.OutboundMessageContext(response, { agentContext, connection });
        }
        // Did is resolved but no compatible DIDComm services found
        if (!didDocument.didCommServices) {
            const response = new messages_1.DidRotateProblemReportMessage({
                description: { en: 'DID Document Unsupported', code: 'e.did.doc_unsupported' },
            });
            return new models_1.OutboundMessageContext(response, { agentContext, connection });
        }
        // Send acknowledge to previous did and persist new did. Previous did will be stored in connection record in
        // order to still accept messages from it
        const outboundMessageContext = new models_1.OutboundMessageContext(new messages_1.DidRotateAckMessage({
            threadId: message.threadId,
            status: common_1.AckStatus.OK,
        }), { agentContext, connection: connection.clone() });
        // Store received did and update connection for further message processing
        await agentContext.dependencyManager.resolve(dids_1.DidRepository).storeReceivedDid(agentContext, {
            did: didDocument.id,
            didDocument,
            tags: {
                // For did:peer, store any alternative dids (like short form did:peer:4),
                // it may have in order to relate any message referencing it
                alternativeDids: (0, dids_1.isValidPeerDid)(didDocument.id) ? (0, dids_1.getAlternativeDidsForPeerDid)(didDocument.id) : undefined,
            },
        });
        if (connection.theirDid) {
            connection.previousTheirDids = [...connection.previousTheirDids, connection.theirDid];
        }
        const previousTheirDid = connection.theirDid;
        connection.theirDid = newDid;
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
        this.emitDidRotatedEvent(agentContext, connection, {
            previousTheirDid,
        });
        return outboundMessageContext;
    }
    async processRotateAck(inboundMessage) {
        const { agentContext, message } = inboundMessage;
        const connection = inboundMessage.assertReadyConnection();
        // Update connection info based on metadata set when creating the rotate message
        const didRotateMetadata = connection.metadata.get(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        if (!didRotateMetadata) {
            throw new error_1.CredoError(`No did rotation data found for connection with id '${connection.id}'`);
        }
        if (didRotateMetadata.threadId !== message.threadId) {
            throw new error_1.CredoError(`Existing did rotation flow thread id '${didRotateMetadata.threadId} does not match incoming message'`);
        }
        // Store previous did in order to still accept out-of-order messages that arrived later using it
        if (connection.did)
            connection.previousDids = [...connection.previousDids, connection.did];
        const previousOurDid = connection.did;
        connection.did = didRotateMetadata.did;
        connection.mediatorId = didRotateMetadata.mediatorId;
        connection.metadata.delete(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
        this.emitDidRotatedEvent(agentContext, connection, {
            previousOurDid,
        });
    }
    /**
     * Process a problem report related to did rotate protocol, by simply deleting any temporary metadata.
     *
     * No specific event is thrown other than generic message processing
     *
     * @param messageContext
     */
    async processProblemReport(messageContext) {
        const { message, agentContext } = messageContext;
        const connection = messageContext.assertReadyConnection();
        this.logger.debug(`Processing problem report with id ${message.id}`);
        // Delete any existing did rotation metadata in order to 'reset' the connection
        const didRotateMetadata = connection.metadata.get(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        if (!didRotateMetadata) {
            throw new error_1.CredoError(`No did rotation data found for connection with id '${connection.id}'`);
        }
        connection.metadata.delete(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
    }
    async clearDidRotationData(agentContext, connection) {
        const didRotateMetadata = connection.metadata.get(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        if (!didRotateMetadata) {
            throw new error_1.CredoError(`No did rotation data found for connection with id '${connection.id}'`);
        }
        connection.metadata.delete(ConnectionMetadataTypes_1.ConnectionMetadataKeys.DidRotate);
        await agentContext.dependencyManager.resolve(ConnectionService_1.ConnectionService).update(agentContext, connection);
    }
    emitDidRotatedEvent(agentContext, connectionRecord, { previousOurDid, previousTheirDid }) {
        this.eventEmitter.emit(agentContext, {
            type: ConnectionEvents_1.ConnectionEventTypes.ConnectionDidRotated,
            payload: {
                // Connection record in event should be static
                connectionRecord: connectionRecord.clone(),
                ourDid: previousOurDid && connectionRecord.did
                    ? {
                        from: previousOurDid,
                        to: connectionRecord.did,
                    }
                    : undefined,
                theirDid: previousTheirDid && connectionRecord.theirDid
                    ? {
                        from: previousTheirDid,
                        to: connectionRecord.theirDid,
                    }
                    : undefined,
            },
        });
    }
};
DidRotateService = __decorate([
    (0, plugins_1.injectable)(),
    __param(1, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [dids_1.DidResolverService, Object, EventEmitter_1.EventEmitter])
], DidRotateService);
exports.DidRotateService = DidRotateService;
//# sourceMappingURL=DidRotateService.js.map