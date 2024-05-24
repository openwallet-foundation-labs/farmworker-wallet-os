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
exports.MessagePickupSessionService = void 0;
const rxjs_1 = require("rxjs");
const EventEmitter_1 = require("../../../agent/EventEmitter");
const constants_1 = require("../../../constants");
const plugins_1 = require("../../../plugins");
const transport_1 = require("../../../transport");
const uuid_1 = require("../../../utils/uuid");
const MessagePickupEvents_1 = require("../MessagePickupEvents");
/**
 * @internal
 * The Message Pickup session service keeps track of all {@link MessagePickupSession}
 *
 * It is initially intended for Message Holder/Mediator role, where only Live Mode sessions are
 * considered.
 */
let MessagePickupSessionService = class MessagePickupSessionService {
    constructor() {
        this.sessions = [];
    }
    start(agentContext) {
        const stop$ = agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.Stop$);
        const eventEmitter = agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
        this.sessions = [];
        eventEmitter
            .observable(transport_1.TransportEventTypes.TransportSessionRemoved)
            .pipe((0, rxjs_1.takeUntil)(stop$))
            .subscribe({
            next: (e) => {
                const connectionId = e.payload.session.connectionId;
                if (connectionId)
                    this.removeLiveSession(agentContext, { connectionId });
            },
        });
    }
    getLiveSession(agentContext, sessionId) {
        return this.sessions.find((session) => session.id === sessionId);
    }
    getLiveSessionByConnectionId(agentContext, options) {
        const { connectionId, role } = options;
        return this.sessions.find((session) => session.connectionId === connectionId && (role === undefined || role === session.role));
    }
    saveLiveSession(agentContext, options) {
        const { connectionId, protocolVersion, role } = options;
        // First remove any live session for the given connection Id
        this.removeLiveSession(agentContext, { connectionId });
        const session = {
            id: (0, uuid_1.uuid)(),
            connectionId,
            protocolVersion,
            role,
        };
        this.sessions.push(session);
        const eventEmitter = agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
        eventEmitter.emit(agentContext, {
            type: MessagePickupEvents_1.MessagePickupEventTypes.LiveSessionSaved,
            payload: {
                session,
            },
        });
    }
    removeLiveSession(agentContext, options) {
        const itemIndex = this.sessions.findIndex((session) => session.connectionId === options.connectionId);
        if (itemIndex > -1) {
            const [session] = this.sessions.splice(itemIndex, 1);
            const eventEmitter = agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
            eventEmitter.emit(agentContext, {
                type: MessagePickupEvents_1.MessagePickupEventTypes.LiveSessionRemoved,
                payload: {
                    session,
                },
            });
        }
    }
};
MessagePickupSessionService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [])
], MessagePickupSessionService);
exports.MessagePickupSessionService = MessagePickupSessionService;
//# sourceMappingURL=MessagePickupSessionService.js.map