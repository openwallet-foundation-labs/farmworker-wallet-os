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
exports.EventEmitter = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const constants_1 = require("../constants");
const plugins_1 = require("../plugins");
let EventEmitter = class EventEmitter {
    constructor(agentDependencies, stop$) {
        this.eventEmitter = new agentDependencies.EventEmitterClass();
        this.stop$ = stop$;
    }
    // agentContext is currently not used, but already making required as it will be used soon
    emit(agentContext, data) {
        this.eventEmitter.emit(data.type, Object.assign(Object.assign({}, data), { metadata: {
                contextCorrelationId: agentContext.contextCorrelationId,
            } }));
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    observable(event) {
        return (0, rxjs_1.fromEventPattern)((handler) => this.on(event, handler), (handler) => this.off(event, handler)).pipe((0, operators_1.takeUntil)(this.stop$));
    }
};
EventEmitter = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.AgentDependencies)),
    __param(1, (0, plugins_1.inject)(constants_1.InjectionSymbols.Stop$)),
    __metadata("design:paramtypes", [Object, rxjs_1.Subject])
], EventEmitter);
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map