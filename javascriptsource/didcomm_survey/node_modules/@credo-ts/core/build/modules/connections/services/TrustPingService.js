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
exports.TrustPingService = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const models_1 = require("../../../agent/models");
const plugins_1 = require("../../../plugins");
const TrustPingEvents_1 = require("../TrustPingEvents");
const messages_1 = require("../messages");
let TrustPingService = class TrustPingService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    processPing({ message, agentContext }, connection) {
        this.eventEmitter.emit(agentContext, {
            type: TrustPingEvents_1.TrustPingEventTypes.TrustPingReceivedEvent,
            payload: {
                connectionRecord: connection,
                message: message,
            },
        });
        if (message.responseRequested) {
            const response = new messages_1.TrustPingResponseMessage({
                threadId: message.threadId,
            });
            return new models_1.OutboundMessageContext(response, { agentContext, connection });
        }
    }
    processPingResponse(inboundMessage) {
        const { agentContext, message } = inboundMessage;
        const connection = inboundMessage.assertReadyConnection();
        this.eventEmitter.emit(agentContext, {
            type: TrustPingEvents_1.TrustPingEventTypes.TrustPingResponseReceivedEvent,
            payload: {
                connectionRecord: connection,
                message: message,
            },
        });
    }
};
TrustPingService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [EventEmitter_1.EventEmitter])
], TrustPingService);
exports.TrustPingService = TrustPingService;
//# sourceMappingURL=TrustPingService.js.map