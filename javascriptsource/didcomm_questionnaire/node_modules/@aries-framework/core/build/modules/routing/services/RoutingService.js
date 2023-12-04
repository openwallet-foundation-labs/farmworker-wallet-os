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
exports.RoutingService = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const crypto_1 = require("../../../crypto");
const plugins_1 = require("../../../plugins");
const RoutingEvents_1 = require("../RoutingEvents");
const MediationRecipientService_1 = require("./MediationRecipientService");
let RoutingService = class RoutingService {
    constructor(mediationRecipientService, eventEmitter) {
        this.mediationRecipientService = mediationRecipientService;
        this.eventEmitter = eventEmitter;
    }
    async getRouting(agentContext, { mediatorId, useDefaultMediator = true } = {}) {
        // Create and store new key
        const recipientKey = await agentContext.wallet.createKey({ keyType: crypto_1.KeyType.Ed25519 });
        let routing = {
            endpoints: agentContext.config.endpoints,
            routingKeys: [],
            recipientKey,
        };
        // Extend routing with mediator keys (if applicable)
        routing = await this.mediationRecipientService.addMediationRouting(agentContext, routing, {
            mediatorId,
            useDefaultMediator,
        });
        // Emit event so other parts of the framework can react on keys created
        this.eventEmitter.emit(agentContext, {
            type: RoutingEvents_1.RoutingEventTypes.RoutingCreatedEvent,
            payload: {
                routing,
            },
        });
        return routing;
    }
    async removeRouting(agentContext, options) {
        await this.mediationRecipientService.removeMediationRouting(agentContext, options);
    }
};
RoutingService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [MediationRecipientService_1.MediationRecipientService, EventEmitter_1.EventEmitter])
], RoutingService);
exports.RoutingService = RoutingService;
//# sourceMappingURL=RoutingService.js.map