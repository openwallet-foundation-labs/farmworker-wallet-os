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
exports.DiscoverFeaturesApi = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const agent_1 = require("../../agent");
const EventEmitter_1 = require("../../agent/EventEmitter");
const MessageSender_1 = require("../../agent/MessageSender");
const models_1 = require("../../agent/models");
const constants_1 = require("../../constants");
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
const services_1 = require("../connections/services");
const DiscoverFeaturesEvents_1 = require("./DiscoverFeaturesEvents");
const DiscoverFeaturesModuleConfig_1 = require("./DiscoverFeaturesModuleConfig");
const protocol_1 = require("./protocol");
let DiscoverFeaturesApi = class DiscoverFeaturesApi {
    constructor(connectionService, messageSender, v1Service, v2Service, eventEmitter, stop$, agentContext, config) {
        this.connectionService = connectionService;
        this.messageSender = messageSender;
        this.eventEmitter = eventEmitter;
        this.stop$ = stop$;
        this.agentContext = agentContext;
        this.config = config;
        // Dynamically build service map. This will be extracted once services are registered dynamically
        this.serviceMap = [v1Service, v2Service].reduce((serviceMap, service) => (Object.assign(Object.assign({}, serviceMap), { [service.version]: service })), {});
    }
    getService(protocolVersion) {
        if (!this.serviceMap[protocolVersion]) {
            throw new error_1.AriesFrameworkError(`No discover features service registered for protocol version ${protocolVersion}`);
        }
        return this.serviceMap[protocolVersion];
    }
    /**
     * Send a query to an existing connection for discovering supported features of any kind. If desired, do the query synchronously,
     * meaning that it will await the response (or timeout) before resolving. Otherwise, response can be hooked by subscribing to
     * {DiscoverFeaturesDisclosureReceivedEvent}.
     *
     * Note: V1 protocol only supports a single query and is limited to protocols
     *
     * @param options feature queries to perform, protocol version and optional comment string (only used
     * in V1 protocol). If awaitDisclosures is set, perform the query synchronously with awaitDisclosuresTimeoutMs timeout.
     */
    async queryFeatures(options) {
        var _a;
        const service = this.getService(options.protocolVersion);
        const connection = await this.connectionService.getById(this.agentContext, options.connectionId);
        const { message: queryMessage } = await service.createQuery({
            queries: options.queries,
            comment: options.comment,
        });
        const outboundMessageContext = new models_1.OutboundMessageContext(queryMessage, {
            agentContext: this.agentContext,
            connection,
        });
        const replaySubject = new rxjs_1.ReplaySubject(1);
        if (options.awaitDisclosures) {
            // Listen for response to our feature query
            this.eventEmitter
                .observable(DiscoverFeaturesEvents_1.DiscoverFeaturesEventTypes.DisclosureReceived)
                .pipe(
            // Stop when the agent shuts down
            (0, operators_1.takeUntil)(this.stop$), 
            // filter by connection id
            (0, operators_1.filter)((e) => { var _a; return ((_a = e.payload.connection) === null || _a === void 0 ? void 0 : _a.id) === connection.id; }), 
            // Return disclosures
            (0, operators_1.map)((e) => e.payload.disclosures), 
            // If we don't have an answer in timeoutMs miliseconds (no response, not supported, etc...) error
            (0, operators_1.timeout)((_a = options.awaitDisclosuresTimeoutMs) !== null && _a !== void 0 ? _a : 7000), // TODO: Harmonize default timeouts across the framework
            // We want to return false if an error occurred
            (0, operators_1.catchError)(() => (0, rxjs_1.of)([])))
                .subscribe(replaySubject);
        }
        await this.messageSender.sendMessage(outboundMessageContext);
        return { features: options.awaitDisclosures ? await (0, rxjs_1.firstValueFrom)(replaySubject) : undefined };
    }
    /**
     * Disclose features to a connection, either proactively or as a response to a query.
     *
     * Features are disclosed based on queries that will be performed to Agent's Feature Registry,
     * meaning that they should be registered prior to disclosure. When sending disclosure as response,
     * these queries will usually match those from the corresponding Query or Queries message.
     *
     * Note: V1 protocol only supports sending disclosures as a response to a query.
     *
     * @param options multiple properties like protocol version to use, disclosure queries and thread id
     * (in case of disclosure as response to query)
     */
    async discloseFeatures(options) {
        const service = this.getService(options.protocolVersion);
        const connection = await this.connectionService.getById(this.agentContext, options.connectionId);
        const { message: disclosuresMessage } = await service.createDisclosure({
            disclosureQueries: options.disclosureQueries,
            threadId: options.threadId,
        });
        const outboundMessageContext = new models_1.OutboundMessageContext(disclosuresMessage, {
            agentContext: this.agentContext,
            connection,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
    }
};
DiscoverFeaturesApi = __decorate([
    (0, plugins_1.injectable)(),
    __param(5, (0, plugins_1.inject)(constants_1.InjectionSymbols.Stop$)),
    __metadata("design:paramtypes", [services_1.ConnectionService,
        MessageSender_1.MessageSender,
        protocol_1.V1DiscoverFeaturesService,
        protocol_1.V2DiscoverFeaturesService,
        EventEmitter_1.EventEmitter,
        rxjs_1.Subject,
        agent_1.AgentContext,
        DiscoverFeaturesModuleConfig_1.DiscoverFeaturesModuleConfig])
], DiscoverFeaturesApi);
exports.DiscoverFeaturesApi = DiscoverFeaturesApi;
//# sourceMappingURL=DiscoverFeaturesApi.js.map